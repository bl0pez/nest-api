import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDto } from './dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { Bookmark } from '@prisma/client';

@Injectable()
export class BookmarkService {
  public constructor(private readonly prisma: PrismaService) {}

  public async findAllBookmarksByUserId(userId: number): Promise<Bookmark[]> {
    return await this.prisma.bookmark.findMany({
      where: {
        userId,
      },
    });
  }

  public async findBookmarkByIdAndUserId(
    userId: number,
    bookmarkId: number,
  ): Promise<Bookmark> {
    const bookmark = await this.prisma.bookmark.findFirst({
      where: {
        id: bookmarkId,
        userId,
      },
    });

    if (!bookmark) throw new BadRequestException('Bookmark not found');

    return bookmark;
  }

  public async createBookmark(
    userId: number,
    dto: CreateBookmarkDto,
  ): Promise<Bookmark> {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        userId,
        ...dto,
      },
    });

    return bookmark;
  }

  public async updateBookmarkById(
    userId: number,
    bookmarkId: number,
    dto: UpdateBookmarkDto,
  ): Promise<Bookmark> {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkId,
      },
    });

    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('Acces to resource denied');
    }

    return await this.prisma.bookmark.update({
      where: {
        id: bookmarkId,
      },
      data: {
        ...dto,
      },
    });
  }

  public async deleteBookmarkById(userId: number, bookmarkId: number) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkId,
      },
    });

    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('Acces to resource denied');
    }

    return await this.prisma.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    });
  }
}
