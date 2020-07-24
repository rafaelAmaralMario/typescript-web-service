import { Request, Response } from "express";
import * as _ from "lodash";

import Handlers from "../../api/responses/handlers";
import Post from "./service";

class PostController {
  listPosts(req: Request, res: Response) {
    Post.listPosts()
      .then(_.partial(Handlers.onSuccess, res))
      .catch(_.partial(Handlers.onError, res, "Error on get Posts"));
  }
  createPost(req: Request, res: Response) {
    const newPost = req.body;
    Post.createPost(newPost)
      .then(_.partial(Handlers.onSuccess, res))
      .catch(_.partial(Handlers.dbErrorHandler, res))
      .catch(_.partial(Handlers.onError, res, "Error on create Post"));
  }
  getPostById(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    Post.getPostById(id)
      .then(_.partial(Handlers.onSuccess, res))
      .catch(_.partial(Handlers.onError, res, "Error get Post by id"));
  }

  updatePost(req: Request, res: Response) {
    const postUpdate = req.body;
    const id: number = parseInt(req.params.id);

    Post.updatePost(id, postUpdate)
      .then(_.partial(Handlers.onSuccess, res))
      .catch(_.partial(Handlers.onError, res, "Error on update Post"));
  }
  deletePost(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    Post.deletePost(id)
      .then(_.partial(Handlers.onSuccess, res))
      .catch(_.partial(Handlers.onError, res, "Error on delete Post"));
  }
}

export default new PostController();
