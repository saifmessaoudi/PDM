import usermodel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/Mailer.js";
import crypto from "crypto";

const User = usermodel.User;

/*-------------------------------------------Registration-------------------------------------------*/
const signUp = async (req, res) => {
     try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const existingUser = await User.findOne({ email:req.body.email });
        if (existingUser) {
          return res.status(400).json({ message: "user already exists" });
        }

        req.body.password = hashedPassword;

       const user = await User.create(req.body);
       res.status(201).json({ user });
     } catch (error) {
         res.status(400).json({ error });
    }
};


/*-------------------------------------------Login-------------------------------------------*/
const signIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
     console.log("email");
       return res.status(400).json({ message: "Please verify your email !" });
    }
    if (user.isBanned === true) {
      console.log("banned");
       return res.status(400).json({ message: "Your account is banned ! Please contact the support." });
    }
    if (user){
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) {
        console.log("password");
        return res.status(400).json({ message: "Please verify your password !" });
      }
    }
    
    const token = jwt.sign({ userId: user._id , role: user.role }, process.env.JWT_SECRET, { expiresIn: "30m" });
    
    console.log(token);
    res.status(200).json({token});
  } catch (error) {
    res.status(400).json(error.message);
  }
};

/*-----------------------------------------Forgot Password  Email Verification-----------------------------------------*/
const forgotPassword = async (req, res) => {
  try {
      const {email} = req.body;
      const user = await User.findOne({ email: req.body.email });
      if(user === null){
          return res.status(400).json({message: "User with this email does not exist"});
      }
      const resetRandomCode = crypto.randomBytes(3).toString("hex");
      const updatedUser = { passwordResetToken: resetRandomCode};
      await User.findOneAndUpdate({email: req.body.email}, updatedUser);
  
      const subject = "Password Reset Code";
      const text = `Hello ${user.firstName} \n
      this is your password reset code \n
      ${resetRandomCode}`;
      sendEmail(email, subject, text);
      res.status(200).json({message: "Password reset link has been sent to your email"});
  }catch(error){
    res.status(400).json(error.message);
  }
};

const resendEmailVerification = async (req, res) => { 
  try {
    const token = req.header("Authorization").split(" ")[1]; 
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const user =await User.findOne({ _id: userId });
    sendEmail(user.email, "Email Verification", `Hello ${user.firstName} \n
    Please verify your email by clicking the link below \n
    http://localhost:3000/auth/verify-email/${token}`)
    res.status(200).json({message: "Email verification link has been sent to your email"});
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const verifEmail = async (req, res) => {
  try {
   const token = req.params.token;
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const updatedUser = { isVerified: true};
    await User.findOneAndUpdate({_id: userId}, updatedUser);
    res.status(200).json({message: "Email verified successfully"});
  } catch (error) {
    res.status(400).json(error.message);
  }
};

/*-------------------------------------------Reset Password-------------------------------------------*/
const resetPassword = async (req, res) => {
  try {
        const id = req.params.id;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const randomCode = req.body.randomCode;
        const user = await User.findById(id);
        if (!user) {
          return res.status(400).json({ message: "User does not exist" });
        }
        if (user.passwordResetToken !== randomCode) {
          return res.status(400).json({ message: "Invalid reset code" });
        }
        const updatedUser = { password: hashedPassword , passwordResetToken: null};
        await User.findOneAndUpdate({_id: id}, updatedUser); 
        res.status(200).json({message: "Password reset successfully"});
  }catch(error){
    res.status(400).json(error.message);
  }
};

 
/*-------------------------------------------Export-------------------------------------------*/
export default { 
  signUp, 
  signIn,
  forgotPassword,
  resendEmailVerification,
  verifEmail,
  resetPassword
};

