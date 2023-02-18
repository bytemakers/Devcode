const express = require('express');
const router = express.Router();
const UserSchema = require('../models/User');
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const cloudinary = require('../utils/cloudinary');
const ProjectSchema = require('../models/Project');
const fetchuser = require('../middleware/fetchuser');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv').config();
const fpSchema = require('../models/ForgotPassword');
const nodemailer = require("nodemailer");

const JWT_SECRET = process.env.JWT_SECRET;



// Route 1: Creating A New User: POST: http://localhost:8181/api/auth/createuser. No Login Required
router.post('/createuser', [
    body('fname', "Your First Name Should Be At Least 4 Characters").isLength({ min: 4 }),
    body('lname', "Your Last Name Should Be At Least 3 Characters").isLength({ min: 3 }),
    body('email', "Please Enter a Vaild Email").isEmail(),
    body('password', "Password Should Be At Least 6 Characters").isLength({ min: 6 }),
], async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        const checkMultipleUsers = await UserSchema.findOne({ email: req.body.email });
        if (checkMultipleUsers) {
            return res.status(403).json({ error: "A User with this email address already exists" });
        }
        
        var salt = await bcrypt.genSalt(10);
        var hash = await bcrypt.hash(req.body.password, salt);
        const newUser = await UserSchema.create({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: hash,
            imageURI: `https://ui-avatars.com/api/?name=${req.body.fname}+${req.body.lname}&background=random`,
        });

        let payload = {
            user: {
                id: newUser.id
            }
        }

        const authtoken = jwt.sign(payload, JWT_SECRET);
        res.json({authtoken});

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});













