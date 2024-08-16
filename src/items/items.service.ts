import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateItemDto } from "./dtos/create-item.dto";
import { UpdateItemDto } from "./dtos/update-item.dto";

global.items = []

@Injectable()
export class ItemsService {
  findAll():any[]{
    return global.items
  }

  findById(id:number){
    const selectedItem = global.items.find((item) => item.id === id)
    if (!selectedItem) throw new NotFoundException('Item não encontrado.')
    return selectedItem
  }

  create(itemToCreate: CreateItemDto) {
    if (!itemToCreate.id) throw new BadRequestException('O ID precisa ser um inteiro válido.')
    if (!itemToCreate.name) throw new BadRequestException('O Nome precisa ser um texto válido.')
    if (!itemToCreate.description) throw new BadRequestException('A Descrição precisa ser um texto válido.')
    const itemWithSameId = global.items.find((item) => item.id === itemToCreate.id)
    if (itemWithSameId) throw new BadRequestException('Já existe um Item com o mesmo ID.')
    global.items.push(itemToCreate)
  }

  update(id: number, itemToUpadate: UpdateItemDto) {
    if (!itemToUpadate.name) throw new BadRequestException('O Nome precisa ser um texto válido.')
    if (!itemToUpadate.description) throw new BadRequestException('A Descrição precisa ser um texto válido.')
    const itemIndex = global.items.findIndex((item) => item.id === id);
    if (itemIndex === -1) throw new NotFoundException('Item não encontrado.');
    const updatedItem = { ...global.items[itemIndex], ...itemToUpadate };
    global.items[itemIndex] = updatedItem
    return updatedItem
  }

  deleteById(id: number){
    const itemIndex = global.items.findIndex(item => item.id === id);
    if (itemIndex === -1) throw new NotFoundException('Item não encontrado.');
    global.items.splice(itemIndex, 1);
  }
}