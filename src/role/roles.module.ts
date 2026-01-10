import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from './role.entity';
import { RoleController } from './role.controller';
import { RolesService } from './role.service';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { RoleAssign } from './role.assign.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Roles, User, RoleAssign]), // ✅ ALL entities used
    JwtModule,
  ],
  controllers: [RoleController],
  providers: [RolesService],
})
export class RolesModule {}
