const express = require('express');
const router = express.Router();
const UserSchema = require('../models/User');
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const cloudinary = require('../utils/cloudinary');
const ProjectSchema = require('../models/Project');
const fetchuser = require('../middleware/fetchuser');
// const { default: Projects } = require('../../frontend/src/components/Projects/Projects');
// const fetchuser = require('../middleware/fetchuser');
const dotenv = require('dotenv').config();

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
            imageURI: req.body.imageURI,
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
            folder: "devcode/banners",
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
router.get('/getprojects', fetchuser, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


    try {
        const allProjects = await ProjectSchema.find({ userId: { $ne: req.user.id } });
        // console.log(req.user.id);
        res.json(allProjects);


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



module.exports = router;