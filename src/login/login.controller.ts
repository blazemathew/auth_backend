import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body(ValidationPipe) loginDto: LoginDto) {
    return this.loginService.login(loginDto);
  }
}