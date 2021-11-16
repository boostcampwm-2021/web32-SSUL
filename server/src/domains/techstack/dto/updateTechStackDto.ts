import { IsArray, IsNumber } from "class-validator";

export class updateTechStackDto {
  @IsNumber()
  id: number;
  @IsArray()
  techStacks: string[];
}
