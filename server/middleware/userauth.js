import jwt from 'jsonwebtoken'; 

const userAuth = async (req, res, next) => {
    const token = req.cookies.token; // Ensure you are accessing the token correctly
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, please login' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.userId) { // Assuming you are storing userId in the token
            req.user = { id: decoded.userId }; // Store user info in req.user
            next();
        } else {
            return res.status(401).json({ message: 'Not authorized, please login' });
        }
    } catch (error) {
        console.error('JWT verification error:', error); // Log the error for debugging
        return res.status(401).json({ message: 'Not authorized, please login' });
    }
}

export default userAuth;