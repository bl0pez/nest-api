import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserUpdateDto } from './dto';

@Injectable()
export class UserService {
  public constructor(private readonly prisma: PrismaService) {}

  public async UserUpdate(userId: number, dto: UserUpdateDto) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...dto,
      },
    });

    delete user.password;

    return user;
  }
}
