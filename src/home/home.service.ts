import { Injectable } from '@nestjs/common';

@Injectable()
export class HomeService {
  getHome() {
    return {
      message: 'Welcome to the Home Page',
      status: 'success',
    };
  }
}