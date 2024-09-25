export interface RoverImageData {
  id: number;
  sol: number;
  camera: {
    id: number;
    name: string;
    rover_id: number;
    full_name: string;
  };
  img_src: string;
  earth_date: string;
  rover: {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
    max_sol: number;
    max_date: string;
    total_photos: number;
    cameras: {
      name: string;
      full_name: string;
    }[];
  };
}

export interface WeatherData {
  [key: string]: {
    AT: {
      av: number;
      ct: number;
      mn: number;
      mx: number;
    };
    First_UTC: string;
    HWS: {
      av: number;
      ct: number;
      mn: number;
      mx: number;
    };
    Last_UTC: string;
    Month_ordinal: number;
    Northern_season: string;
    PRE: {
      av: number;
      ct: number;
      mn: number;
      mx: number;
    };
    Season: string;
    Southern_season: string;
    WD: {
      [key: string]: {
        compass_degrees: number;
        compass_point: string;
        compass_right: number;
        compass_up: number;
        ct: number;
      };
      most_common: {
        compass_degrees: number;
        compass_point: string;
        compass_right: number;
        compass_up: number;
        ct: number;
      };
    };
  };
}

export interface ApodData {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

export interface PhotoManifest {
  photo_manifest: {
    name: string;
    landing_date: string; // Consider using Date if you will parse these dates
    launch_date: string; // Consider using Date if you will parse these dates
    status: string;
    max_sol: number;
    max_date: string; // Consider using Date if you will parse these dates
    total_photos: number;
    photos: Photo[];
  };
}

interface Photo {
  sol: number;
  earth_date: string; // Consider using Date if you will parse these dates
  total_photos: number;
  cameras: string[];
}

export enum RoverType {
  CURIOSITY = 'curiosity',
  OPPORTUNITY = 'opportunity',
  SPIRIT = 'spirit',
}
