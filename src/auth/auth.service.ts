import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  public constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  public async login(dto: AuthDto): Promise<{ access_token: string }> {
    const user = await this.prisma.user.findUnique({
      where: {
        emial: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('Invalid credentials');

    const isPasswordValid = await argon.verify(user.password, dto.password);

    if (!isPasswordValid) throw new ForbiddenException('Invalid credentials');

    delete user.password;
    return this.signToken(user.id, user.emial);
  }

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
      return this.signToken(user.id, user.emial);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Email already exists');
      }

      throw error;
    }
  }

  public async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15min',
      secret: this.configService.get<string>('JWT_SECRET'),
    });

    return {
      access_token: token,
    };
  }
}
