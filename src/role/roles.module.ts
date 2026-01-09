import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from './role.entity';
import { RoleController } from './role.controller';
import { RolesService } from './role.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Roles]), JwtModule],
  controllers: [RoleController],
  providers: [RolesService],
})
export class RolesModule {}
