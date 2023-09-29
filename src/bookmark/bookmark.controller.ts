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
import { CreateBookmarkDto, UpdateBookmarkDto } from './dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Bookmark } from '@prisma/client';

@ApiTags('Bookmark')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('api/v1/bookmarks')
export class BookmarkController {
  public constructor(private readonly bookmarkService: BookmarkService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Obtiene todos los marcadores del usuario',
  })
  @Get()
  getBookmarks(@GetUser('id') userId: number): Promise<Bookmark[]> {
    return this.bookmarkService.findAllBookmarksByUserId(userId);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Obtiene un marcador por ID',
  })
  @Get(':id')
  getBookmark(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ): Promise<Bookmark> {
    return this.bookmarkService.findBookmarkByIdAndUserId(userId, bookmarkId);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Crea un nuevo marcador',
  })
  @Post()
  createBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
  ): Promise<Bookmark> {
    return this.bookmarkService.createBookmark(userId, dto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Actualiza un marcador por ID',
  })
  @Patch(':id')
  updateBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: UpdateBookmarkDto,
  ): Promise<Bookmark> {
    return this.bookmarkService.updateBookmarkById(userId, bookmarkId, dto);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Elimina un marcador por ID',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ): Promise<Bookmark> {
    return this.bookmarkService.deleteBookmarkById(userId, bookmarkId);
  }
}
