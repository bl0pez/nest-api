import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from 'src/auth/decorator';
import { CreateBookmarkDto } from './dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto copy';

@UseGuards(JwtGuard)
@Controller('api/v1/bookmarks')
export class BookmarkController {
  public constructor(private readonly bookmarkService: BookmarkService) {}

  @Get()
  getBookmarks(@GetUser('id') userId: number) {
    return this.bookmarkService.findAllBookmarksByUserId(userId);
  }

  @Get(':id')
  getBookmark(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.findBookmarkByIdAndUserId(userId, bookmarkId);
  }

  @Post()
  createBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bookmarkService.createBookmark(userId, dto);
  }

  @Patch(':id')
  updateBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: UpdateBookmarkDto,
  ) {
    return this.bookmarkService.updateBookmarkById(userId, bookmarkId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.deleteBookmarkById(userId, bookmarkId);
  }
}
