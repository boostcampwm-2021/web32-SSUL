import React from 'react';
import { BoxModal } from '@components';
import CreateMentorStack from './CreateMentorStack';
import EditTechStack from './EditTechStack';

interface Props {
  type: string;
  onCancel: () => void;
}

const TECHSTACK_STYLE = {
  width: '700px',
  height: '450px',
  padding: '50px 50px 50px 50px',
};

const REQUEST_STYLE = {
  width: '500px',
  height: '600px',
  padding: '50px 50px 50px 50px',
};

function ProfilePageModal({ type, onCancel }: Props): JSX.Element {
  const getModalElement = () => {
    switch (type) {
      case 'EDIT_TECH_STACK':
        return <EditTechStack currentUsingTechStacks={[]} onCancel={onCancel} />;
      case 'CREATE_MENTOR_STACK':
        return <CreateMentorStack currentUsingTechStacks={[]} onCancel={onCancel} />;
      default:
        return undefined;
    }
  };

  const getModalStyle = () => {
    switch (type) {
      case 'REQUEST_MENTORING':
        return REQUEST_STYLE;
      default:
        return TECHSTACK_STYLE;
    }
  };
  return (
    <>
      {type !== 'NONE' && (
        <BoxModal 
          style={getModalStyle()} 
          element={getModalElement()} 
          onCancel={onCancel}
        />
      )}
    </>
  );
}

export default ProfilePageModal;
