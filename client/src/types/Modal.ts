import { MouseEvent } from 'react';

export interface BubbleModalProfileItem {
  name: string;
  handleModalItemClick(e: MouseEvent<HTMLDivElement>): void;
}
