const validator =require("validator");

// req.body 

const validate = (data)=>{
   
    const mandatoryField = ['firstName',"emailId",'password'];

    const IsAllowed = mandatoryField.every((k)=> Object.keys(data).includes(k));

    if(!IsAllowed)
        throw new Error("Some Field Missing");

    if(!validator.isEmail(data.emailId))
        throw new Error("Invalid Email");

<<<<<<< HEAD
    if(!validator.isStrongPassword(data.password))
        throw new Error("Week Password");
=======
    // if(!validator.isStrongPassword(data.password))
    //     throw new Error("Week Password");
>>>>>>> 93f86a1a0bdd4036f98d5c59687dc3dfa96fb8b8
}

module.exports = validate;