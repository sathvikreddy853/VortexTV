import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => 
{  
    const token = req.headers.authorization?.split(" ")[1]; // removing bearer 

    //w hy barer is put : dont know the reason but its a convention (source youtube)

    if (!token) 
    {
        return res.status(401).json({ message: "No token provided" });
    }

    try 
    {
        jwt.verify(token, "your-secret-key");
        next();  
    } 
    catch (err) 
    {
        if (err.name === "TokenExpiredError") 
        {
            return res.status(403).json({ message: "Token expired" });
        } else {
            return res.status(403).json({ message: "Invalid token" });
        }
    }
};

export default authMiddleware;
