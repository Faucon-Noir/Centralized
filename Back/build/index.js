"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var routing_controllers_1 = require("routing-controllers");
var session = require("express-session");
var bodyParser = require("body-parser");
var express = require("express");
var path = require("path");
var cors = require("cors");
var data_source_1 = require("./db/data-source");
var swaggerUi = require("swagger-ui-express");
var swaggerJsdoc = require("swagger-jsdoc");
var dotenv = require("dotenv");
dotenv.config();
var PORT = parseInt(process.env.PORT || "8000");
// TODO: Ajouter l'authentification avec JWT
var app = express();
exports.app = app;
// app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "secret", saveUninitialized: false, resave: false }));
try {
    var connected = data_source_1.AppDataSource.initialize();
    if (connected)
        console.log("Database connected");
}
catch (error) {
    console.log(error);
}
var controllerPath = path.resolve("src", "controller", "*.ts");
(0, routing_controllers_1.useExpressServer)(app, {
    defaultErrorHandler: true,
    routePrefix: "/api",
    controllers: [controllerPath],
});
var options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "My API",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:8000/api/",
                description: "Local server",
            },
        ],
        components: {
            securitySchemes: {
                // Authentification par token JWT
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                // On définit ici les modèles de données (les entités)
                Cdc: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        cdc: { type: "string" },
                        project: {
                            type: "object",
                            properties: { id: { type: "string" } },
                        },
                        user: {
                            type: "object",
                            properties: { id: { type: "string" } },
                        },
                        team: {
                            type: "object",
                            properties: { id: { type: "string" } },
                        },
                    },
                },
                Planning: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        start_date: { type: "string" },
                        end_date: { type: "string" },
                        project: {
                            type: "object",
                            properties: { id: { type: "string" } },
                        },
                        user: {
                            type: "object",
                            properties: { id: { type: "string" } },
                        },
                        team: {
                            type: "object",
                            properties: { id: { type: "string" } },
                        },
                        ticket: {
                            type: "array",
                            items: { $ref: "#/components/schemas/Ticket" },
                        },
                    },
                },
                Project: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        name: { type: "string" },
                        description: { type: "string" },
                        start_date: { type: "string" },
                        end_date: { type: "string" },
                        team: {
                            type: "object",
                            properties: { id: { type: "string" } },
                        },
                        user: {
                            type: "object",
                            properties: { id: { type: "string" } },
                        },
                        cdc: {
                            type: "array",
                            items: { $ref: "#/components/schemas/Cdc" },
                        },
                        rex: {
                            type: "array",
                            items: { $ref: "#/components/schemas/Rex" },
                        },
                    },
                },
                Rex: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        answer1: { type: "string" },
                        answer2: { type: "string" },
                        answer3: { type: "string" },
                        projectId: { type: "string" },
                    },
                },
                Team: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        name: { type: "string" },
                        created_at: { type: "string" },
                        teamUser: {
                            type: "array",
                            items: { $ref: "#/components/schemas/TeamUser" },
                        },
                        cdc: {
                            type: "array",
                            items: { $ref: "#/components/schemas/Cdc" },
                        },
                    },
                },
                TeamUser: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        user: {
                            type: "object",
                            properties: { id: { type: "string" } },
                        },
                    },
                    Ticket: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            title: { type: "string" },
                            description: { type: "string" },
                            urgenceId: { type: "number" },
                            status: { type: "string" },
                            planningId: { type: "string" },
                            start_date: { type: "string" },
                            end_date: { type: "string" },
                        },
                    },
                    User: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            lastname: { type: "string" },
                            firstname: { type: "string" },
                            mail: { type: "string" },
                            password: { type: "string" },
                        },
                    },
                },
                Ticket: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        title: { type: "string" },
                        description: { type: "string" },
                        urgenceId: { type: "number" },
                        status: { type: "string" },
                        planningId: { type: "string" },
                        start_date: { type: "string" },
                        end_date: { type: "string" },
                    },
                },
                User: {
                    type: "object",
                    properties: {
                        id: { type: "string" },
                        lastname: { type: "string" },
                        firstname: { type: "string" },
                        mail: { type: "string" },
                        password: { type: "string" },
                    },
                },
            },
        },
    },
    apis: ["./src/controller/*.ts"], // path to the files where your routes are defined
};
var specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
var server = app.listen(PORT, function () {
    return (console.log("Express is listening at http://localhost:".concat(PORT)),
        console.log("Swagger is listening at http://localhost:".concat(PORT, "/api-docs")));
});
exports.default = server;
//# sourceMappingURL=index.js.map