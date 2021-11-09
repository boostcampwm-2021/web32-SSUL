import { useEffect } from 'react';
import { getSilentRefresh } from '@api/auth';
import { useAppDispatch } from '@hooks';
import { setUser } from '@store/slices/userSlice';

export function useSilentRefresh(): void {
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      const userData = await getSilentRefresh();
      if (!userData) return;
      const { githubId: id, name, avatarUrl: image } = userData;
      dispatch(setUser({ id, name, image }));
    })();
  }, []);
}
