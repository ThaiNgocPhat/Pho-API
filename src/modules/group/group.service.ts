import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { DbCollections } from 'src/common/contants';
import { Group } from 'src/models/group.schema';
import { Table } from 'src/models/table.schema';

@Injectable()
export class GroupService {
  private readonly logger = new Logger(GroupService.name);
  constructor(
    @InjectModel(DbCollections.GROUP) private readonly groupModel: Model<Group>,
    @InjectModel(DbCollections.TABLE) private readonly tableModel: Model<Table>,
  ) {}

  async removeDishFromGroup(groupMongoId: string, dishIndex: number) {
    this.logger.log(
      `🧪 Bắt đầu removeDishFromGroup với groupMongoId: ${groupMongoId}, dishIndex: ${dishIndex}`,
    );

    const objectId = new Types.ObjectId(groupMongoId);

    const matchedTable = await this.tableModel.findOne({
      'groups._id': objectId,
    });
    if (!matchedTable) {
      throw new NotFoundException('Group not found');
    }

    this.logger.log(`✅ Tìm thấy table: ${matchedTable.tableId}`);

    const groupIndex = matchedTable.groups.findIndex((g) =>
      g._id.equals(objectId),
    );
    if (groupIndex === -1) {
      throw new NotFoundException('Group not found in table');
    }

    const group = matchedTable.groups[groupIndex];
    this.logger.log(`📏 Tổng số món trong group: ${group.orders?.length}`);

    if (!group.orders || dishIndex < 0 || dishIndex >= group.orders.length) {
      throw new NotFoundException('Dish not found');
    }

    const removedDish = group.orders[dishIndex];
    this.logger.log(`🗑️ Xoá món: ${JSON.stringify(removedDish)}`);

    group.orders.splice(dishIndex, 1);

    // ⚠️ Quan trọng: cần markModified vì orders là nested array
    matchedTable.markModified(`groups.${groupIndex}.orders`);

    await matchedTable.save();

    this.logger.log(`✅ Đã xoá món khỏi group`);
    return { message: 'Dish removed successfully' };
  }
}
