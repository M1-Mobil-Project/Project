module.exports = app => {
    const word = require("../controllers/word.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", word.create);
  
    // Retrieve all user
    router.get("/", word.findAll);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", word.findOne);

    router.get("/alphabet/:alphabet", word.findByAlphabet);
  
    // Update a Tutorial with id
    router.put("/:id", word.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", word.delete);
  
    // Delete all user
    router.delete("/", word.deleteAll);
  
    app.use('/api/word', router);
  };
  