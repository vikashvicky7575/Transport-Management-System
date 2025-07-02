const User = require('../models/User')
const jwt = require('jsonwebtoken')

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" })

//Register exports
exports.register = async (req, res) => {
    console.log("REQ BODY:", req.body);
    const { name, email, role, password, confirmPassword } = req.body;
    if (!name || !email || !role || !password || password !== confirmPassword) {
        return res.status(400).json({ msg: "Invalid input" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "Email already exists" });

    const user = await User.create({ name, email, role, password });
    res.json({ token: generateToken(user._id), user: { name: user.name, email: user.email } });
}

//Login exports
exports.login = async (req, res) => {
    const { email, password, role } = req.body;
    const errors = [];

    // Try to find user by email
    const user = await User.findOne({ email });

     if (!user) {
        // Only show email error if user not found
        return res.status(401).json([{ field: "email", message: "Email is not registered" }]);
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        errors.push({ field: "password", message: "Incorrect password" });
    }

    // Check role
    if (user.role.toLowerCase() !== role.toLowerCase()) {
        errors.push({ field: "role", message: "Access denied for selected role" });
    }

    // If any error exists, return
    if (errors.length > 0) {
        return res.status(401).json(errors);
    }

    // If all is correct, login success
    res.json({
        token: generateToken(user._id),
        user: {
            name: user.name,
            email: user.email,
            role: user.role
        },
    });
};

//getuserByRole
exports.getUserByRole = async (req,res) =>{
    try{
        const {role} = req.params;
        const users = await User.find({ role: role.toLowerCase() }).select("-password");

        if(!users || users.length === 0){
            return res.status(404).json({message: `No Users found with role: ${role}`})
        }
        res.status(200).json(users);
    }catch(err){
        console.error("Error fetching users by role:", err);
        res.status(500).json({message:"Server Error",err})
    }
};






