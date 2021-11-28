import { IsNumber, IsString, Length } from "class-validator";

export class UpdateGroupIntroDto {
  @IsNumber()
  gid: number;
  @IsString()
  @Length(1, 500)
  intro: string;
}