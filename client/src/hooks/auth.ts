import { useEffect } from 'react';
import { authClient } from '@api';
import { useAppDispatch } from '@hooks';
import { setUser } from '@store/slices/userSlice';

export function useSilentRefresh(): void {
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      const userData = await authClient.getSilentRefresh();
      if (!userData) return;
      const {
        id,
        githubId: oAuthId,
        name,
        avatarUrl: image,
        feverStack,
        shareStack,
        role,
      } = userData;
      dispatch(setUser({ id, oAuthId, name, image, feverStack, shareStack, role }));
    })();
  }, []);
}
