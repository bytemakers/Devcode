var jwt = require('jsonwebtoken');
const JWT_SECRET = "AbhiIsASexyFuckin*GoodB$oy";

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Please Authenticate using a valid token" });
    }
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload.user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
}


module.exports = fetchuser;