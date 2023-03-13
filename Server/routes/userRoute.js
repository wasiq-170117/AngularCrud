const express = require('express');

const {CreateNewUser, GetAllUsers, UpdateThisUser, DeleteThisUser, GetSingleUser} = require('../Controller/userController');

const router = express.Router();

router.post("/CreateNew", CreateNewUser);
router.get("/users", GetAllUsers);
router.get("/users/:user_id", GetSingleUser);
router.patch("/users/:user_id", UpdateThisUser);
router.delete("/users/:user_id", DeleteThisUser);

module.exports = router;