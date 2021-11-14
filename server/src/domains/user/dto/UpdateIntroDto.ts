import { IsNumber, IsString } from "class-validator";

export class UpdateIntroDto {
  @IsNumber()
  id: number;
  @IsString()
  intro: string;
}