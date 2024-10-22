const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup a new user
exports.signup = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({
            email,
            name,
            password: hashedPassword
        });

        await user.save();

        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({ user: { id: user.id, name: user.name, email: user.email }, token: token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// Login a user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ msg: 'User not found, please signup ' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid password' });
        }

        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ user: { id: user.id, name: user.name, email: user.email }, token: token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
