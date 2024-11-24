import * as supertest from "supertest";
import { app } from "../index";
import server from "../index";
import { tokentest } from "./UserController.test";
import { project_id, cdc_id } from "./Specification.test";
import { planning_id } from "./PlanningController.test";
import { rex_id } from "./RexController.test";
import datatest from "./Datatest";
import { ticket_id } from "./TicketController.test";
import { team_id } from "./TeamController.test";

describe("Delete tests", () => {
  test("Delete Rex", async () => {
    const res: supertest.Response = await supertest(app)
      .delete("/api/rex/" + rex_id)
      .auth(tokentest, { type: "bearer" })
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8");
  });

  test("Delete ticket", async () => {
    const res: supertest.Response = await supertest(app)
      .delete("/api/ticket/" + ticket_id)
      .auth(tokentest, { type: "bearer" })
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8");
  });

  test("Delete planning", async () => {
    const res: supertest.Response = await supertest(app)
      .delete("/api/planning/" + planning_id)
      .auth(tokentest, { type: "bearer" })
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8");
  });

  test("Delete cdc", async () => {
    const res: supertest.Response = await supertest(app)
      .delete("/api/cdc/" + cdc_id)
      .auth(tokentest, { type: "bearer" })
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8");
  });

  test("Delete project", async () => {
    const res: supertest.Response = await supertest(app)
      .delete("/api/project/" + project_id)
      .auth(tokentest, { type: "bearer" })
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8");
  });

  test("Delete team", async () => {
    const res: supertest.Response = await supertest(app)
      .delete("/api/team/" + team_id)
      .auth(tokentest, { type: "bearer" })
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8");
  });
});

// server.close();
