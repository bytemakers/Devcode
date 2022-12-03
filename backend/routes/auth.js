const express = require('express');
const router = express.Router();
const UserSchema = require('../models/User');
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const cloudinary = require('../utils/cloudinary');
const ProductSchema = require('../models/Project');
const fetchuser = require('../middleware/fetchuser');
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
            folder: "products",
            // width: 300,
            // crop: "scale"
        });
        console.log(name);

        const product = await ProductSchema.create({
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



module.exports = router;