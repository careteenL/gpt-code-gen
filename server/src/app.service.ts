import { HttpService } from '@nestjs/axios';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { EntityManager } from 'typeorm';
import { History } from './entities/history.entity';
import OpenAI from 'openai';

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
    const openai = new OpenAI({
      apiKey,
      baseURL: `${baseUrl}/v1`
    })
    try {
      // 发送请求给 GPT
      // const response = await firstValueFrom(
      //   this.httpService.post(`${baseUrl}/v1/chat/completions`, requestData, {
      //     headers: {
      //       Authorization: `Bearer ${apiKey}`,
      //     },
      //   }),
      // );
      // console.log('response: ', response);
      const response = await openai.chat.completions.create({
        model: requestData.model,
        messages: requestData.messages
      })
      console.log('response: ', response);
      const updatedCode = response?.choices?.[0]?.message?.content
        .replace(/```jsx|```/g, '')
        .trim();

      const newHistory = new History()
      newHistory.prompt = prompt
      newHistory.result = updatedCode
      await this.entityManager.save(History, newHistory)
      return updatedCode;
    } catch (error) {
      console.log('error: ', error);
      throw new BadRequestException(error || '生成失败');
    }
  }

  async getHistoryList() {
    return await this.entityManager.find(History);
  }

  async getHistory(id: number) {
    return await this.entityManager.findOne(History, {
      where: {
        id: +id,
      }
    })
  }
}
