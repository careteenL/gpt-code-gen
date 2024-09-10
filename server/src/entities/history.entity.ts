import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    comment: '提示词',
    type: 'text',
  })
  prompt: string

  @Column({
    comment: '返回结果',
    type: 'text',
  })
  result: string

  @CreateDateColumn()
  createTime: Date
}