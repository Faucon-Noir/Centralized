import * as supertest from "supertest";
import { app } from "../index";
import server from "../index";
let tokentest: string = "";
import datatest from "./Datatest";

describe("UserController Tests", () => {
  test("Register", (done) => {
    setTimeout(() => {
      supertest(app)
        .post("/api/register")
        .send(datatest.user.data)
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .end(done);
    }, 1000);
  });

  test("Register2", async () => {
    const res: supertest.Response = await supertest(app)
      .post("/api/register")
      .send(datatest.user2.data)
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8");
  });

  test("Login", async () => {
    const res: supertest.Response = await supertest(app)
      .post("/api/login")
      .send({
        mail: datatest.user.data.mail,
        password: datatest.user.data.password,
      })
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8");

    expect(res.body).toHaveProperty("token");
    tokentest = res.body.token;
  });

  test("get user", async () => {
    const res: supertest.Response = await supertest(app)
      .get("/api/user/1a015b7a-fa7c-4b3d-ba3e-8996940615fd")
      .auth(tokentest, { type: "bearer" })
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8");
  });

  test("Patch user", async () => {
    const res: supertest.Response = await supertest(app)
      .patch("/api/user/" + datatest.user2.id)
      .send({
        mail: datatest.user2.data.mail,
        password: datatest.user2.data.password,
      })
      .auth(tokentest, { type: "bearer" })
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8");
  });
});

// server.close()

export { tokentest };
