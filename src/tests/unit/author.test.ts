import { expect } from "./config/helpers";
import Author from "../../server/modules/author/service";
import { IAuthor } from "../../server/modules/author/interface";

const model = require("../../server/models");

export const authorDefault = {
  id: 1,
  name: "Rafael Author",
};

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

describe("Author Controller unit tests", () => {
  describe("Create Method Test", () => {
    it("Should Create a new author", () => {
      const newAuthor = {
        id: 2,
        name: "New Author",
      };

      return Author.createAuthor(newAuthor).then((data) => {
        expect(data.dataValues).to.have.all.keys([
          "id",
          "name",
          "updatedAt",
          "createdAt",
        ]);
      });
    });
  });

  describe("Delete Method Test", () => {
    it("Should delete an author", () => {
      return Author.deleteAuthor(authorDefault.id).then((data) => {
        expect(data).to.be.equal(1);
      });
    });
  });

  describe("Update Method Test", () => {
    it("Should update an author", () => {
      const newUserData = {
        name: "Updated Author",
      };

      return Author.updateAuthor(authorDefault.id, newUserData).then((data) => {
        expect(data[0]).to.be.equal(1);
      });
    });
  });

  describe("Get Method Test", () => {
    it("Should Get a list of authors", () => {
      return Author.listAuthors().then((data: IAuthor[]) => {
        expect(data).to.be.an("array");
        expect(data[0]).to.be.all.keys(["id", "name", "Posts"]);
      });
    });

    it("Should Get the author by an ID", () => {
      return Author.getAuthorById(authorDefault.id).then((data: IAuthor) => {
        expect(data).to.be.all.keys(["id", "name", "Posts"]);
      });
    });
  });
});
