export class Episode {
  constructor(
    private title: string,
    private pcURL: string,
    private mobileURL: string,
    private publishedAt: Date,
    private expiresAt?: Date
  ) {
  }

  public toJSON() {
    return {
      title: this.title,
      pcURL: this.pcURL,
      mobileURL: this.mobileURL,
      publishedAt: this.publishedAt,
      expiresAt: this.expiresAt,
    };
  }
}
