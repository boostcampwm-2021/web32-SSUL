import React from 'react';
import { BoxModal } from '@components';
import PostModal from './PostModal';
import ReadModal from './ReadModal';
import { useAppDispatch } from '@hooks';
import { changeGroupModalState } from '@store/util/Slice';

interface Props {
  type: string;
}

const selectModalComponent = (type: string): JSX.Element | undefined => {
  switch (type) {
    case 'POST':
      return <PostModal />;
    case 'READ':
      return <ReadModal />;
  }
};

function GroupPageModal({ type }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const handleClickModalBackground = () => dispatch(changeGroupModalState('NONE'));
  const modalElement = selectModalComponent(type);

  return (
    <>
      {type !== 'NONE' && (
        <BoxModal
          style={{ height: '520px' }}
          element={modalElement}
          onCancel={handleClickModalBackground}
        />
      )}
    </>
  );
}

export default GroupPageModal;
