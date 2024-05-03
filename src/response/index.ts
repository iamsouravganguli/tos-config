import { NextFunction, Request, Response } from "express";
import {ResponseProps} from "../../index";

export class ResponseServices {
  private readonly props: ResponseProps;

  constructor(text?: ResponseProps | null) {
    this.props = text;
  }

  public handler = (
    services: (req: Request, res: Response) => Promise<any>
  ) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await services(req, res);
      } catch (error) {
        next(error);
      }
    };
  };
  public error = (response: Response, error: Error) => {
    if (error.cause === "invalid_id") {
      return response.status(404).json({ message: `${this.props} not found` });
    } else {
      return response.status(500).json({ message: `Error`, error: error });
    }
  };
  public success = (
    response: Response,
    type: "create" | "update" | "delete" | "all" | "detail" | "other",
    data?: any,
  message?: string
  ) => {
    if (type === "create") {
      return response.status(200).json({ message: `${this.props} created` });
    }
    if (type === "update") {
      return response.status(200).json({ message: `${this.props} updated` });
    }
    if (type === "delete") {
      return response.status(200).json({ message: `${this.props} deleted` });
    }
    if (type === "all") {
      return response.status(200).json(data);
    }
    if (type === "detail") {
      return response.status(200).json(data);
    }
    if (type === "other") {
      return response.status(200).json({ message: message });
    } else {
      return response.status(200).json(data);
    }
  };
}
