import { HttpService } from '@nestjs/axios';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { EntityManager } from 'typeorm';
import { History } from './entities/history.entity';

@Injectable()
export class AppService {
  @Inject(HttpService)
  httpService: HttpService;

  @InjectEntityManager()
  entityManager: EntityManager

  async generateCode(
    baseUrl: string,
    apiKey: string,
    prompt: string,
    requestData: any,
  ) {
    try {
      // 发送请求给 GPT
      const response = await firstValueFrom(
        this.httpService.post(`${baseUrl}/v1/chat/completions`, requestData, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }),
      );
      console.log('response: ', response);
      const updatedCode = response.data?.choices?.[0]?.message?.content
        .replace(/```jsx|```/g, '')
        .trim();

      const newHistory = new History()
      newHistory.prompt = prompt
      newHistory.result = updatedCode
      await this.entityManager.save(History, newHistory)
      return {
        msg: '生成成功',
        code: HttpStatus.OK,
        data: updatedCode,
      };
    } catch (error) {
      return {
        msg: '生成失败',
        code: HttpStatus.BAD_GATEWAY,
        data: error.message,
      };
    }
  }

  async getHistoryList() {
    const res = await this.entityManager.find(History);
    return {
      msg: 'ok',
      code: HttpStatus.OK,
      data: res,
    }
  }

  async getHistory(id: number) {
    const res = await this.entityManager.findOne(History, {
      where: {
        id: +id,
      }
    })
    return {
      msg: 'ok',
      code: HttpStatus.OK,
      data: res,
    }
  }
}