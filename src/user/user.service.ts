import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserUpdateDto } from './dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  public constructor(private readonly prisma: PrismaService) {}

  public async UserUpdate(
    userId: number,
    dto: UserUpdateDto,
  ): Promise<Omit<User, 'password'>> {
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
