import { IsArray, IsNumber } from "class-validator";
import { TechStack } from "../models/TechStack";

export class updateTechStackDto {
  @IsNumber()
  id: number;
  @IsArray()
  techStacks: TechStack[];
}
