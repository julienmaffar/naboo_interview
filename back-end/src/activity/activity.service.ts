import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity } from './activity.schema';
import { CreateActivityInput } from './activity.inputs.dto';

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(Activity.name)
    private activityModel: Model<Activity>,
  ) {}

  async findAll(): Promise<Activity[]> {
    return this.activityModel
      .find()
      .populate('favorites')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findLatest(): Promise<Activity[]> {
    return this.activityModel
      .find()
      .populate('favorites')
      .sort({ createdAt: -1 })
      .limit(3)
      .exec();
  }

  async findByUser(userId: string): Promise<Activity[]> {
    return this.activityModel
      .find({ owner: userId })
      .populate('favorites')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<Activity> {
    const activity = await this.activityModel
      .findById(id)
      .populate('favorites')
      .exec();
    if (!activity) throw new NotFoundException();
    return activity;
  }

  async findByIds(ids: string[]): Promise<Activity[]> {
    return this.activityModel
      .find({ _id: { $in: ids } })
      .populate('favorites')
      .exec();
  }

  async findFavoritesByUser(userId: string): Promise<Activity[]> {
    return this.activityModel
      .find({ favorites: userId })
      .populate('favorites')
      .sort({ createdAt: -1 })
      .exec();
  }

  async create(userId: string, data: CreateActivityInput): Promise<Activity> {
    const activity = await this.activityModel.create({
      ...data,
      owner: userId,
    });
    return activity;
  }

  async findCities(): Promise<string[]> {
    return this.activityModel.distinct('city').exec();
  }

  async findByCity(
    city: string,
    activity?: string,
    price?: number,
  ): Promise<Activity[]> {
    return this.activityModel
      .find({
        $and: [
          { city },
          ...(price ? [{ price }] : []),
          ...(activity ? [{ name: { $regex: activity, $options: 'i' } }] : []),
        ],
      })
      .exec();
  }

  async countDocuments(): Promise<number> {
    return this.activityModel.estimatedDocumentCount().exec();
  }

  async addToFavorite(activityId: string, userId: string): Promise<Activity> {
    const activity = await this.activityModel
      .findByIdAndUpdate(
        activityId,
        {
          $addToSet: { favorites: userId },
        },
        {
          new: true,
        },
      )
      .exec();

    if (!activity) {
      throw new NotFoundException('Activity not found');
    }

    return activity;
  }

  async removeFromFavorite(
    activityId: string,
    userId: string,
  ): Promise<Activity> {
    const activity = await this.activityModel
      .findByIdAndUpdate(
        activityId,
        {
          $pull: { favorites: userId },
        },
        {
          new: true,
        },
      )
      .exec();

    if (!activity) {
      throw new NotFoundException('Activity not found');
    }

    return activity;
  }
}
