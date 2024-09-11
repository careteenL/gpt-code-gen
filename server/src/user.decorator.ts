import { createParamDecorator, ExecutionContext, SetMetadata } from "@nestjs/common";
import { AccessToken } from "./vo/user.vo";
import { Request } from 'express'

export const REQUIRE_LOGIN = 'REQUIRE_LOGIN'

export const RequireLogin = (flag = true) => SetMetadata(REQUIRE_LOGIN, flag);

export const UserInfo = createParamDecorator(
  (data: keyof AccessToken, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>()
    if (!request.user) return null
    return data ? request.user[data] : request.user
  }
)