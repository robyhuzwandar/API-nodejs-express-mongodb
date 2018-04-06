const User = require('../models/users');
const Car = require('../models/car');

module.exports = {
    index: async(req, res, next) => {
        const users = await User.find({});
        res.status(200).json(users);
    },

    newUser: async(req, res, next) => {
        const newUser = new User(req.body);
        const user = await newUser.save();
        res.status(201).json(user);
    },

    getUser: async(req, res, next) => {
        const { userId } = req.params;
        const user = await User.findById(userId);
        res.status(200).json(user);
    },

    replaceUser: async(req, res, next) => {
        const { userId } = req.params;
        const newUser = req.body;
        const result = await User.findByIdAndUpdate(userId, newUser);
        res.status(200).json({ success: true });
    },

    updateUser: async(req, res, next) => {
        const { userId } = req.params;
        const newUser = req.body;
        const result = await User.findByIdAndUpdate(userId, newUser);
        res.status(200).json({ success: true });
    },

    getUserCars: async(req, res, next) => {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('cars');
        res.status(200).json(user.cars);
    },

    newUserCars: async(req, res, next) => {
        const { userId } = req.params;
        const newCar = new Car(req.body);
        //get user
        const user = await User.findById(userId);
        //assign user as a car's seller
        newCar.seller = user;
        //save the car
        await newCar.save();
        //add car to the user's selling array car
        user.cars.push(newCar);
        //save the user
        await user.save();
        res.status(201).json(newCar);
    }


}