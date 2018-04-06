const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();


const UsersControllers = require('../controllers/users');
const { validateParam, schemas } = require('../helpers/routeHelpers');

router.route('/')
    .get(UsersControllers.index)
    .post(UsersControllers.newUser);

router.route('/:userId')
    .get(validateParam(schemas.idSchema, 'userId'), UsersControllers.getUser)
    .put(UsersControllers.replaceUser)
    .patch(UsersControllers.updateUser);

router.route('/:userId/cars')
    .get(UsersControllers.getUserCars)
    .post(UsersControllers.newUserCars);

module.exports = router;