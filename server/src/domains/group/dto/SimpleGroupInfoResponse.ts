import { IsDate, IsString } from "class-validator";

export class SimpleGroupInfoResponse {
  @IsString()
  name: string | null;
  @IsString()
  intro: string | null;
  @IsDate()
  startAt: Date | null;
  @IsDate()
  endAt: Date | null;
}