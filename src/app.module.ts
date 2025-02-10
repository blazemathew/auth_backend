import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { RegisterController } from './register/register.controller';
import { RegisterService } from './register/register.service';
import { HomeController } from './home/home.controller';
import { HomeService } from './home/home.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { User } from './register/entity/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User],
        synchronize: true, // Set to false in production
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [LoginController, RegisterController, HomeController],
  providers: [LoginService, RegisterService, HomeService, JwtStrategy],
})
export class AppModule {}