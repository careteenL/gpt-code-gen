import { BadRequestException, Body, Controller, Get, HttpStatus, Inject, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';

import { GenerateCodeDto } from './dto/generate-code.dto';

import { AppTemplateCode, getSystemContent, getUserContent } from './utils';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { mockUser } from './vo/user.vo';
import { LoginGuard } from './login.guard';
import { RequireLogin } from './user.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Inject(JwtService)
  jwtService: JwtService

  // 生成代码
  @Post('generate')
  @RequireLogin()
  @UseGuards(LoginGuard)
  async generateCode(@Body() generateCodeDto: GenerateCodeDto) {
    const { prompt, apiKey, baseUrl, model } = generateCodeDto;

    // TODO 待扩展，比如 Element UI / Arco Design
    const uiMode = 'React & Ant Design UI';
    const uiExample = AppTemplateCode;
    const currentCode = AppTemplateCode;

    // 构建请求数据
    const messages = [
      {
        role: 'system',
        content: getSystemContent(uiMode, uiExample),
      },
      { role: 'user', content: getUserContent(currentCode, prompt) },
    ];

    const requestData = {
      messages,
      model,
      max_tokens: 4096,
    };
    return await this.appService.generateCode(
      baseUrl,
      apiKey,
      prompt,
      requestData,
    );
  }

  @Get('history')
  @RequireLogin()
  @UseGuards(LoginGuard)
  async getHistoryList() {
    return await this.appService.getHistoryList()
  }

  @Get('history/:id')
  @RequireLogin()
  @UseGuards(LoginGuard)
  async getHistory(@Param('id', ParseIntPipe) id: number) {
    return await this.appService.getHistory(id)
  }

  @Post('user/login')
  async userLogin(@Body() loginUserDto: LoginUserDto) {
    // 硬编码的目的，简化处理满足防刷接口
    if (
      loginUserDto.username === mockUser.username &&
      loginUserDto.password === mockUser.username
    ) {
      const accessToken = this.jwtService.sign(
        {
          id: mockUser.id,
          username: mockUser.username,
        },
        {
          expiresIn: '3d',
        },
      );
      return {
        userInfo: mockUser,
        accessToken,
      }
    } else {
      throw new BadRequestException('用户名密码不正确')
    }
  }
}
