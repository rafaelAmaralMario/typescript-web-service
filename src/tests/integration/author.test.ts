"use strict";

import * as jwt from "jwt-simple";
import { app, request, expect } from "./config/helpers";
import * as httpStatus from "http-status";
import { before } from "mocha";

export const authorDefault = {
  id: 1,
  name: "Rafael Author Default",
};

describe("Author Integration tests", () => {
  const config = require("../../server/config/env/config")();
  const model = require("../../server/models");

  before((done) => {
    model.sequelize.sync().then(() => {
      done();
    });
  });

  beforeEach((done) => {
    model.Author.destroy({
      where: {},
    }).then(async () => {
      model.Author.create(authorDefault).then(() => {
        done();
      });
    });
  });

  describe("GET /api/authors", () => {
    it("Should return all authors from db", (done) => {
      request(app)
        .get("/api/authors")
        .set("Content-Type", "application/json")
        .end((error: any, res: any) => {
          expect(res.status).to.equal(httpStatus.OK);
          expect(res.body).to.be.an("array");
          expect(res.body[0].name).to.be.equal(authorDefault.name);
          expect(res.body[0].id).to.be.equal(authorDefault.id);
          done(error);
        });
    });
  });

  describe("POST /api/author/", () => {
    it("Should create a new author", (done) => {
      const author = {
        id: 2,
        name: "Rafael new Author",
      };

      request(app)
        .post("/api/author")
        .set("Content-Type", "application/json")
        .send(author)
        .end((error: any, res: any) => {
          expect(res.status).to.equal(httpStatus.OK);
          expect(res.body.id).to.be.equal(author.id);
          expect(res.body.name).to.be.equal(author.name);
          done(error);
        });
    });
  });

  describe("GET /api/author/:id", () => {
    it("Should return an author by the id", (done) => {
      request(app)
        .get(`/api/author/${authorDefault.id}`)
        .set("Content-Type", "application/json")
        .end((error: any, res: any) => {
          expect(res.status).to.equal(httpStatus.OK);
          expect(res.body.id).to.be.equal(authorDefault.id);
          expect(res.body).to.have.all.keys(["id", "name", "Posts"]);
          done(error);
        });
    });
  });

  describe("PUT /api/author/:id", () => {
    it("Should update the author by the id", (done) => {
      const author = {
        name: "Test Update",
      };

      request(app)
        .put(`/api/author/${authorDefault.id}`)
        .set("Content-Type", "application/json")
        .send(author)
        .end((error: any, res: any) => {
          expect(res.status).to.equal(httpStatus.OK);
          expect(res.body[0]).to.be.equal(1);
          done(error);
        });
    });
  });

  describe("DELETE /api/author/:id", () => {
    it("Should delete the author by the id", (done) => {
      request(app)
        .delete(`/api/author/${authorDefault.id}`)
        .set("Content-Type", "application/json")
        .end((error: any, res: any) => {
          expect(res.status).to.equal(httpStatus.OK);
          expect(res.body).to.be.equal(1);
          done(error);
        });
    });
  });
});
