import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Profile } from "../models/Profile";
import { ProfileRepository } from "../repository/ProfileRepository";

@Service()
export class ProfileService {
  constructor(
    @InjectRepository()
    private readonly profileRepository: ProfileRepository,
  ){}

  public async getUserIntro(userId: number) {
    const { intro }: Profile = await this.profileRepository.findOneOrFailByUserId(userId);
    return intro;
  }

  public async getUserProfile(userId: number){
    return await this.profileRepository.findOneOrFailByUserId(userId);
  }
}