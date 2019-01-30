export interface Comic {
  url: string;

  analyze(): void;
  save(): void;
  remove(): Promise<void>;
}
