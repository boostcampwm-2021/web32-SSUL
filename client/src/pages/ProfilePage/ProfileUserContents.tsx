import React from 'react';
import { ProfileIntroBox, ProfileTechStackBox, ProfileActivityListBox } from './profileBox';

function ProfileUserContents(): JSX.Element {
  return (
    <>
      <ProfileIntroBox />
      <ProfileTechStackBox />
      <ProfileActivityListBox />
    </>
  );
}

export default ProfileUserContents;
