import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const Register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name ||!email ||!password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }
    try {

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' }); 
        }

       const hashedPassword = await bcrypt.hash(password, 10);
       const user = new User({ name, email, password: hashedPassword });
        await user.save();
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); 
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production'? 'none' : 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 });
      
    } catch (error) {
        return res.status(500).json({ message: error.message });
        console.log(error);
    }
}

export const Login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production'? 'none' : 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 });
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
        console.log(error);
    }
}