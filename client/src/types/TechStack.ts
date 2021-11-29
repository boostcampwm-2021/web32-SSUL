export interface TechStack {
  id: number;
  name: string;
}

export interface TechStackResponse {
  id: number;
  name: string;
}

export interface TechStackUpdateDto {
  id: number;
  techStacks: TechStack[];
}
