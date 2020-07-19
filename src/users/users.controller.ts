import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users Module')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(@Request() req): Promise<any> {
    return req.user;
  }
}
