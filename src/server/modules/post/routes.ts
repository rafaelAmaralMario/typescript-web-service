import { Request, Response } from "express";
import PostController from "./controller";

class PostRoutes {
  constructor() {}

  listPosts(req: Request, res: Response) {
    return PostController.listPosts(req, res);
  }
  getPostById(req: Request, res: Response) {
    return PostController.getPostById(req, res);
  }

  create(req: Request, res: Response) {
    return PostController.createPost(req, res);
  }
  update(req: Request, res: Response) {
    return PostController.updatePost(req, res);
  }
  delete(req: Request, res: Response) {
    return PostController.deletePost(req, res);
  }
}

export default new PostRoutes();
