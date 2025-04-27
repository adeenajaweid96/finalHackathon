import express from "express";
const  router = express.Router();
import 
{ getAllUsers,
 deleteUser , 
 updateUser,
 login,signUp}
 from "../controllers/userController.js";
// import authenticate from "../Middleware/authenticate.js"

router.get("/users",getAllUsers);
router.post("/signup",signUp);
router.post("/login",login);
router.delete("/user/:id",deleteUser);
router.put("/user/:id",updateUser);
// router.post("/isAdmin",authenticate,isAdmin)


export default router;