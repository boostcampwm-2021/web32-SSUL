import React from 'react';
import { BoxModal } from '@components';
import { useAppDispatch } from '@hooks';
import { changeGroupModalState } from '@store/slices/utilSlice';

interface Props {
  type: string;
}

function GroupPageModal({ type }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const handleClickModalBackground = () => dispatch(changeGroupModalState('NONE'));

  return <>{type !== 'NONE' && <BoxModal onCancel={handleClickModalBackground} />}</>;
}

export default GroupPageModal;
