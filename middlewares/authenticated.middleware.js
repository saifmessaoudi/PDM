import jwt from "jsonwebtoken";


const authenticated = async(req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    //verifuy if token is not expired
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    next();
  } catch (error) {
   return res.status(401).json("Unauthorized !");
  }
};

export default authenticated;
