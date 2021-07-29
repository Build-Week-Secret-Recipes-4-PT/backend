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

const update = async (recipe_id, changes) => {
    await db('recipes').where({ recipe_id }).update(changes);
    return getById(recipe_id);
};

const remove = async recipe_id => {
    const removed = await getById(recipe_id);
    await db('recipes').where({ recipe_id }).del();
    return removed;
};

module.exports = {
    get,
    getById,
    insert,
    update,
    remove
};