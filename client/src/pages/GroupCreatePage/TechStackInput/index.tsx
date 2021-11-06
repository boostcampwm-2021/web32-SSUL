import React, { useEffect, useState } from 'react';
import { TechStack } from '../../../types/TechStack';
import SearchBar from './SearchBar';
import SelectedTechStackList from './SelectedTechStackList';
import TechStackList from './TechStackList';

interface Props {
  techStacks: TechStack[];
}

function TechStackInput({ techStacks: baseTechStackList }: Props): JSX.Element {
  const [filteredTechStackList, setFilteredTechStackList] = useState<TechStack[]>([]);
  const [techStackInput, setTechStackInput] = useState<string>('');

  const handleTechStackInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTechStackInput(e.target.value);
  };

  useEffect(() => {
    const newFilteredTechStackList = baseTechStackList.filter((techStack, idx) => {
      return techStack.name.includes(techStackInput) && idx < 10;
    });
    setFilteredTechStackList(newFilteredTechStackList);
  }, [baseTechStackList, techStackInput]);
  return (
    <>
      <SearchBar onChange={handleTechStackInputChange}></SearchBar>
      <SelectedTechStackList />
      <TechStackList techStackList={filteredTechStackList} />
    </>
  );
}

export default TechStackInput;
