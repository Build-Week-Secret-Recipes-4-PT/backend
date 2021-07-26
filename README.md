# back-end

## Deployed at: https://recipesbuild.herokuapp.com/api

## Request Data Shapes:

### When creating a new user, the following fields are required:

```
{
	email: "email",
	password: "password1"
}
```

### When creating a new recipe, the following fields are required:

```
{
title: "Chicken Casserole",
source: "Grandma",
incredients: "Cream of Chicken, Chicken, Noodles, Tears",
instructions: "Cook until edible.",
category: "Baked"
}
```

## Endpoint Schema:

|    Route    | Method | Endpoint          | Description                               | Token Required     |
| :---------: | :----: | ----------------- | ----------------------------------------- | ------------------ |
|  **Auth**   |  POST  | /auth/register    | Creates a new user                        | email, password    |
|             |  POST  | /auth/login       | Logs in user                              | email, password    |
|             |  GET   | /auth/logout      | Logs out user                             | email, password    |
|**Alt Auth** |  POST  | /auth2/register   | Creates a new user                        | email, password    |
|             |  POST  | /auth2/login      | Logs in and authenticates user with token | email, password    |
| **Recipes** |  GET   | /recipes          | Returns a list of all available recipes   | Yes                |
|             |  GET   | /recipes/:id      | Returns specified recipe by id            | Yes                |
|             |  GET   | /recipes/title    | Returns specified recipe by title         | Yes                |
|             |  GET   | /recipes/category | Returns specified recipe by category      | Yes                |
|             |  POST  | /recipes          | Adds and returns a newly created recipe   | Yes                |
|             |  PUT   | /recipes/:id      | Edit a recipe by id                       | Yes                |
|             | DELETE | /recipes/:id      | Delete a recipe by id                     | Yes                |
