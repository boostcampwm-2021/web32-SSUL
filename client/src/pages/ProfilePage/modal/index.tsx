import React from 'react';
import { BoxModal } from '@components';
import CreateMentorStack from './CreateMentorStack';
import EditTechStack from './EditTechStack';
import RequestMentoring from './RequestMentoring';
import { ProfilePageModalEnum } from '@constants/enums';

interface Props {
  type: string;
  onCancel: () => void;
}

const MODAL_STYLE = {
  width: '700px',
  height: '450px',
  padding: '50px 50px 50px 50px',
};

function ProfilePageModal({ type, onCancel }: Props): JSX.Element {
  const getModalElement = () => {
    switch (type) {
      case ProfilePageModalEnum.EDIT_TECH_STACK:
        return <EditTechStack onCancel={onCancel} />;
      case ProfilePageModalEnum.CREATE_MENTOR_STACK:
        return <CreateMentorStack onCancel={onCancel} />;
      case ProfilePageModalEnum.REQUEST_MENTORING:
        return <RequestMentoring />;
      default:
        return undefined;
    }
  };

  return (
    <>
      {type !== 'NONE' && (
        <BoxModal style={MODAL_STYLE} element={getModalElement()} onCancel={onCancel} />
      )}
    </>
  );
}

export default ProfilePageModal;
