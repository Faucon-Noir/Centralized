import * as supertest from "supertest";
import { app } from "../index";
import server from "../index";
import { tokentest } from "./UserController.test";
import datatest from "./Datatest";
import { team_id } from "./TeamController.test";
let project_id;
let cdc_id;

describe("SpecificationController Tests", () => {
	// test('Create Project, Cdc, Planning and Tickets', async () => {
	//   const res: supertest.Response = await supertest(app)
	//     .post('/api/Project/' + team_id + "/" + datatest.user.id)
	//     .auth(tokentest, { type: 'bearer' })
	//     .send(datatest.project.data)
	//     .expect(200)
	//     .expect('Content-Type', 'application/json; charset=utf-8')
	// });

	test("Get project by user", async () => {
		const res: supertest.Response = await supertest(app)
			.get("/api/project/user/" + datatest.user.id)
			.auth(tokentest, { type: "bearer" })
			.expect(200)
			.expect("Content-Type", "application/json; charset=utf-8");
		project_id = res.body[0].id || datatest.project.id;
	});

	test("Get project by id", async () => {
		const res: supertest.Response = await supertest(app)
			.get("/api/project/" + project_id)
			.auth(tokentest, { type: "bearer" })
			.expect(200)
			.expect("Content-Type", "application/json; charset=utf-8");
	});

	test("Get cdc by project", async () => {
		const res: supertest.Response = await supertest(app)
			.get("/api/cdc/project/" + project_id)
			.auth(tokentest, { type: "bearer" })
			.expect(200)
			.expect("Content-Type", "application/json; charset=utf-8");
		cdc_id = res.body.cdc.id || datatest.cdc.id;
	});

	test("Get cdc by id", async () => {
		const res: supertest.Response = await supertest(app)
			.get("/api/cdc/" + cdc_id)
			.auth(tokentest, { type: "bearer" })
			.expect(200)
			.expect("Content-Type", "application/json; charset=utf-8");
	});

	test("Get cdc by user", async () => {
		const res: supertest.Response = await supertest(app)
			.get("/api/cdc/user/" + datatest.user.id)
			.auth(tokentest, { type: "bearer" })
			.expect(200)
			.expect("Content-Type", "application/json; charset=utf-8");
	});

	test("Patch cdc", async () => {
		const res: supertest.Response = await supertest(app)
			.patch("/api/cdc/" + cdc_id)
			.auth(tokentest, { type: "bearer" })
			.send(datatest.cdc.data)
			.expect(200)
			.expect("Content-Type", "application/json; charset=utf-8");
	});

	test("Patch project", async () => {
		const res: supertest.Response = await supertest(app)
			.patch("/api/project/" + project_id)
			.auth(tokentest, { type: "bearer" })
			.send(datatest.project.data)
			.expect(200)
			.expect("Content-Type", "application/json; charset=utf-8");
	});

	// test('Delete cdc by id', async () => {
	//   const res: supertest.Response = await supertest(app)
	//     .delete('/api/cdc/' + cdc_id)
	//     .auth(tokentest, { type: 'bearer' })
	//     .expect(200)
	//     .expect('Content-Type', 'application/json; charset=utf-8')
	// });
});

server.close()
export { project_id, cdc_id };
