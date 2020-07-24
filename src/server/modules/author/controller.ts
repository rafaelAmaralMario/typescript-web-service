import { Request, Response } from "express";
import * as _ from "lodash";

import Handlers from "../../api/responses/handlers";
import Author from "./service";

class AuthorController {
  listAuthors(req: Request, res: Response) {
    Author.listAuthors()
      .then(_.partial(Handlers.onSuccess, res))
      .catch(_.partial(Handlers.onError, res, "Error on get Authors"));
  }
  createAuthor(req: Request, res: Response) {
    const newUser = req.body;
    Author.createAuthor(newUser)
      .then(_.partial(Handlers.onSuccess, res))
      .catch(_.partial(Handlers.dbErrorHandler, res))
      .catch(_.partial(Handlers.onError, res, "Error on create author"));
  }
  getAuthorById(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    Author.getAuthorById(id)
      .then(_.partial(Handlers.onSuccess, res))
      .catch(_.partial(Handlers.onError, res, "Error get author by id"));
  }
  updateAuthor(req: Request, res: Response) {
    const userUpdate = req.body;
    const id: number = parseInt(req.params.id);

    Author.updateAuthor(id, userUpdate)
      .then(_.partial(Handlers.onSuccess, res))
      .catch(_.partial(Handlers.onError, res, "Error on update author"));
  }
  deleteAuthor(req: Request, res: Response) {
    const id: number = parseInt(req.params.id);

    Author.deleteAuthor(id)
      .then(_.partial(Handlers.onSuccess, res))
      .catch(_.partial(Handlers.onError, res, "Error on delete author"));
  }
}

export default new AuthorController();
