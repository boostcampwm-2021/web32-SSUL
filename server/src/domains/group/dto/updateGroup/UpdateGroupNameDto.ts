import { IsNumber, IsString, Length } from "class-validator";

export class UpdateGroupNameDto {
  @IsNumber()
  gid: number;
  @IsString()
  @Length(1, 20)
  name: string;
}