import { IPost, createPost, createPosts } from "./interface";
import * as Bluebird from "bluebird";
import { IAuthor } from "../author/interface";

const model = require("../../models");

class Post implements IPost {
  public id: number;
  public title: String;
  public text: String;
  public authorId?: number;
  public Author?: IAuthor[];

  createPost(post: any) {
    return model.Post.create(post);
  }
  listPosts(): Bluebird<IPost[]> {
    return model.Post.findAll({
      order: ["createdAt"],
      include: [{ model: model.Author }],
    }).then(createPosts);
  }
  getPostById(id: number): Bluebird<IPost> {
    return model.Post.findOne({
      where: { id },
      include: [{ model: model.Author }],
    }).then(createPost);
  }

  updatePost(id: number, post: any) {
    return model.Post.update(post, {
      where: { id },
      fields: ["title", "text"],
      hooks: true,
      individualHooks: true,
    });
  }
  deletePost(id: number) {
    return model.Post.destroy({
      where: { id },
    });
  }
}

export default new Post();
