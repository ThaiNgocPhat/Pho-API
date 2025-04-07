import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { HotpotService } from 'src/modules/hotpot/hotpot.service';

@Controller('hotpot')
export class HotpotController {
  constructor(private readonly hotpotService: HotpotService) {}

  @Post()
  async createHotpot(@Body() body: { price: string; note?: string }) {
    const { price, note } = body;
    return this.hotpotService.createHotPot(price, note);
  }

  @Get()
  async getHotpot() {
    return this.hotpotService.getHotPot();
  }

  @Put(':id')
  async updateHotpot(
    @Body() body: { price: string; note?: string },
    @Param('id') id: string,
  ) {
    const { price, note = '' } = body;
    return this.hotpotService.updateHotPot(id, price, note);
  }

  @Delete(':id')
  async deleteHotpot(@Param() body: { id: string }) {
    const { id } = body;
    return this.hotpotService.deleteHotPot(id);
  }
}
