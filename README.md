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
|  **Sessions**   |  POST  | /auth/register    | Creates a new user                        | email, password    |
|             |  POST  | /auth/login       | Logs in user                              | email, password    |
|             |  GET   | /auth/logout      | Logs out user                             | email, password    |
|**JWT Token** |  POST  | /auth2/register   | Creates a new user                        | email, password    |
|             |  POST  | /auth2/login      | Logs in and authenticates user with token | email, password    |
| **Recipes** |  GET   | /:id/recipes      | Returns a list of all available recipes   | Yes                |
|             |  POST  | /:id/recipes      | Adds and returns a newly created recipe   | Yes                |
|             |  PUT   | /:id/recipes/:recipeId| Edit a recipe by id                       | Yes                |
|             | DELETE | /:id/recipes/:recipeId      | Delete a recipe by id                     | Yes                |
