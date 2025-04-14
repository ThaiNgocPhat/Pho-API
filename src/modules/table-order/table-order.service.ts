import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { DbCollections } from 'src/common/contants';
import { Dish } from 'src/models/dish.schema';
import { TableOrder } from 'src/models/table-order.schema';

@Injectable()
export class TableOderService {
  constructor(
    @InjectModel(DbCollections.TABLE_ORDER)
    private readonly tableModel: Model<TableOrder>,
    @InjectModel(DbCollections.DISH) private readonly dishModel: Model<Dish>,
  ) {} // Controller: Đảm bảo rằng body có đủ các thuộc tính cần thiết
  async getOrderByTableId(tableId: number) {
    const table = await this.tableModel.findOne({ tableId });

    if (!table) {
      return { groups: [] }; // 👈 Fix trả về object đúng format
    }

    return table;
  }

  async createGroup(tableId: number, groupName: string) {
    let tableOrder = await this.tableModel.findOne({ tableId });

    if (!tableOrder) {
      tableOrder = new this.tableModel({ tableId, groups: [] });
    }

    const nextGroupId =
      tableOrder.groups.length > 0
        ? Math.max(...tableOrder.groups.map((g) => g.groupId)) + 1
        : 1;

    const newGroup = {
      _id: new Types.ObjectId(),
      groupId: nextGroupId,
      groupName,
      orders: [],
    };

    tableOrder.groups.push(newGroup);
    await tableOrder.save();

    return { message: 'Tạo nhóm thành công', groupId: nextGroupId };
  }

  async addOrderToGroup(data: {
    tableId: number;
    groupId: number;
    dishId: string;
    name: string;
    quantity: number;
    toppings: string[];
    note?: string;
  }) {
    const { tableId, groupId, dishId, name, quantity, toppings, note } = data;

    const table = await this.tableModel.findOne({ tableId });
    if (!table) {
      throw new Error('Bàn không tồn tại');
    }

    const group = table.groups.find((g) => g.groupId === groupId);
    if (!group) {
      throw new Error('Nhóm không tồn tại');
    }

    group.orders.push({
      dishId,
      name,
      quantity,
      toppings,
      note,
    });

    await table.save();

    return { message: 'Thêm món vào nhóm thành công' };
  }

  async deleteGroup(tableId: number, groupId: number) {
    const table = await this.tableModel.findOne({ tableId });
    if (!table) throw new NotFoundException('Không tìm thấy bàn');

    table.groups = table.groups.filter((group) => group.groupId !== groupId);
    await table.save();

    return { message: 'Đã xoá nhóm thành công' };
  }

  async removeDishFromGroup(data: {
    tableId: number;
    groupId: number;
    dishId: string;
  }) {
    const { tableId, groupId, dishId } = data;

    const table = await this.tableModel.findOne({ tableId });
    if (!table) throw new NotFoundException('Không tìm thấy bàn');

    const group = table.groups.find((g) => g.groupId === groupId);
    if (!group) throw new NotFoundException('Không tìm thấy nhóm');

    const dishIndex = group.orders.findIndex((d) => d.dishId === dishId);
    if (dishIndex === -1) {
      throw new NotFoundException('Không tìm thấy món trong nhóm');
    }

    const removedDish = group.orders[dishIndex];
    group.orders.splice(dishIndex, 1);

    await table.save();

    return {
      message: 'Xoá món khỏi nhóm thành công',
      removedDish,
    };
  }

  async updateDishQuantity(data: {
    tableId: number;
    groupId: number;
    dishId: string;
    quantity: number;
  }) {
    const { tableId, groupId, dishId, quantity } = data;

    const table = await this.tableModel.findOne({ tableId });
    if (!table) throw new NotFoundException('Không tìm thấy bàn');

    const group = table.groups.find((g) => g.groupId === groupId);
    if (!group) throw new NotFoundException('Không tìm thấy nhóm');

    const dish = group.orders.find((o) => o.dishId === dishId);
    if (!dish) throw new NotFoundException('Không tìm thấy món ăn');

    dish.quantity = quantity;
    await table.save();

    return { message: 'Cập nhật số lượng thành công' };
  }
}
