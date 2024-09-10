import { IsNotEmpty } from 'class-validator';

export class GenerateCodeDto {
  @IsNotEmpty()
  prompt: string

  @IsNotEmpty()
  apiKey: string

  @IsNotEmpty()
  baseUrl: string

  @IsNotEmpty()
  model: string
}