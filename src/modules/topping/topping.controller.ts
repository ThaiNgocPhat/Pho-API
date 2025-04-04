import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Topping } from 'src/models/topping.schem';
import { ToppingService } from './topping.service';

@Controller('topping')
export class ToppingController {
    constructor(
        private readonly toppingService: ToppingService,
    ){}

    @Post()
    async createTopping(
        @Body() input: {name: string}
    ): Promise<Topping>{
        return this.toppingService.createTopping(input)
    }

    @Get()
    async getAllToppinges(): Promise<Topping[]>{
        return this.toppingService.listTopping()
    }

    @Put(':id')
    async updateTopping(
        @Param('id') id: string,
        @Body() input: {name: string},
    ): Promise<Topping>{
        return this.toppingService.updateTopping(id, input)
    }

    @Delete(':id')
    async deleteTopping(
        @Param('id') id: string
    ): Promise<void>{
        return this.toppingService.deleteTopping(id)
    }
}
