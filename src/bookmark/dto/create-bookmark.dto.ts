import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookmarkDto {
  @ApiProperty({
    description: 'The title of the bookmark',
    example: 'NestJS',
  })
  @IsString()
  @IsNotEmpty()
  public title: string;

  @ApiProperty({
    description: 'The description of the bookmark',
    example:
      'A progressive Node.js framework for building efficient, reliable and scalable server-side applications.',
  })
  @IsString()
  @IsOptional()
  public description?: string;

  @ApiProperty({
    description: 'The link of the bookmark',
    example: 'https://nestjs.com/',
  })
  @IsString()
  @IsNotEmpty()
  public link: string;
}
