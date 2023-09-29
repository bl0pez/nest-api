import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@ApiTags('auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    description: 'Creación de usuario exitosa',
    status: HttpStatus.CREATED,
  })
  @Post('register')
  public async signup(@Body() dto: AuthDto): Promise<{ access_token: string }> {
    return await this.authService.register(dto);
  }

  @ApiResponse({
    description: 'Inicio de sesión exitoso',
    status: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  public async signin(@Body() dto: AuthDto): Promise<{ access_token: string }> {
    return this.authService.login(dto);
  }
}
