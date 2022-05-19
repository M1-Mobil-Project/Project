module.exports = app => {
    const user = require("../controllers/level_user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", level_user.create);
  
    // Retrieve all user
    router.get("/", level_user.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", level_user.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", level_user.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", level_user.delete);
  
    // Delete all user
    router.delete("/", level_user.deleteAll);
  
    app.use('/api/level_user', router);
  };
  