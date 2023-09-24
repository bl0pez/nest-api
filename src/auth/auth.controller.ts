import { Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    description: 'Inicio de sesión exitoso',
  })
  @Post('login')
  public async signup() {
    return this.authService.login();
  }

  @ApiResponse({
    description: 'Creación de usuario exitosa',
  })
  @Post('register')
  public async signin() {
    return this.authService.register();
  }
}
