const express = require("express");
const { responseBuilder, tools } = require("../utils");
const { levelUserService } = require("../services");
const router = express.Router();

// router.get("/:id_user", async function (req, res) {
//     try{
//         console.log(req.params.id_user);
//         const result = await levelUserService.findLevelUser(id_user);
//         res.json(responseBuilder.success(result));
//     } catch(error){
//         res.json(responseBuilder.error(error.message));
//     }
// });

module.exports = router;
