import jwt from "jsonwebtoken";

const isAdminAuthenticated = async(req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const role = decodedToken.role;
    if (role !== "admin") {
      return res.status(401).json("Unauthorized !");
    }else {
    next();}
  } catch (error) {
   return res.status(401).json("Unauthorized !");
  }
}

export default isAdminAuthenticated;