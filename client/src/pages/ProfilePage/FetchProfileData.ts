import { groupHttpClient, mentoringHttpClient, techStackHttpClient, userHttpClient } from '@api';
import { GroupActivity } from '@types';
import { formatDateToString } from '@utils/Date';

export interface ProfileState {
  intro?: string;
  techStacks?: string[];
  groupActivitys?: GroupActivity[];
  isMentor?: boolean;
  mentorId?: number;
  mentoringStack?: string[];
  feverStack?: number;
  shareStack?: number;
  userId?: number;
  gitHubId?: string;
  name?: string;
  avatarUrl?: string;
}

type DispatchHandler = (state: ProfileState) => void;

const fetchBaseUserData = async (handler: DispatchHandler, gitHubId: string): Promise<void> => {
  const { feverStack, shareStack, id, name, avatarUrl } = await userHttpClient.getProfile(gitHubId);

  handler({
    userId: id,
    feverStack,
    shareStack,
    gitHubId,
    name,
    avatarUrl,
  });
};

const fetchProfileIntro = async (id: number, handler: DispatchHandler): Promise<void> => {
  const fetchedIntro = await userHttpClient.getIntro(id);
  handler({ intro: fetchedIntro });
};

const fetchMentoringStack = async (id: number, handler: DispatchHandler): Promise<void> => {
  const fetchedMentoringStacks = await techStackHttpClient.getMentorTechStackList(id);
  const mentoringStacks = fetchedMentoringStacks.map(({ name }) => name);
  handler({ mentoringStack: mentoringStacks });
};

const fetchMentorInfo = async (id: number, handler: DispatchHandler): Promise<void> => {
  const { mentorId, isMentor } = await mentoringHttpClient.getMentorId(id);
  handler({ mentorId, isMentor });
};

const fetchProfileTechStack = async (id: number, handler: DispatchHandler): Promise<void> => {
  const fetchedTechStack = await techStackHttpClient.getMenteeTechStackList(id);
  const techStackList = fetchedTechStack.map(({ name }) => name);
  handler({ techStacks: techStackList });
};

const fetchGroupActivityTechStack = async (id: number, handler: DispatchHandler): Promise<void> => {
  const fetchedGroupActivity = await groupHttpClient.getGroupActivity(id);
  const groupActivitys = fetchedGroupActivity.map(({ name, startAt, endAt }) => {
    return {
      name: name,
      startAt: formatDateToString(startAt),
      endAt: formatDateToString(endAt),
    };
  });
  handler({ groupActivitys: groupActivitys });
};

export {
  fetchBaseUserData,
  fetchProfileIntro,
  fetchProfileTechStack,
  fetchGroupActivityTechStack,
  fetchMentorInfo,
  fetchMentoringStack,
};
