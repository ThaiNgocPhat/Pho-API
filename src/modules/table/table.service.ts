import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbCollections } from 'src/common/contants';
import { Table } from 'src/models/table.schema';

@Injectable()
export class TableService {
  constructor(
    @InjectModel(DbCollections.TABLE)
    private readonly tableModel: Model<Table>,
  ) {}
  async createTable(tableId: number) {
    //Kiểm tra bàn đã có hay chưa
    const table = await this.tableModel.findOne({ tableId });
    if (table) {
      throw new ConflictException('Table already exists');
    }
    return this.tableModel.create({ tableId });
  }

  async getAllTables(): Promise<any> {
    return await this.tableModel.find().lean();
  }
}
