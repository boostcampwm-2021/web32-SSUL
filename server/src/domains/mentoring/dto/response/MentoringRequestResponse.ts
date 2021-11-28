import { MentoringRequest } from '@domains/mentoring/models/MentoringRequest';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class MentoringRequestResponse {
  @IsNumber()
  id: number;
  @IsNumber()
  groupId: number;
  @IsString()
  groupName: string;
  @IsString()
  categoryImage: string | null;
  @IsString()
  ownerName: string;
  @IsDateString()
  createdAt: Date | null;

  static from(mentoringRequest: MentoringRequest) {
    const dto = new MentoringRequestResponse();

    dto.id = mentoringRequest.id;
    dto.groupId = mentoringRequest.groupId;
    dto.groupName = mentoringRequest.group.name;
    dto.categoryImage = mentoringRequest.group.category.imageUrl;
    dto.ownerName = mentoringRequest.group.ownerInfo.name;
    dto.createdAt = mentoringRequest.createdAt;
    return dto;
  }
}
