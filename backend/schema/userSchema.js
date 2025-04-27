import Joi from "joi";


const schema = Joi.object({

    username:Joi.string().alphanum().required(),
    // password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,20}$")).required(),
    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,20}$")).required(), 

    email:Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] }
    }).required(),

})




export default schema