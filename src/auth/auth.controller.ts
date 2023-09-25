import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@ApiTags('auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    description: 'Creación de usuario exitosa',
  })
  @Post('register')
  public async signup(@Body() dto: AuthDto) {
    return await this.authService.register(dto);
  }

  @ApiResponse({
    description: 'Inicio de sesión exitoso',
  })
  @Post('login')
  public async signin(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }
}
