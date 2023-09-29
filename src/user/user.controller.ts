import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserUpdateDto } from './dto';
import { UserService } from './user.service';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('api/v1/users')
export class UserController {
  public constructor(private readonly userService: UserService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Obtiene el perfil de usuario',
  })
  @Get('/profile')
  public getUser(@GetUser() user: User): User {
    return user;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Atualiza perfil de usuário',
  })
  @Patch()
  public updateUser(
    @GetUser('id') userId: number,
    @Body() dto: UserUpdateDto,
  ): Promise<Omit<User, 'password'>> {
    return this.userService.UserUpdate(userId, dto);
  }
}
