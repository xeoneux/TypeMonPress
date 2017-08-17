import { expect } from "chai";
import supertest = require("supertest");

import { Db } from "mongodb";
import { Express } from "express";

import { BAD_REQUEST, NOT_FOUND } from "http-status-codes";

import { Server } from "../src/server";

let db: Db;
let app: Express;

before(async () => {
  const server = new Server();
  const values = await server.init();
  db = values.db;
  app = values.app;
});

describe("## Misc", () => {
  describe("# GET /api/404", () => {
    it("should return 404 status", async () => {
      await supertest(app).get("/api/404").expect(NOT_FOUND);
    });
  });

  describe("# Error Handling", async () => {
    it("should handle MongoID as user ID", async () => {
      await supertest(app).get("/api/users/56z787zzz67fc").expect(BAD_REQUEST);
    });

    it("should handle express validation error - password is required", async () => {
      await supertest(app)
        .post("/api/users")
        .send({ username: "hello" })
        .expect(BAD_REQUEST);
    });
  });
});
