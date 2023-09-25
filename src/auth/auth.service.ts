import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  public constructor(private prisma: PrismaService) {}

  public async login() {}

  public async register(newUser: AuthDto) {
    const passwordHash = await argon.hash(newUser.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          emial: newUser.email,
          password: passwordHash,
        },
      });

      delete user.password;
      return user;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Email already exists');
      }

      throw error;
    }
  }
}
