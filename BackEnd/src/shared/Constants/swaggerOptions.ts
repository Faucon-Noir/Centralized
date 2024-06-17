const swaggerJsdoc = require("swagger-jsdoc");
const options = {
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
				Specification: {
					type: "object",
					properties: {
						id: { type: "string" },
						specification: { type: "string" },
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
						specification: {
							type: "array",
							items: {
								$ref: "#/components/schemas/Specification",
							},
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
						specification: {
							type: "array",
							items: {
								$ref: "#/components/schemas/Specification",
							},
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

module.exports = specs;

export default specs;
