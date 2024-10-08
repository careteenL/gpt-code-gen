import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { isDev } from './utils';
import { History } from './entities/history.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    HttpModule.register({
      timeout: 100000
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        isDev() && join(__dirname, '.dev.env'),
        join(__dirname, '.env'),
      ],
    }),
    TypeOrmModule.forRootAsync({
      useFactory(configService: ConfigService) {
        return {
          type: 'mysql',
          host: configService.get('db_host'),
          port: configService.get('db_port'),
          username: configService.get('db_username'),
          password: configService.get('db_password'),
          database: configService.get('db_database'),
          synchronize: false,
          logging: true,
          entities: [History],
          poolSize: 10,
          connectorPackage: 'mysql2',
          extra: {
            authPlugins: 'sha156_password',
          },
        }
      },
      inject: [ConfigService]
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory() {
        return {
          secret: 'careteen-gpt',
          signOptions: {
            expiresIn: '3d'
          }
        }
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
