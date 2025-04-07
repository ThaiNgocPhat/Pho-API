import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DbCollections } from 'src/common/contants';
import { Dish } from 'src/models/dish.schema';
import { TableOder } from 'src/models/table-order.schema';
import { CreateTableDto } from 'src/modules/table-order/dto/create-order-table.dto';

@Injectable()
export class TableOderService {
  constructor(
    @InjectModel(DbCollections.TABLE_ORDER)
    private readonly tableModel: Model<TableOder>,
    @InjectModel(DbCollections.DISH) private readonly dishModel: Model<Dish>,
  ) {}
  async create(body: CreateTableDto & { tableId: number }) {
    const { tableId, items } = body;

    // Kiểm tra nếu không có items thì ném lỗi
    if (!items || items.length === 0) {
      throw new BadRequestException('Không có món ăn nào để thêm vào giỏ');
    }

    // Tạo groupOrders với các món đã chọn
    const groupOrders = await Promise.all(
      items.map(async (item) => {
        const dishDoc = await this.dishModel.findById(item.dishId);
        if (!dishDoc) {
          throw new NotFoundException(
            `Không tìm thấy món ăn với ID: ${item.dishId}`,
          );
        }

        const dish = dishDoc.toObject() as Dish;

        // Đảm bảo rằng toppings là mảng chuỗi
        const toppings = item.toppings.map((topping) => topping); // Chỉ lấy tên topping là chuỗi

        return {
          dishId: item.dishId,
          name: dish.name,
          toppings,
          quantity: item.quantity,
          note: item.note,
        };
      }),
    );

    // Kiểm tra lại nếu groupOrders có giá trị hợp lệ
    if (groupOrders.length === 0) {
      throw new BadRequestException('Không có món nào hợp lệ trong giỏ hàng.');
    }

    // Cập nhật bàn hiện tại, chỉ tạo một nhóm chung cho bàn
    const existingOrder = await this.tableModel.findOne({ tableId });
    if (existingOrder) {
      // Nếu bàn đã có đơn, thêm món mới vào nhóm hiện có
      existingOrder.items.push(...groupOrders);

      if (existingOrder.groups.length > 0) {
        existingOrder.groups[0].orders.push(...groupOrders); // <- Cập nhật nhóm
      }

      await existingOrder.save();
      return existingOrder;
    } else {
      // Nếu bàn chưa có đơn, tạo mới đơn hàng với một nhóm chung
      const newOrderTable = new this.tableModel({
        tableId: tableId, // Sử dụng tableId trong khởi tạo
        items: groupOrders,
        groups: [
          {
            groupId: tableId, // groupId sử dụng tableId
            groupName: `Nhóm ${tableId}`,
            orders: groupOrders,
          },
        ],
      });

      // Kiểm tra và lưu bảng mới
      try {
        const savedOrderTable = await newOrderTable.save();
        return savedOrderTable;
      } catch (error) {
        console.error('Lỗi khi lưu bảng mới:', error);
        throw new InternalServerErrorException('Lỗi khi lưu bảng mới');
      }
    }
  }

  async getAllOrders(): Promise<TableOder[]> {
    return await this.tableModel.find().exec();
  }

  async findByTableId(tableId: number) {
    const order = await this.tableModel.findOne({ tableId });
    if (!order) {
      throw new NotFoundException(
        `Không tìm thấy dữ liệu bàn với tableId: ${tableId}`,
      );
    }
    return order;
  }
}
