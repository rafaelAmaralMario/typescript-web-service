import { IAuthor, createAuthor, createAuthors } from "./interface";
import * as Bluebird from "bluebird";

const model = require("../../models");

class Author implements IAuthor {
  public id: number;
  public name: string;

  createAuthor(author: any) {
    return model.Author.create(author);
  }

  listAuthors(): Bluebird<IAuthor[]> {
    return model.Author.findAll({
      order: ["name"],
      include: [{ model: model.Post }],
    }).then(createAuthors);
  }

  getAuthorById(id: number): Bluebird<IAuthor> {
    return model.Author.findOne({
      where: { id },
      include: [{ model: model.Post }],
    }).then(createAuthor);
  }

  updateAuthor(id: number, author: any) {
    return model.Author.update(author, {
      where: { id },
      fields: ["name"],
      hooks: true,
      individualHooks: true,
    });
  }
  deleteAuthor(id: number) {
    return model.Author.destroy({
      where: { id },
    });
  }
}

export default new Author();
