const router = require("express").Router();
const Users = require("./users-model");
const Recipes = require("../recipes/recipes-model");
const { restricted, validateUserId } = require("./users-middleware");
const { validateRecipe, validateRecipeId } = require("../recipes/recipes-middleware");

router.get("/", restricted, (req, res, next) => {
    Users.find()
        .then(users => res.json(users))
        .catch(err => next(err));
});

router.get("/:id", restricted, validateUserId, (req, res) => {
    res.json(req.user);
});

router.get("/:id/recipes", restricted, validateUserId, (req, res, next) => {
    const id = req.params.id;
    Users.findUserRecipes(id)
        .then(recipes => res.json(recipes))
        .catch(err => next(err));
});

router.post("/:id/recipes", restricted, validateUserId, validateRecipe, (req, res, next) => {
    const recipeInfo = { ...req.body, user_id: req.params.id};
    Recipes.insert(recipeInfo)
        .then(recipe => res.status(201).json(recipe))
        .catch(err => next(err));
});

router.get("/:id/recipes/:recipeId", restricted, validateUserId, validateRecipeId, (req, res) => {
    res.json(req.recipe);
});

router.put("/:id/recipes/:recipeId", restricted, validateUserId, validateRecipeId, validateRecipe, (req, res, next) => {
    const id = req.params.recipeId;
    const body = req.body;
    Recipes.update(id, body)
        .then(recipe => {
            res.json(recipe);
        })
        .catch(err => next(err));
});

router.delete("/:id/recipes/:recipeId", restricted, validateUserId, validateRecipeId, (req, res, next) => {
    const id = req.params.recipeId;
    Recipes.remove(id)
        .then(recipe => res.json(recipe))
        .catch(err => next(err));
});

module.exports = router;