import { Category } from '@domains/category/models/Category';
import { IsArray, IsDate, IsNumber, IsString } from 'class-validator';
import { Group } from '../models/Group';

export class CreateGroupDto {
  @IsNumber()
  ownerId: number;
  @IsString()
  name: string;
  @IsNumber()
  maxUserCnt: number;
  @IsNumber()
  curUserCnt: number;
  @IsString()
  intro: string;
  @IsDate()
  startAt: string;
  @IsDate()
  endAt: string;
  @IsString()
  category: string;
  @IsArray()
  usingTechStacks: string[];

  toGroup(category: Category){
    const group: Group = new Group();

    group.category = category;
    group.ownerId = this.ownerId;
    group.name = this.name;
    group.maxUserCnt = this.maxUserCnt;
    group.curUserCnt = this.curUserCnt;
    group.intro = this.intro;
    group.startAt = new Date(this.startAt);
    group.endAt = new Date(this.endAt);
    
   return group;
 }
}
