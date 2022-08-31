import { Router, Request, Response, NextFunction } from 'express';
import IController from '@/utils/interface/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import ValidationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/package/package.validation';
import PackageService from '@/resources/package/package.service';
import constants from '@/utils/constants';

class PackageController implements IController {
  public path = '/package';
  public router = Router();
  public PackageService;
  constructor() {
    this.initializeRoutes();
    this.PackageService = new PackageService();
  }

  // Routes related to packages are defined here
  private initializeRoutes(): void {
    this.router.post(
      `${this.path}`,
      ValidationMiddleware(validate.create),
      this.CreatePackage
    );
    this.router.get(`${this.path}/:id`, this.GetSinglePackage);
    this.router.get(`${this.path}`, this.GetAllPackages);
    this.router.put(
      `${this.path}/:id`,
      ValidationMiddleware(validate.create),
      this.UpdatePackage
    );
    this.router.delete(`${this.path}/:id`, this.DestroyPackage);
  }

  private CreatePackage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const newPackage = await this.PackageService.create(req.body);
      res.status(201).send({
        code: 201,
        success: true,
        messages: [constants.CREATE_RESOURCE_SUCCESS_MSG],
        resource: newPackage,
      });
    } catch (error: any) {
      next(
        new HttpException(400, 'unable to create this package', error.message)
      );
    }
  };

  private UpdatePackage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const payload = {
        package_id: req.params.id,
        ...req.body,
      };
      const newPackage = await this.PackageService.update(payload);
      res
        .status(201)
        .send({
          code: 200,
          success: true,
          messages: [constants.CREATE_RESOURCE_SUCCESS_MSG],
          resource: newPackage,
        });
    } catch (error: any) {
      next(
        new HttpException(400, 'unable to create this package', error.message)
      );
    }
  };
  private GetSinglePackage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const singlePackage = await this.PackageService.getSingle(req.params.id);
      res.status(200).send({
        success: true,
        resource: singlePackage,
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
  private GetAllPackages = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const packages = await this.PackageService.allPackages();
      res.status(200).send({
        code: 201,
        success: true,
        resource: [...packages],
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
  private DestroyPackage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const deletedPackage = await this.PackageService.destroy(req.params.id);
      res.status(200).send({
        code: 200,
        success: true,
        resource: deletedPackage,
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

export default PackageController;
