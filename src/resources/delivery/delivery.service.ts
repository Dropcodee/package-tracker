import DeliveryModel from '@/resources/delivery/delivery.model';
import PackageModel from '@/resources/package/package.model';
import PackageService from '@/resources/package/package.service';
import IDelivery from '@/resources/delivery/delivery.interface';
import constants from '@/utils/constants';

class DeliveryService {
  public deliveryModel;
  public packageModel;
  public packageService;
  constructor() {
    this.deliveryModel = DeliveryModel;
    this.packageModel = PackageModel;
    this.packageService = new PackageService();
  }

  public async create(delivery: IDelivery): Promise<IDelivery> {
    try {
      // find the package
      const dbPackage = await this.packageService.getSingle(
        delivery.package_id
      );
      const newDelivery = await this.deliveryModel.create({
        package_id: dbPackage._id,
        pickup_time: delivery.pickup_time,
        start_time: delivery.start_time,
        end_time: delivery.end_time,
        location: delivery.location,
        status: constants.DELIVERY_STATUS.OPEN,
      });
      // update package with delivery id
      dbPackage.active_delivery_id = newDelivery._id;
      await this.packageService.update(dbPackage);
      return newDelivery;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(delivery: IDelivery): Promise<IDelivery> {
    try {
      const newDelivery = await this.deliveryModel.findOneAndUpdate(
        { delivery_id: delivery.delivery_id },
        { ...delivery }
      );
      if (newDelivery !== null) {
        const dbDelivery = await this.deliveryModel
          .findOne({
            delivery_id: newDelivery.delivery_id,
          })
          .populate('package_id');
        return dbDelivery!;
      } else {
        throw new Error('could not find delivery with given delivery_id');
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async allDeliveries(): Promise<IDelivery[]> {
    try {
      const deliveries = await this.deliveryModel
        .find()
        .sort({ createdAt: -1 })
        .populate('package_id');
      return deliveries;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  public async getSingle(deliveryId: string): Promise<IDelivery> {
    try {
      const dbDelivery = await this.deliveryModel
        .findOne({
          delivery_id: deliveryId,
        })
        .populate('package_id');
      if (dbDelivery !== null) {
        return dbDelivery;
      } else {
        throw new Error('Cant find delivery with id => ' + deliveryId);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async destroy(deliveryId: string): Promise<IDelivery> {
    try {
      const deletedDelivery = await this.deliveryModel.findOneAndDelete({
        delivery_id: deliveryId,
      });
      if (deletedDelivery !== null) {
        return deletedDelivery;
      } else {
        throw new Error(
          'unable to find and update delivery with given delivery_id'
        );
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default DeliveryService;
