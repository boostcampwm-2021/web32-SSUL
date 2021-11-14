import React, { useEffect, useState } from 'react';
import { TechStack } from '@types';
import SearchBar from './SearchBar';
import SelectedTechStackList from './SelectedTechStackList';
import TechStackList from './TechStackList';

interface Props {
  baseTechStackList: TechStack[];
  usingTechStacks: string[];
  setUsingTechStacks: (newTechStacks: string[]) => void;
}

function TechStackInput({ baseTechStackList, usingTechStacks, setUsingTechStacks }: Props): JSX.Element {
  const [filteredTechStackList, setFilteredTechStackList] = useState<TechStack[]>([]);
  const [techStackInput, setTechStackInput] = useState<string>('');

  const handleTechStackInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTechStackInput(e.target.value);
  };

  useEffect(() => {
    let selectCount = 0;
    const newFilteredTechStackList = baseTechStackList.filter((techStack) => {
      return techStack.name.includes(techStackInput) && selectCount++ < 10;
    });
    setFilteredTechStackList(newFilteredTechStackList);
  }, [baseTechStackList, techStackInput]);
  return (
    <>
      <SearchBar onChange={handleTechStackInputChange}></SearchBar>
      <SelectedTechStackList usingTechStacks={usingTechStacks} setUsingTechStacks={setUsingTechStacks} />
      <TechStackList techStackList={filteredTechStackList} usingTechStacks={usingTechStacks} setUsingTechStacks={setUsingTechStacks} />
    </>
  );
}

export default TechStackInput;
