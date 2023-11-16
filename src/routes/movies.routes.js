const { Router } = require("express");

const MoviesController = require("../controllers/MoviesController");
const moviesRoutes = Router(); 

const moviesController = new MoviesController();

moviesRoutes.post("/:id", moviesController.create);
moviesRoutes.get("/", moviesController.index);
moviesRoutes.get("/:id", moviesController.show);

module.exports = moviesRoutes;