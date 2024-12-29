import { NotFoundException } from '@nestjs/common';
import { Document, Model } from 'mongoose';

export class BaseService<T extends Document, CreateDTO, UpdateDTO> {
  constructor(private readonly model: Model<T>) {}

  async create(createDto: CreateDTO): Promise<T> {
    const createdEntity = new this.model(createDto);
    return createdEntity.save();
  }

  async findAll(): Promise<T[]> {
    return this.model.find();
  }

  async findById(id: string): Promise<T> {
    return this.model.findById(id);
  }

  async findByIdOrFail(id: string): Promise<T> {
    return this.model
      .findById(id)
      .orFail(
        new NotFoundException(this.model.modelName || 'Enitty' + ' not found'),
      );
  }

  async findOne(conditions: any): Promise<T> {
    return this.model.findOne(conditions);
  }

  async findOneOrFail(conditions: any): Promise<T> {
    return this.model
      .findOne(conditions)
      .orFail(
        new NotFoundException(this.model.modelName || 'Enitty' + ' not found'),
      );
  }

  async update(id: string, updateDto: UpdateDTO): Promise<T> {
    return this.model
      .findByIdAndUpdate(id, updateDto, { new: true })
      .orFail(
        new NotFoundException(this.model.modelName || 'Enitty' + ' not found'),
      );
  }

  async updateBy(conditions: any, updateDto: UpdateDTO): Promise<T> {
    return this.model
      .findOneAndUpdate(conditions, updateDto, { new: true })
      .orFail(
        new NotFoundException(this.model.modelName || 'Enitty' + ' not found'),
      );
  }

  async remove(id: string): Promise<T> {
    return this.model
      .findByIdAndDelete(id)
      .orFail(
        new NotFoundException(this.model.modelName || 'Enitty' + ' not found'),
      );
  }
}
