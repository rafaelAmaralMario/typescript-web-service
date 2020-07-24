import { expect } from "./config/helpers";
import Post from "../../server/modules/post/service";
import { IPost } from "../../server/modules/post/interface";
import { authorDefault } from "./author.test";

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
    }).then(() => {
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

describe("Post Controller unit tests", () => {
  describe("Create Method Test", () => {
    it("Should Create a new Post", () => {
      const newPost = {
        id: 2,
        title: "New Post",
        text: "new Text",
        authorId: authorDefault.id,
      };

      return Post.createPost(newPost).then((data) => {
        expect(data.dataValues).to.have.all.keys([
          "id",
          "title",
          "text",
          "authorId",
          "updatedAt",
          "createdAt",
        ]);
      });
    });
  });

  describe("Delete Method Test", () => {
    it("Should delete an Post", () => {
      return Post.deletePost(postDefault.id).then((data) => {
        expect(data).to.be.equal(1);
      });
    });
  });

  describe("Update Method Test", () => {
    it("Should update an Post", () => {
      const newPostData = {
        title: "Updated Post",
        text: "updated Text",
      };

      return Post.updatePost(postDefault.id, newPostData).then((data) => {
        expect(data[0]).to.be.equal(1);
      });
    });
  });

  describe("Get Method Test", () => {
    it("Should Get a list of Post", () => {
      return Post.listPosts().then((data: IPost[]) => {
        expect(data).to.be.an("array");
        expect(data[0]).to.be.all.keys(["Author", "id", "text", "title"]);
      });
    });
    it("Should Get the Post by an ID", () => {
      return Post.getPostById(postDefault.id).then((data: IPost) => {
        expect(data).to.be.all.keys(["Author", "id", "text", "title"]);
      });
    });
  });
});
