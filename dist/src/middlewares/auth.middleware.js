"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
const config_1 = require("../config");
function authenticate(req, res, next) {
    if (!config_1.config.apiSecretKey)
        return next();
    const authHeader = req.headers.authorization;
    if (authHeader === `Bearer ${config_1.config.apiSecretKey}`) {
        return next();
    }
    return res.status(401).json({ error: "Unauthorized: Invalid API Key" });
}
