"use strict";

import { app, request, expect } from "./config/helpers";
import * as httpStatus from "http-status";
import { before } from "mocha";
import { authorDefault } from "./author.test";

describe("Post Integration tests", () => {
  const config = require("../../server/config/env/config")();
  const model = require("../../server/models");

  const postDefault = {
    id: 1,
    title: "Post Default",
    text: "Text Default",
    authorId: authorDefault.id,
  };

  before((done) => {
    model.sequelize.sync().then(() => {
      model.Author.destroy({
        where: {},
      }).then(async () => {
        model.Author.create(authorDefault).then(() => {
          done();
        });
      });
    });
  });

  beforeEach((done) => {
    model.Post.destroy({
      where: {},
    }).then(() => {
      model.Post.create(postDefault).then(() => {
        done();
      });
    });
  });

  describe("GET /api/posts", () => {
    it("Should return all posts from db", (done) => {
      request(app)
        .get("/api/posts")
        .set("Content-Type", "application/json")
        .end((error: any, res: any) => {
          console.log("POSTSSSSSSSS", res.body[0]);

          expect(res.status).to.equal(httpStatus.OK);
          expect(res.body).to.be.an("array");
          expect(res.body[0].title).to.be.equal(postDefault.title);
          expect(res.body[0].text).to.be.equal(postDefault.text);
          expect(res.body[0].id).to.be.equal(postDefault.id);
          expect(res.body[0].Author).to.be.an("object");
          done(error);
        });
    });
  });

  describe("POST /api/post/", () => {
    it("Should create a new post", (done) => {
      const post = {
        id: 2,
        title: "New Post",
        text: " New Text",
        authorId: authorDefault.id,
      };

      request(app)
        .post("/api/post")
        .set("Content-Type", "application/json")
        .send(post)
        .end((error: any, res: any) => {
          expect(res.status).to.equal(httpStatus.OK);
          expect(res.body.id).to.be.equal(post.id);
          expect(res.body.title).to.be.equal(post.title);
          expect(res.body.text).to.be.equal(post.text);
          done(error);
        });
    });
  });

  describe("GET /api/post/:id", () => {
    it("Should return an post by the id", (done) => {
      request(app)
        .get(`/api/post/${postDefault.id}`)
        .set("Content-Type", "application/json")
        .end((error: any, res: any) => {
          expect(res.status).to.equal(httpStatus.OK);
          expect(res.body.id).to.be.equal(postDefault.id);
          expect(res.body).to.have.all.keys(["Author", "id", "text", "title"]);
          done(error);
        });
    });
  });

  describe("PUT /api/post/:id", () => {
    it("Should update the post by the id", (done) => {
      const post = {
        title: "Post Updated",
        text: "Text Updated",
      };

      request(app)
        .put(`/api/post/${postDefault.id}`)
        .set("Content-Type", "application/json")
        .send(post)
        .end((error: any, res: any) => {
          expect(res.status).to.equal(httpStatus.OK);
          expect(res.body[0]).to.be.equal(1);
          done(error);
        });
    });
  });

  describe("DELETE /api/post/:id", () => {
    it("Should delete the post by the id", (done) => {
      request(app)
        .delete(`/api/post/${postDefault.id}`)
        .set("Content-Type", "application/json")
        .end((error: any, res: any) => {
          expect(res.status).to.equal(httpStatus.OK);
          expect(res.body).to.be.equal(1);
          done(error);
        });
    });
  });
});
