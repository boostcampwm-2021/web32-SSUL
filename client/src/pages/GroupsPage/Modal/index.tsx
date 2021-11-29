import React from 'react';
import { BoxModal } from '@components';
import PostModal from './PostModal';
import ReadModal from './ReadModal';
import { useAppDispatch } from '@hooks';
import { changeGroupModalState } from '@store/util/Slice';
import { ModalTypeEnum } from '@constants/enums';

interface Props {
  type: string;
}

const selectModalComponent = (type: string): JSX.Element | undefined => {
  switch (type) {
    case ModalTypeEnum.POST:
      return <PostModal mode={type} />;
    case ModalTypeEnum.UPDATE:
      return <PostModal mode={type} />;
    case ModalTypeEnum.READ:
      return <ReadModal />;
  }
};

function GroupPageModal({ type }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const handleClickModalBackground = () => dispatch(changeGroupModalState(ModalTypeEnum.NONE));
  const modalElement = selectModalComponent(type);

  return (
    <>
      {type !== ModalTypeEnum.NONE && (
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
