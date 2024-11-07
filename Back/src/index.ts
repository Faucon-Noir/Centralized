import { useExpressServer } from "routing-controllers";
import * as session from "express-session";
import * as bodyParser from "body-parser";
import * as express from "express";
import { Application } from "express";
import * as path from "path";
import * as cors from "cors";
import { AppDataSource } from "./db/data-source";
import * as swaggerUi from "swagger-ui-express";
import * as swaggerJsdoc from "swagger-jsdoc";
import * as dotenv from "dotenv";
dotenv.config();
const PORT: number = parseInt(process.env.PORT || "8000");

// TODO: Ajouter l'authentification avec JWT
let app: Application = express();

// app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "secret", saveUninitialized: false, resave: false }));

try {
	const connected = AppDataSource.initialize();
	if (connected) console.log("Database connected");
} catch (error) {
	console.log(error);
}

const controllerPath = path.resolve("src", "controller", "*.ts");

useExpressServer(app, {
	defaultErrorHandler: true,
	routePrefix: "/api",
	controllers: [controllerPath],
});

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "My API",
			version: "1.0.0",
		},
		servers: [
			{
				url: `${process.env.CLIENT_URL}/api`,
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

const specs = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

let server = app.listen(PORT, () => {
	return console.log(`Express is listening at ${process.env.CLIENT_URL}`), console.log(`Swagger is listening at ${process.env.CLIENT_URL}/api-docs`);
});

export { app };
export default server;
