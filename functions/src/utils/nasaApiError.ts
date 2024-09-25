export class NasaApiError extends Error {
  constructor(
    public message: string,
    public status?: number
  ) {
    super(message);
    this.name = 'NasaApiError';
  }
}
