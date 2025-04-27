import jwt from "jsonwebtoken";
import chalk from "chalk";
import User from "../Models/user.js";
import 'dotenv/config';

const authenticate = async(res,req,next)=>{
try{

    let token;

    if(req.header.authorization && req.header.authorization.startsWith(Bearer)){
        token= req.header.authoriation.split(' ')[1];
    }

    if(!token){
        return res.status(401).json({
            status:false,
            message:'unauthorized - no token provided'
        })
    }
        console.log('token-> ' , token);

   

    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
console.log(chalk.blue('Decoded token: ',decoded));

const user = User.findById(decoded._doc_.id);
console.log(chalk.cyan("database user---> ",user));
if(!user){
    return res.status(401).json({
        status:false,
        message:'unauthorized - no user found',
    });
}

req.user = {
    id:user._id.toString(),
    role:user.role
};
next();

}
catch(error){
    console.error('Authentication error: ',error.message)
    return res.status(401).json({
        success:false,
        message:'please authenticate with a valid token'
    })
};

}

export default authenticate;