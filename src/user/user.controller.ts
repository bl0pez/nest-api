import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard';

@Controller('api/v1/users')
export class UserController {
  @UseGuards(JwtGuard)
  @Get('/')
  getUser(@Req() req: Request) {
    return req.user;
  }
}
