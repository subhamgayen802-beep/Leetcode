const express = require('express');

const authRouter =  express.Router();
<<<<<<< HEAD
const {register, login,logout, adminRegister,deleteProfile,checkAuth} = require('../controllers/userAuthent')
const userMiddleware = require("../middleware/userMiddleware");
const adminMiddleware = require('../middleware/adminMiddleware');


=======
const {register, login,logout, adminRegister,deleteProfile} = require('../controllers/userAuthent')
const userMiddleware = require("../middleware/userMiddleware");
const adminMiddleware = require('../middleware/adminMiddleware');

// Register
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', userMiddleware, logout);
authRouter.post('/admin/register', adminMiddleware ,adminRegister);
authRouter.delete('/deleteProfile',userMiddleware,deleteProfile);
<<<<<<< HEAD
authRouter.get('/check',userMiddleware,checkAuth)
=======
authRouter.get('/check',userMiddleware,(req,res)=>{

    const reply = {
        firstName: req.result.firstName,
        emailId: req.result.emailId,
        _id:req.result._id,
        role:req.result.role,
    }

    res.status(200).json({
        user:reply,
        message:"Valid User"
    });
})

>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8


module.exports = authRouter;



