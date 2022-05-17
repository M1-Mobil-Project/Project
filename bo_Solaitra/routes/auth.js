const express = require("express");
const { responseBuilder, tools } = require("../utils");
const { authService } = require("../services");
const router = express.Router();

router.post("/sign-up", async function (req, res) {
    authService
        .inscription(req.body)
        .then((result) => {
            res.json(responseBuilder.success(result));
        })
        .catch((error) => {
            res.json(responseBuilder.error(error.message));
        });
});

router.post("/login", async function (req, res) {
    var data = authService
        .login(req.body.username, req.body.password)
        .then((result) => {
            console.log("body"+result);
            res.json(responseBuilder.success(result));
        })
        .catch((error) => {
            res.json(responseBuilder.error(error.message));
        });
    console.log("data"+data);
});

router.get("/logout", async function (req, res) {
    try {
        const token = tools.extractToken(req.headers.authorization);
        await authService.logout(token);
        res.json(responseBuilder.success("User disconnected"));
    } catch (error) {
        res.json(responseBuilder.error(error.message));
    }
});

module.exports = router;
