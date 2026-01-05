import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];
    console.log(token);
    if (!token) {
      throw new UnauthorizedException('Authorization token is missing.');
    }
    try {
      const tokenValue = token.split(' ')[1];
      const payLoad = this.jwtService.verify(tokenValue, {
        secret: process.env.SECRET,
      });
      request.user = payLoad;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
