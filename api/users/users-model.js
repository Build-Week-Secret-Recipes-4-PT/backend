const db = require("../data/db-config");

const find = () => {
    return db("users").select("user_id", "email").orderBy("user_id");
};

const findById = (user_id) => {
    return db("users").where({ user_id }).first();
};

const findBy = (filter) => {
    return db("users").where(filter).orderBy("user_id");
};

const add = async (body) => {
    const [user_id] = await db("users").insert(body);
    return findById(user_id);
};

const findUserRecipes = (userId) => {
    return db("recipes as r")
        .join("users as u", "u.user_id", "r.user_id")
        .select("r.title", "r.source", "r.ingredients", "r.instructions", "r.category")
        .where("r.user_id", userId);
};

module.exports = {
    find,
    findBy,
    findById,
    add,
    findUserRecipes
};