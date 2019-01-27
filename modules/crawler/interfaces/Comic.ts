export interface Comic {
  constructor(url : string): Comic;

  analyze(): void;
  save(): void;
}
