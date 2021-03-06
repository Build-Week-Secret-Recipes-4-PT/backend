exports.up = async (knex) => {
  await knex.schema
    .createTable("users", table => {
        table.increments("user_id");
        table.text("email", 128).unique().notNullable();
        table.text("password", 128).notNullable();
    })
    .createTable("recipes", table => {
        table.increments("recipe_id");
        table.text("title", 128).unique().notNullable();
        table.text("source", 128).notNullable();
        table.text("ingredients", 128).notNullable();
        table.text("instructions", 128).notNullable();
        table.text("category", 128).notNullable();
        table.integer("user_id")
          .unsigned()
          .notNullable()
          .references("user_id")
          .inTable("users")
          .onDelete("RESTRICT");
    });
};

exports.down = async (knex) => {
  await knex.schema
    .dropTableIfExists("recipes")
    .dropTableIfExists("users");
};
