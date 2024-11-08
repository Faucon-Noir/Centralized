"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckAuth = void 0;
var jwt = require("jsonwebtoken");
var CheckAuth = function (req, res, next) {
    try {
        if (req.headers.authorization) {
            var token = req.headers.authorization.split(" ")[1];
            jwt.verify(token, process.env.SEC_KEY, function (err, user) {
                if (err)
                    return res.sendStatus(403);
                req.user = user;
                next();
            });
        }
        else {
            return res.sendStatus(401).json("Please Login");
        }
    }
    catch (error) {
        return { error: "Unauthorized" };
    }
};
exports.CheckAuth = CheckAuth;
//# sourceMappingURL=Auth.js.map