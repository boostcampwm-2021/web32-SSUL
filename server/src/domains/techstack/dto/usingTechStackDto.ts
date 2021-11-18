import { IsNumber, IsString } from 'class-validator';

export class GroupUsingTechStackDto {
  @IsNumber()
  techStackId: number;
  @IsString()
  name: string;
}
