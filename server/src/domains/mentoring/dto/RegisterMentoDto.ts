import { TechStack } from '@domains/techstack/models/TechStack';
import { ArrayMinSize, IsArray, IsNumber, ArrayMaxSize } from 'class-validator';

export class RegisterMentoDto {
  @IsNumber()
  userId: number;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  techStacks: TechStack[];
}
