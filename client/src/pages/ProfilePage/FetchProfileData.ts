import { groupHttpClient, mentoringHttpClient, techStackHttpClient, userHttpClient } from '@api';
import { GroupActivity, TechStack } from '@types';
import { formatDateToString } from '@utils/Date';

export interface ProfileState {
  intro?: string;
  techStacks?: TechStack[];
  groupActivitys?: GroupActivity[];
  isMentor?: boolean;
  mentorId?: number;
  mentoringStack?: TechStack[];
  feverStack?: number;
  shareStack?: number;
  userId?: number;
  gitHubId?: string;
  name?: string;
  avatarUrl?: string;
}

type DispatchHandler = (state: ProfileState) => void;

export const fetchBaseUserData = async (
  handler: DispatchHandler,
  gitHubId: string,
): Promise<void> => {
  try {
    const { feverStack, shareStack, id, name, avatarUrl } = await userHttpClient.getProfile(
      gitHubId,
    );
    handler({
      userId: id,
      feverStack,
      shareStack,
      gitHubId,
      name,
      avatarUrl,
    });
  } catch (e) {
    location.href = '/';
  }
};

export const fetchProfileIntro = async (id: number, handler: DispatchHandler): Promise<void> => {
  const fetchedIntro = await userHttpClient.getIntro(id);
  handler({ intro: fetchedIntro });
};

export const fetchMentoringStack = async (id: number, handler: DispatchHandler): Promise<void> => {
  try {
    const fetchedMentoringStacks = await techStackHttpClient.getMentorTechStackList(id);
    handler({ mentoringStack: fetchedMentoringStacks });
  } catch (e) {
    handler({ mentoringStack: [] });
  }
};

export const fetchMentorId = async (id: number, handler: DispatchHandler): Promise<void> => {
  try {
    const { mentorId } = await mentoringHttpClient.getMentorId(id);
    handler({ mentorId, isMentor: true });
  } catch (e) {
    handler({ isMentor: false });
  }
};

export const fetchProfileTechStack = async (
  id: number,
  handler: DispatchHandler,
): Promise<void> => {
  const fetchedTechStack = await techStackHttpClient.getMenteeTechStackList(id);
  handler({ techStacks: fetchedTechStack });
};

export const fetchGroupActivityTechStack = async (
  id: number,
  handler: DispatchHandler,
): Promise<void> => {
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
