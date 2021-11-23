import { useAppDispatch, useAppSelector } from '@hooks';
import { setLoadingState, selectLoadingState } from '@store/util/Slice';

type LoaderHookReturnType = [(mode: boolean) => void, boolean];

export function useLoader(): LoaderHookReturnType {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectLoadingState);
  const toggle = (mode: boolean): void => {
    dispatch(setLoadingState(mode));
  };
  return [toggle, isLoading];
}
