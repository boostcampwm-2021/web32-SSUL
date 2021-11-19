import { useAppDispatch } from '@hooks';
import { toggleLoadingState } from '@store/util/Slice';

export function useLoader(): () => void {
  const dispatch = useAppDispatch();
  return function toggleState(): void {
    dispatch(toggleLoadingState());
  };
}
