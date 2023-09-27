import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserUpdateDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'johndoe@gmail.com',
    type: String,
  })
  @IsString()
  @IsEmail()
  @IsOptional()
  public email?: string;

  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
    type: String,
  })
  @IsString()
  @IsOptional()
  public firstName?: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
    type: String,
  })
  @IsString()
  @IsOptional()
  public lastName?: string;
}
