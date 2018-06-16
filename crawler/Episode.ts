export class Episode {
  constructor(
    private title: string,
    private pcURL: string,
    private mobileURL: string,
    private publishedAt: Date,
    private expiresAt?: Date
  ) {
  }
}
