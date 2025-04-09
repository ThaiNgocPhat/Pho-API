import { Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { GroupService } from 'src/modules/group/group.service';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Delete('/group/:groupMongoId/dish/:dishIndex')
  removeDishFromGroup(
    @Param('groupMongoId') groupMongoId: string,
    @Param('dishIndex', ParseIntPipe) dishIndex: number,
  ) {
    return this.groupService.removeDishFromGroup(groupMongoId, dishIndex);
  }
}
