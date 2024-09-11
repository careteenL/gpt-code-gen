import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express'
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { REQUIRE_LOGIN } from './user.decorator';
import { AccessToken } from './vo/user.vo';

declare module 'express' {
  interface Request {
    user: AccessToken
  }
}

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  jwtService: JwtService

  @Inject(Reflector)
  reflector: Reflector

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const requireLogin = this.reflector.getAllAndOverride(REQUIRE_LOGIN, [
      context.getClass(),
      context.getHandler()
    ])
    // 不需要登录直接放行
    if (!requireLogin) {
      return true
    }

    const authorization = request.headers['authorization']
    if (!authorization) {
      throw new UnauthorizedException('用户未登录')
    }
    try {
      const [, token] = authorization.split(' ')
      if (!token) {
        throw new UnauthorizedException('token 已过期')
      }
      const data = this.jwtService.verify<AccessToken>(token)
      request.user = data
      return true;
    } catch (error) {
      console.log('error: ', error);
      throw new UnauthorizedException('token 已过期')
    }
  }
}
