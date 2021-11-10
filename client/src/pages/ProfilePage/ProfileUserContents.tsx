import React from 'react';
import ProfileBox from './ProfileContentsBox';

function ProfileUserContents(): JSX.Element {
  return (
    <>
      <ProfileBox title="자기소개"></ProfileBox>
      <ProfileBox title="기술스택"></ProfileBox>
      <ProfileBox title="활동내역"></ProfileBox>
    </>
  );
}

export default ProfileUserContents;
