export interface Magazine {
  analyze(): Promise<void>
  save(): Promise<void>;
}