// Route 2: Authenticating an existing user: POST: http://localhost:8181/api/auth/login. No Login Required
router.post('/login', [
    body('email', "Please Enter a Vaild Email").isEmail(),
    body('password', "Password Should Be At Least 6 Characters").isLength({ min: 6 }),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    try {
        const theUser = await UserSchema.findOne({ email: req.body.email });
        if (theUser) {
            // console.log(checkEmailExists);
            let checkHash = await bcrypt.compare(req.body.password, theUser.password);
            if (checkHash) {
                let payload = {
                    user: {
                        id: theUser.id
                    }
                }
                const authtoken = jwt.sign(payload, JWT_SECRET);
                return res.status(200).json({authtoken});
            }
            else {
                return res.status(403).json({ error: "Invalid Credentials" });
            }
        }
        else {
            return res.status(403).json({ error: "Invalid Credentials" });
        }


    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});













// Route 2.5: Login/Signup using github: POST: http://localhost:8181/api/auth/github. No Login Required
router.post('/github', async (req, res) => {
    try {
        const alreadyExists = await UserSchema.findOne({ email: req.body.email });
        if (alreadyExists) {
            // The user already exists (login)
            let payload = {
                user: {
                    id: alreadyExists.id
                }
            }
            const authtoken = jwt.sign(payload, JWT_SECRET);
            return res.status(200).json({ new: false, authtoken });

        }

        // The user don't already exist (signup)
        var salt = await bcrypt.genSalt(10);
        var hash = await bcrypt.hash(uuidv4(), salt);
        const newUser = await UserSchema.create({
            email: req.body.email,
            fname: 'Default',
            lname: 'Name',
            imageURI: 'https://ui-avatars.com/api/?name=Default+Name&background=random',
            password: hash
        });
        let payload = {
            user: {
                id: newUser.id
            }
        }
        const authtoken = jwt.sign(payload, JWT_SECRET);
        return res.status(200).json({ new: true, authtoken });

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});













// Route 2.75: Update user info after github login: POST: http://localhost:8181/api/auth/github/update. Login Required
router.post('/github/update', fetchuser, async (req, res) => {
    try {
        const theUser = await UserSchema.findById(req.user.id);
        if (!theUser) {
            return res.status(500).json({ error: "Internal server error" });
        }
        
        const updated = await theUser.updateOne({ fname: req.body.fname, lname: req.body.lname, imageURI: `https://ui-avatars.com/api/?name=${req.body.fname}+${req.body.lname}&background=random` });
        if (updated) {
            return res.status(200).json({ success: "Successfully updated" });
        }
        res.status(500).json({ error: "Internal Server Error" });


    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});













// Route 3: Project Upload: POST: http://localhost:8181/api/auth/uploadproject. Login Required
router.post('/uploadproject', fetchuser, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    try {
        const theUser = await UserSchema.findById(req.user.id);

        const { name, description, langArr, repoName, repoLink, level, image } = req.body;

        const result = await cloudinary.uploader.upload(image, {
            folder: "devcodelocal/banners",
            // width: 300,
            // crop: "scale"
        });
        console.log(name);

        const product = await ProjectSchema.create({
            userId: theUser.id,
            name,
            description,
            languages: langArr,
            repoName,
            repoLink,
            image: {
                public_id: result.public_id,
                url: result.secure_url
            },
            level
        });
        res.status(201).json({ success: true, product });


    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});













// Route 4: Get All Projects: GET: http://localhost:8181/api/auth/getprojects. Login Required
router.get('/getprojects', async (req, res) => {
    try {
        // const allProjects = await ProjectSchema.find({ userId: { $ne: req.user.id } });
        const allProjects = await ProjectSchema.find().sort({ createdAt: 'asc' });
        // console.log(req.user.id);
        res.json(allProjects);


    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});













// Route 4.5: Get All Projects with pagination: GET: http://localhost:8181/api/auth/getprojects. Login Required
router.get('/getprojects/:amount/:page', async (req, res) => {
    try {
        let allProjects = await ProjectSchema.find().sort({ createdAt: 'asc' });
        const totalItems = allProjects.length;

        let { page, amount } = req.params;
        // Converting string to integer
        page = parseInt(page);
        amount = parseInt(amount);


        // calculating start and end index
        let startIdx = (page-1)*amount;
        let endIdx = startIdx + amount;

        // Slicing the array to get the required array
        allProjects = allProjects.slice(startIdx, endIdx);    

        // console.log(req.user.id);
        res.json({allProjects, totalItems});


    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});













// Route 5: Get My Projects: GET: http://localhost:8181/api/auth/getmyprojects. Login Required
router.get('/getmyprojects', fetchuser, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    try {
        const allProjects = await ProjectSchema.find({ userId: req.user.id });
        // console.log(req.user.id);
        res.json(allProjects);


    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});













// Route 6: Increase Clicks on project: POST: http://localhost:8181/api/auth/increaseclick. Login Required
router.post('/increaseclick', fetchuser, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    try {
        const proj = await ProjectSchema.findById(req.body.projectId);
        const currentCount = proj.click;
        const theProject = await ProjectSchema.findByIdAndUpdate(req.body.projectId, { click: currentCount+1 });

        res.json({ success: "Success!" });

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});













// Route 7: Count clicks on projects: GET: http://localhost:8181/api/auth/countclicks. Login Required
router.get('/countclicks', fetchuser, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    try {
        const allProjects = await ProjectSchema.find({ userId: req.user.id });
        let count = 0;
        allProjects.forEach(project => {
            count += project.click;
        });

        res.json({ clicks: count });

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});













// Route 8: Get user details without the password: GET: http://localhost:8181/api/auth/getuser. Login Required
router.get('/getuser', fetchuser, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    try {
        const theUser = await UserSchema.findById(req.user.id).select('-password');
        res.status(200).json(theUser);


    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});



router.post('/forgotpassword', [
    body('email', "Please Enter correct Email Address.").isEmail(),
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const theUser = await UserSchema.findOne({ email: req.body.email });

    if (!theUser) {
        return res.status(404).json({ error: "This Email is not Registered!!" });
    }

    let payload = {
        user: {
            id: theUser.id
        }
    }
    // If the user exists, create a new token and send the mail
    const authtoken = jwt.sign(payload, JWT_SECRET);


    // Pushing the token with email in the DB
    fpSchema.create({
        email: req.body.email,
        token: authtoken
    });

    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: process.env.outlookEmail,
            pass: process.env.outlookPassword
        }
    });

    const options = {
        from: process.env.outlookEmail,
        to: req.body.email,
        subject: 'Reset Password for Devcode',
        html: `You are receiving this email because you(maybe someone else) wanted to change your password.\nIf it was not you, ignore this email.If you requested to change your password, please go to the following link: <a href='http://localhost:3000/resetpassword/${req.body.email}/${authtoken}'>Click Here</a>`
    };

    transporter.sendMail(options, (err, info) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ error: "Internal Server Error!" });
        }
        console.log(info.response);

        return res.status(200).json({ success: "Email sent successfully!!" });
    })

});

module.exports = router;