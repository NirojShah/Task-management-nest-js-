import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { TaskModule } from './task/task.module';
import { RolesModule } from './role/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Automatically load entities
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    JwtModule,
    TaskModule,
    RolesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
