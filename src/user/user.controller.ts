import { Controller, Get, UseGuards, Patch, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('api/v1/users')
export class UserController {
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Perfil de usuário',
  })
  @Get('/profile')
  public getUser(@GetUser() user: User) {
    return user;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Atualiza perfil de usuário',
  })
  @Patch()
  public updateUser() {}
}
