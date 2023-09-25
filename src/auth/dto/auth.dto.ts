import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'prueba1234@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: '1234Prueba@',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
