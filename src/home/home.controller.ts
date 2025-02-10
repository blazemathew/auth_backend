import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { HomeService } from './home.service';

@Controller('home')
@UseGuards(JwtAuthGuard)
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  getHome() {
    return this.homeService.getHome();
  }
}