const { Router } = require("express");

const UserController = require("../controllers/userController");
const usersRoutes = Router(); 

const usersController = new UserController();

usersRoutes.post("/", usersController.create);
usersRoutes.get("/", usersController.index);
usersRoutes.put("/:id", usersController.update);
usersRoutes.delete("/:id", usersController.delete);

module.exports = usersRoutes;
