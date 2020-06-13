import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from '../interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';
import { ValidationPipe } from '../validation.pipe';
import { AuthGuard } from '../auth.guard';
import { RolesGuard } from '../roles.guard';
import { Roles } from '../roles.decorator';

@Controller('cats')
@UseGuards(AuthGuard, RolesGuard)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @Roles('admin')
  async create(
    @Body(new ValidationPipe()) createCatDto: CreateCatDto,
  ): Promise<void> {
               await this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return await this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<string> {
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
