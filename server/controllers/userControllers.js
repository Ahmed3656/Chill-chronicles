const HttpError = require('../models/errorModel');
const fs = require('fs');
const path = require('path');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {v4: uuid} = require('uuid');

// Register a new user
// POST req : api/users/register
// Unprotected
const registerUser = async (req, res, next) => {
    try {
        const {name, email, password, password2} = req.body;
        if(!name || !email || !password || !password2) return next(new HttpError('Fill in all fields.', 422));

        const newEmail = email.toLowerCase();

        const emailExists = await User.findOne({email: newEmail});
        if(emailExists) return next(new HttpError('Email already registered.', 422));

        if(password.trim().length < 8) return next(new HttpError('Password should be at least 8 characters.', 422));

        if(password != password2) return next(new HttpError('Passwords do not match.', 422));

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = await User.create({name, email: newEmail, password: hashedPass});
        res.status(201).json('New user registered.');
    } 
    catch (error) {
        return next(new HttpError(error, 500));
    }
}

// Login a user
// POST req : api/users/login
// Unprotected
const loginUser = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) return next(new HttpError('Please fill in missing fields.', 422));
        
        const newEmail = email.trim().toLowerCase();
        const user = await User.findOne({email: newEmail});
        if(!user) return next(new HttpError('You have entered an invalid username or password.', 422));
            
        const matchingPasswords = await bcrypt.compare(password, user.password);
        if(!matchingPasswords) return next(new HttpError('You have entered an invalid username or password.', 422));

        const {_id: id, name} = user;
        const token = jwt.sign({id, name}, process.env.JWT_SECRET, {expiresIn: "1d"});

        res.status(200).json({token, id, name});
    }
    catch (error) {
        return next(new HttpError('Login failed. Please check your credentials.', 500));
    }
}

// User profile
// GET req : api/users/id
// Protected
const getUser = async (req, res, next) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id).select('-password');
        if(!user) return next(new HttpError('User not found.', 404));

        res.status(200).json(user);
    }
    catch (error) {
        return next(new HttpError(error, 500));
    }
}

// Get authors
// GET req : api/users/authors
// Unprotected
const getAuthors = async (req, res, next) => {
    try {
        const authors = await User.find().select('-password');
        res.status(200).json(authors ? authors : 'No users/authors registered');
    }
    catch (error) {
        return next(new HttpError(error, 500));    
    }
}

// Change user pfp
// POST req : api/users/change-pfp
// Protected
const changePFP = async (req, res, next) => {
    try {
        if(!req.files.pfp) return next(new HttpError('Please choose an image.', 422));

        const user = await User.findById(req.user.id);
        if(user.avatar) {
            fs.unlink(path.join(__dirname, '..', 'uploads', user.avatar), (err) => {
                if(err) return next(new HttpError(err, 500));
            })
        }

        const {pfp} = req.files;
        if(pfp.size > 500000) return next(new HttpError('Picture is too big, choose one that is less than 500KB', 422));

        let fileName;
        fileName = pfp.name;
        let splittedName = fileName.split('.');
        let newFileName = splittedName[0] + uuid() + '.' + splittedName[splittedName.length - 1];
        pfp.mv(path.join(__dirname, '..', 'uploads', newFileName), async (err) => {
            if(err) return next(new HttpError(err, 500));

            const updatedPfp = await User.findByIdAndUpdate(req.user.id, {avatar: newFileName}, {new: true});
            if(!updatedPfp) return next(new HttpError("Profile picture couldn't be changed", 422));

            res.status(200).json(updatedPfp);
        })

    }
    catch (error) {
        return next(new HttpError(error, 500));    
    }
}

// Edit user details
// PATCH req : api/users/edit-user
// Protected
const editUser = async (req, res, next) => {
    try {
        const {name, email, currPassword, newPassword, confirmNewPassword} = req.body;
        if(!name || !email || !currPassword || !newPassword || !confirmNewPassword) return next(new HttpError("Fill in all fields.", 422));

        const user = await User.findById(req.user.id);
        if(!user) return next(new HttpError('User not found.', 404));

        const emailExists = await User.findOne({email});
        if(emailExists && (emailExists._id !== req.user.id)) return next(new HttpError('Email already exist.', 422));

        const matchingPasswords = await bcrypt.compare(currPassword, user.password);
        if(!matchingPasswords) return next(new HttpError('Invalid current password.', 422));

        if(newPassword !== confirmNewPassword) return next(new HttpError('New passwords do not match', 422));

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(newPassword, salt);

        const newInfo = await User.findByIdAndUpdate(req.user.id, {name, email, password: hashedPass}, {new: true});
        res.status(200).json(newInfo);
    }
    catch (error) {
        return next(new HttpError(error, 500));    
    }
}

module.exports = {registerUser, loginUser, getUser, getAuthors, changePFP, editUser};