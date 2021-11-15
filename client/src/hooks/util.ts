import { useAppDispatch } from '@hooks';
import { toggleLoadingState } from '@store/slices/utilSlice';

export function useLoader(): () => void {
  const dispatch = useAppDispatch();
  return function toggleState(): void {
    dispatch(toggleLoadingState());
  };
}
