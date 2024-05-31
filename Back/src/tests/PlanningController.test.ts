import * as supertest from "supertest";
import { app } from "../index";
import server from "../index";
import { tokentest } from "./UserController.test";
import { team_id } from "./TeamController.test";
import { project_id, cdc_id } from "./Specification.test";
import datatest from "./Datatest";
let planning_id;

describe("PlanningController Tests", () => {
  test("Create Planning", async () => {
    const res: supertest.Response = await supertest(app)
      .post("/api/planning")
      .auth(tokentest, { type: "bearer" })
      .send(datatest.planning.data)
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8");
  });

  test("Get planning by project", async () => {
    const res: supertest.Response = await supertest(app)
      .get("/api/planning/project/" + project_id)
      .auth(tokentest, { type: "bearer" })
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8");
    planning_id = res.body[0].id || datatest.planning.id;
  });

  test("Get planning by id", async () => {
    const res: supertest.Response = await supertest(app)
      .get("/api/planning/" + planning_id)
      .auth(tokentest, { type: "bearer" })
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8");
  });

  test("Patch planning", async () => {
    const res: supertest.Response = await supertest(app)
      .patch("/api/planning/" + planning_id)
      .auth(tokentest, { type: "bearer" })
      .send(datatest.planning.data)
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8");
  });
});

// server.close()
export { planning_id };
