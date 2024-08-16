import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dtos/create-item.dto';
import { UpdateItemDto } from './dtos/update-item.dto';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.itemsService.findById(Number(id));
  }

  @Post()
  create(@Body() item: CreateItemDto) {
    return this.itemsService.create(item);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() item: UpdateItemDto) {
    return this.itemsService.update(Number(id), item);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.itemsService.deleteById(Number(id));
  }
}
