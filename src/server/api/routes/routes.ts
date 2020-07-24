import { Application, Request, Response } from "express";
import UserRoutes from "../../modules/user/routes";
import AuthorRoutes from "../../modules/author/routes";
import PostRoutes from "../../modules/post/routes";
import TokenRoutes from "../../modules/auth/auth";

class Routes {
  constructor() {}

  initRoutes(app: Application, auth: any): void {
    //USER ROUTES
    app
      .route("/api/users")
      .all(auth.config().authenticate())
      .get(UserRoutes.listUsers);
    app
      .route("/api/user/:id")
      .all(auth.config().authenticate())
      .get(UserRoutes.getUserById);
    app
      .route("/api/user/")
      .all(auth.config().authenticate())
      .post(UserRoutes.create);
    app
      .route("/api/user/:id")
      .all(auth.config().authenticate())
      .put(UserRoutes.update);
    app
      .route("/api/user/:id")
      .all(auth.config().authenticate())
      .delete(UserRoutes.delete);

    // AUTH ROUTES
    app.route("/token").post(TokenRoutes.auth);

    //AUTHOR ROUTES

    app.route("/api/authors").get(AuthorRoutes.listAuthors);
    app.route("/api/author/:id").get(AuthorRoutes.getAuthorById);
    app.route("/api/author/").post(AuthorRoutes.create);
    app.route("/api/author/:id").put(AuthorRoutes.update);
    app.route("/api/author/:id").delete(AuthorRoutes.delete);

    // POST ROUTES
    app.route("/api/posts").get(PostRoutes.listPosts);
    app.route("/api/post/:id").get(PostRoutes.getPostById);
    app.route("/api/post/").post(PostRoutes.create);
    app.route("/api/post/:id").put(PostRoutes.update);
    app.route("/api/post/:id").delete(PostRoutes.delete);
  }
}

export default new Routes();
