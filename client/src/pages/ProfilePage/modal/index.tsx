import React from 'react';
import { BoxModal } from '@components';
import CreateMentorStack from './CreateMentorStack';
import EditTechStack from './EditTechStack';
import RequestMentoring from './RequestMentoring';

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
      case 'EDIT_TECH_STACK':
        return <EditTechStack onCancel={onCancel} />;
      case 'CREATE_MENTOR_STACK':
        return <CreateMentorStack onCancel={onCancel} />;
      case 'REQUEST_MENTORING':
        return <RequestMentoring onCancel={onCancel} />;
      default:
        return undefined;
    }
  };

  return (
    <>
      {type !== 'NONE' && (
        <BoxModal 
          style={MODAL_STYLE} 
          element={getModalElement()} 
          onCancel={onCancel}
        />
      )}
    </>
  );
}

export default ProfilePageModal;
