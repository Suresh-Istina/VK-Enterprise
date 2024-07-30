import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
      if (error)
        return res.status(403).json({
          message: "Token is not valid",
        });
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({
      message: "You are not authenticated.",
    });
  }
};

export const verifyTokenAndAdminAndEmployee = (req, res, next) => {
  try {
    verifyToken(req, res, () => {
      if (req.user.roleId === 1 || req.user.roleId === 3) {
        next();
      } else {
        return res.status(403).json({
          message:
            "You do not have admin or employee privileges. Please login as an admin or employee.",
        });
      }
    });
  } catch (err) {
    console.log("Your token is not valid or expired.");
  }
};

export const verifyTokenAndAdmin = (req, res, next) => {
  try {
    verifyToken(req, res, () => {
      if (req.user.roleId === 1) {
        next();
      } else {
        return res.status(403).json({
          message:
            "You do not have admin privileges. Please login as an admin.",
        });
      }
    });
  } catch (err) {
    console.log("Your token is not valid or expired.");
  }
};

export const verifyTokenAndEmployee = (req, res, next) => {
  try {
    verifyToken(req, res, () => {
      if (req.user.roleId === 3) {
        next();
      } else {
        return res.status(403).json({
          message:
            "You do not have employee privileges. Please login as an employee",
        });
      }
    });
  } catch (err) {
    console.log("Your token is not valid or expired.");
  }
};

export const verifyTokenAndCustomer = (req, res, next) => {
  try {
    verifyToken(req, res, () => {
      if (req.user.roleId === 2) {
        next();
      } else {
        return res.status(403).json({
          message:
            "You do not have customer privileges. Please login as a customer.",
        });
      }
    });
  } catch (err) {
    console.log("Your token is expired.");
  }
};
