const { findByIdAndDelete } = require('../models/user');
const User = require('../models/user');

//Create A New User

const CreateNewUser = async(req, res) => {
    try {
        console.log('req.body = ',req.body);
        const {name, email, phone, address} = req.body;
        if (!name)
        {
            return res.json({message: 'Name is required'});
        }

        if (!email)
        {
            return res.json({message: 'Email is required'});
        }

        if (!phone)
        {
            return res.json({message: 'Phone No. is required'});
        }

        if (!address)
        {
            return res.json({message: 'Address is required'});
        }

        const userExists = await User.findOne({email});

        if (userExists)
        {
            return res.status(200).json({
                success: false,
                message: "ALready existing User"
            });
        }

        const user = await new User({
            name,
            email, 
            phone, 
            address
        });

        user.save();
        return res.status(200).json({
            success: true,
            message: "User created Successfully",
            user
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Problem",
            error
        });
    }
};

//Get All Users

const GetAllUsers = async (req, res) => {
    try {

        const user = await User.find({});
        return res.status(200).json(user);

    } catch (error) {
        console.log(error);
        res.status (500).json({
            success: false,
            message: "Server Problem",
            error
        });
    }
}

//Update A User

const UpdateThisUser = async (req, res) => {
    try {
        
        console.log(req.params);
        const id = req.params.user_id;
        console.log(req.body);
        const UpdatedUser = await User.findByIdAndUpdate(id, req.body, {
            new: true
        });
        return res.status(200).json({
            status: 200,
            message: "User Updated successfully",
            UpdatedUser
        });        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Problem",
            error
        });
    }
}

const DeleteThisUser = async(req, res) => {
    try {
        const id = req.params.user_id;
        const user = await User.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "User deleted Successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Problem",
            error
        })
    }
}

const GetSingleUser = async(req, res) => {
    try {

        const _id = req.params.user_id;
        const user = await User.findOne({_id});
        if (user)
        {
            res.json(user);
        }
        
    } catch (error) {
        return res.status(200).json({
            success: false,
            message: "Server Problem",
            error
        })
    }
}

module.exports = {CreateNewUser, GetAllUsers, UpdateThisUser, DeleteThisUser, GetSingleUser};