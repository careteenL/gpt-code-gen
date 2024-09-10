import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AppService } from './app.service';

import { GenerateCodeDto } from './dto/generate-code.dto';

import { AppTemplateCode, getSystemContent, getUserContent } from './utils';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  // 生成代码
  @Post('generate')
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
    // TODO mock
    return await this.appService.getHistory(1)
    return await this.appService.generateCode(
      baseUrl,
      apiKey,
      prompt,
      requestData,
    );
  }

  @Get('history')
  async getHistoryList() {
    return await this.appService.getHistoryList()
  }

  @Get('history/:id')
  async getHistory(@Param('id', ParseIntPipe) id: number) {
    return await this.appService.getHistory(id)
  }
}
