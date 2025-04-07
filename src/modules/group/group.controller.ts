import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GroupService } from 'src/modules/group/group.service';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}
  @Post()
  async createGroup(@Body('tableId') tableId: number) {
    return await this.groupService.createGroup(tableId);
  }

  @Get()
  async getGroups(@Query('tableId') tableId: number) {
    return this.groupService.getGroupsByTableId(tableId);
  }
}
