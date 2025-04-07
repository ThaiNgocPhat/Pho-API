import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbCollections } from 'src/common/contants';
import { Group } from 'src/models/group.schema';
import { Table } from 'src/models/table.schema';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(DbCollections.GROUP)
    private readonly groupModel: Model<Group>,
    @InjectModel(DbCollections.TABLE)
    private readonly tableModel: Model<Table>,
  ) {}

  // Tạo nhóm mới cho bàn
  async createGroup(tableId: number): Promise<Group> {
    // Tìm nhóm có groupId cao nhất
    const lastGroup = await this.groupModel
      .findOne({ tableId })
      .sort({ groupId: -1 }) // Lấy nhóm có groupId cao nhất
      .limit(1);

    // Tạo groupId mới
    const newGroupId = lastGroup ? lastGroup.groupId + 1 : 1;

    // Tạo đối tượng nhóm mới
    const newGroup = new this.groupModel({
      tableId,
      groupId: newGroupId,
      orders: [], // Mảng orders trống khi tạo nhóm mới
    });

    // Lưu nhóm mới vào database và trả về
    return await newGroup.save();
  }

  // Lấy danh sách nhóm theo tableId
  async getGroupsByTableId(tableId: number) {
    // Lấy dữ liệu nhóm từ database theo tableId
    const groups = await this.groupModel.find({ tableId });

    // Trả về đối tượng chứa trường groups
    return { groups };
  }
}
