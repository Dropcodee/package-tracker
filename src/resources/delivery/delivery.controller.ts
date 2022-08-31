import { Router, Request, Response, NextFunction } from 'express';
import IController from '@/utils/interface/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import ValidationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/delivery/delivery.validation';
import DeliveryService from '@/resources/delivery/delivery.service';
import constants from '@/utils/constants';

class DeliveryController implements IController {
  public path = '/delivery';
  public router = Router();
  public DeliveryService;
  constructor() {
    this.initializeRoutes();
    this.DeliveryService = new DeliveryService();
  }

  // Routes related to packages are defined here
  private initializeRoutes(): void {
    this.router.post(
      `${this.path}`,
      ValidationMiddleware(validate.create),
      this.CreateDelivery
    );
    this.router.get(`${this.path}/:id`, this.GetSingleDelivery);
    this.router.get(`${this.path}`, this.GetAllDelivery);
    this.router.put(
      `${this.path}/:id`,
      ValidationMiddleware(validate.update),
      this.UpdateDelivery
    );
    this.router.delete(`${this.path}/:id`, this.DestroyDelivery);
  }

  private CreateDelivery = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const newDelivery = await this.DeliveryService.create(req.body);
      res.status(201).send({
        code: 201,
        success: true,
        messages: [constants.CREATE_RESOURCE_SUCCESS_MSG],
        resource: newDelivery,
      });
    } catch (error: any) {
      next(
        new HttpException(400, constants.CREATE_RESOURCE_ERROR_MSG, error.message)
      );
    }
  };

  private UpdateDelivery = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const payload = {
        delivery_id: req.params.id,
        ...req.body,
      };
      const updatedDelivery = await this.DeliveryService.update(payload);
      res
        .status(201)
        .send({
          code: 200,
          success: true,
          messages: [constants.UPDATE_RESOURCE_SUCCESS_MSG],
          resource: updatedDelivery,
        });
    } catch (error: any) {
      next(
        new HttpException(400, constants.UPDATE_RESOURCE_ERROR_MSG, error.message)
      );
    }
  };
  private GetSingleDelivery = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const singleDelivery = await this.DeliveryService.getSingle(req.params.id);
      res.status(200).send({
        success: true,
        resource: singleDelivery,
        code: 200,
        messages: [constants.FETCH_RESOURCE_SUCCESS_MSG],
      });
    } catch (error: any) {
      next(
        new HttpException(
          400,
          constants.FETCH_RESOURCE_ERROR_MSG,
          error.message
        )
      );
    }
  };
  private GetAllDelivery = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const deliveries = await this.DeliveryService.allDeliveries();
      res.status(200).send({
        code: 201,
        success: true,
        resource: [...deliveries],
        messages: [constants.FETCH_RESOURCE_SUCCESS_MSG],
      });
    } catch (error: any) {
      next(
        new HttpException(
          400,
          constants.FETCH_RESOURCE_ERROR_MSG,
          error.message
        )
      );
    }
  };
  private DestroyDelivery = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const deletedDelivery = await this.DeliveryService.destroy(req.params.id);
      res.status(200).send({
        code: 200,
        success: true,
        resource: deletedDelivery,
        messages: [constants.DELETE_RESOURCE_SUCCESS_MSG],
      });
    } catch (error: any) {
      next(
        new HttpException(
          400,
          constants.DELETE_RESOURCE_ERROR_MSG,
          error.message
        )
      );
    }
  };
}

export default DeliveryController;
