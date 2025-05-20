import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' });
  }

  const token = authHeader.split(" ")[1];

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: tokenDecode.id }; 
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default userAuth;
