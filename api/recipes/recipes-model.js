const db = require("../data/db-config");

const get = () => {
    return db("recipes");
};

const getById = (recipe_id) => {
    return db("recipes")
        .where({ recipe_id })
        .first();
};

const insert = (recipe) => {
    return db("recipes")
        .insert(recipe)
        .then(ids => {
            return getById(ids[0]);
        });
};

const update = (recipe_id, changes) => {
    return db('recipes')
    .where({ recipe_id })
    .update(changes);
};

const remove = recipe_id => {
    return db('recipes')
    .where({ recipe_id })
    .del();
};

module.exports = {
    get,
    getById,
    insert,
    update,
    remove
};