import { Request, Response } from "express";
import AuthorController from "./controller";

class AuthorRoutes {
  constructor() {}

  listAuthors(req: Request, res: Response) {
    return AuthorController.listAuthors(req, res);
  }
  getAuthorById(req: Request, res: Response) {
    return AuthorController.getAuthorById(req, res);
  }
  create(req: Request, res: Response) {
    return AuthorController.createAuthor(req, res);
  }
  update(req: Request, res: Response) {
    return AuthorController.updateAuthor(req, res);
  }
  delete(req: Request, res: Response) {
    return AuthorController.deleteAuthor(req, res);
  }
}

export default new AuthorRoutes();
