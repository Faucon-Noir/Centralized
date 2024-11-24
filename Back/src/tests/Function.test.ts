import * as supertest from "supertest";
import { app } from "../index";
import server from "../index";
import { tokentest } from "./UserController.test";
import datatest from "./Datatest";
import { team_id } from "./TeamController.test";
import { parseDurations } from "../controller/SpecificationController";

describe('Pagination Unit Test Suites', () => {

});

server.close();
