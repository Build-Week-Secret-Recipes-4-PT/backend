const validateRecipe = (req, res, next) => {
    const { title, source, ingredients, instructions, category } = req.body;
    if(!title){
        res.status(400).json({
            message: "Title is missing."
        });
}   else if(!source){
        res.status(400).json({
              message: "Source is missing"
        });
    }else if(!ingredients){
        res.status(400).json({
              message: "Ingredients is missing"
        });
    }else if(!instructions){
        res.status(400).json({
              message: "Instructions is missing"
        });
    }else if(!category) {
        res.status(400).json({
            message: "Category is missing."
        });
    }else{
        next();
    }
};

module.exports = {
    validateRecipe
};