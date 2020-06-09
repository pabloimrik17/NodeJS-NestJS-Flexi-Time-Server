import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from '../interfaces/cat.interface';

class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto): Promise<void> {
    await this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return await this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<string> {
    return `Returning cat with id ${id}`;
  }

  @Put(':id')
  async update(@Param('id') id: string): Promise<string> {
    return `Updating cat with id: ${id}`;
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    return `Deleting cat with id ${id}`;
  }
}
