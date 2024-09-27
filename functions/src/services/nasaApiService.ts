import axios from 'axios';
import { RoverType, RoverImageData, PhotoManifest, ApodData, WeatherData } from '../models/nasaApiInterface';
import { NasaApiError } from '../utils/nasaApiError';

export class NasaApiService {
  baseUrl: string;
  apiKey: string | null;

  constructor() {
    this.baseUrl = 'https://api.nasa.gov/';
    this.apiKey = process.env.NASA_API_KEY || null;
  }

  private async handleApiCall<T>(url: string): Promise<T> {
    if (!this.apiKey) {
      throw new NasaApiError('Nasa API authentication issue: API key not found');
    }

    try {
      const response = await axios.get<T>(url);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new NasaApiError('Error fetching data: ' + error.message, error.response?.status);
      }
      throw new NasaApiError('An unknown error occurred');
    }
  }

  async getApod(): Promise<ApodData> {
    const url = `${this.baseUrl}planetary/apod?api_key=${this.apiKey}`;
    return this.handleApiCall<ApodData>(url);
  }

  async getRoverImagesForSolBatch(sol: number, roverType: RoverType): Promise<RoverImageData[]> {
    const requests: Promise<RoverImageData[]>[] = [];
    const batchSize = 25;
    const allData: RoverImageData[] = [];
    const roverManifest: PhotoManifest = await this.getRoverManifest(roverType);
    const totalPhotosNeeded = roverManifest.photo_manifest.photos.find((photo) => photo.sol == sol)?.total_photos || 0;
    const totalPages = Math.ceil(totalPhotosNeeded / batchSize);

    for (let page = 1; page <= totalPages; page++) {
      const url = `${this.baseUrl}mars-photos/api/v1/rovers/${roverType}/photos?sol=${sol}&api_key=${this.apiKey}&page=${page}`;
      requests.push(this.handleApiCall<RoverImageData[]>(url));
    }

    const responses = await Promise.all(requests);
    responses.forEach((data) => allData.push(...data));
    return allData;
  }

  async getRoverImagesForSol(sol: number, roverType: RoverType, page: number): Promise<RoverImageData[]> {
    const url = `${this.baseUrl}mars-photos/api/v1/rovers/${roverType}/photos?sol=${sol}&api_key=${this.apiKey}&page=${page}`;
    return this.handleApiCall<RoverImageData[]>(url);
  }

  async getMarsWeather(): Promise<WeatherData> {
    const url = `${this.baseUrl}insight_weather/?api_key=${this.apiKey}&feedtype=json&ver=1.0`;
    return this.handleApiCall<WeatherData>(url);
  }

  async getRoverManifest(roverType: RoverType): Promise<PhotoManifest> {
    const url = `${this.baseUrl}mars-photos/api/v1/manifests/${roverType}?api_key=${this.apiKey}`;
    return this.handleApiCall<PhotoManifest>(url);
  }

  isValidRoverType(type: any): type is RoverType {
    return Object.values(RoverType).includes(type);
  }
}
