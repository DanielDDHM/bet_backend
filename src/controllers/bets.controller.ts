import {
  StatusCode,
  BetsCreateDTO,
  BetsGetDTO,
} from "../types";
import { Request, Response } from 'express';
import { BetService } from "../services";

export default class BetsController {

  async get(req: Request, res: Response) {
    const { body } = req;
    try {
      const bet = await new BetService(body as BetsGetDTO).get()
      return res.status(StatusCode.OK).send(bet)
    } catch (error: any) {
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  async create(req: Request, res: Response) {
    const { body } = req;
    try {
      const betCreated = await new BetService(body as BetsCreateDTO).create()
      return res.status(StatusCode.OK).send({ data: betCreated, message: 'BET_CREATED' })
    } catch (error: any) {
      res.status(Number(StatusCode.INTERNAL_SERVER_ERROR)).json(error)
    }
  }
  // TODO: terminar Controllers
  // async update(req: Request, res: Response) { }

  // async patch(req: Request, res: Response) { }

  // async delete(req: Request, res: Response) { }
}
