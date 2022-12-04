import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const requireSignin = (req, res, next) => {
  try {
    const decoded = jwt.verify(  //decode = _id:123dsdd22 => means agr token verify hai to hame ye us user ki id dega kyo ki hmne token user ki id se hi generate kiya tha to hme wahi id wapas mil jata hai
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decoded; //means user:{_id:current user logged in _id here } // we know that how to req work => req.body , req.authorization, req.user means its like req = {body:{name:dipak,..}, authorization:{token:"dff..", user:{_id:1233323cdwdw..}}} like that
    next(); // we applied this function as a middlewere that means next function ex. routes=> ("/secret", requireSignin, isAdmin) means here isAdmin can access the user id by just writting req.user._id 
  } catch (err) {
    return res.status(401).json(err);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);//here user._id is getting from requireSignin middlewere//through this is we can get user information
    if (user.role !== 1) {
      return res.status(401).send("Unauthorized");
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};
