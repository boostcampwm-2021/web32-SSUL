import { useEffect } from 'react';
import { getSlientRefresh } from '@api/auth';
import { useAppDispatch } from '@hooks';
import { setUser } from '@store/slices/userSlice';

export function useSlientRefresh(): void {
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      const userData = await getSlientRefresh();
      if (!userData) return;
      const { githubId: id, name, avatarUrl: image } = userData;
      dispatch(setUser({ id, name, image }));
    })();
  }, []);
}
