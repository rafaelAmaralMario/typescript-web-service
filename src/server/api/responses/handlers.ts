import { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import * as httpStatus from 'http-status';
import * as jwt from 'jwt-simple';
import * as bcrypt from 'bcrypt';
const config = require('../../config/env/config')();

class Handlers {
  authFailed (req: Request, res: Response) {
    res.sendStatus(httpStatus.UNAUTHORIZED);
  }

  authSuccess (res: Response, credential: any, data: any) {
    const isMatch = bcrypt.compareSync(credential.password, data.password);

    if (isMatch) {
      const payload = {
        id: data.id,
      };
      res.json({
        token: jwt.encode(payload, config.secret),
      });
    } else {
      res.sendStatus(httpStatus.UNAUTHORIZED);
    }
  }

  onError (res: Response, message: string, err: any) {
    console.log(`Error ${err}`);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: message });
  }

  onSuccess (res: Response, data: any) {
    res.status(httpStatus.OK).json(data);
  }

  errorHandlerAPI (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
    console.log(`API Error: ${err}`);

    res.status(500).json({
      errorCode: 'ERR-001',
      message: 'Server internal errror',
    });
  }

  dbErrorHandler (res: Response, err: any) {
    console.log(`DataBase Error ${err}`);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'unexpected Error' });
  }
}

export default new Handlers();
