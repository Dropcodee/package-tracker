import PackageModel from '@/resources/package/package.model';
import IPackage from '@/resources/package/package.interface';

class PackageService {
  public packageModel;
  constructor() {
    this.packageModel = PackageModel;
  }

  /**
   * [create new package service]
   *
   * @return  {[IPackage]}  [returns a package or error]
   */
  public async create(packageBody: IPackage): Promise<IPackage> {
    try {
      const newPackage = await this.packageModel.create(packageBody);
      return newPackage;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async allPackages(): Promise<IPackage[]> {
    try {
      const packages = await this.packageModel
        .find()
        .sort({ createdAt: -1 })
        .populate('active_delivery_id');
      return packages;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  public async getSingle(packageId: string): Promise<IPackage> {
    try {
      const dbPackage = await this.packageModel
        .findOne({
          package_id: packageId,
        })
        .populate('active_delivery_id');
      if (dbPackage !== null) {
        return dbPackage;
      } else {
        throw new Error('Cant find package with id =>' + packageId);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async update(packageBody: Partial<IPackage>): Promise<IPackage> {
    try {
      let updatedPackage = await this.packageModel.findOneAndUpdate(
        { package_id: packageBody.package_id },
        { ...packageBody }
      );
      updatedPackage = await this.packageModel
        .findOne({
          package_id: packageBody.package_id,
        })
        .populate('active_delivery_id');

      if (updatedPackage !== null) {
        return updatedPackage;
      } else {
        throw new Error('unable to find and update package with given id');
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async destroy(packageId: string): Promise<IPackage> {
    try {
      const deletedPackage = await this.packageModel.findOneAndDelete({
        package_id: packageId,
      });
      if (deletedPackage !== null) {
        return deletedPackage;
      } else {
        throw new Error('unable to find and update package with given id');
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default PackageService;
