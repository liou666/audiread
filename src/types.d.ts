export interface MetaData {
  title: string;

  robots?: MetaDataRobots;

  description?: string;

  twitter?: MetaDataTwitter;
}

export interface MetaDataRobots {
  index?: boolean;
  follow?: boolean;
}

export interface MetaDataImage {
  url: string;
  width?: number;
  height?: number;
}

export interface MetaDataTwitter {
  handle?: string;
  site?: string;
  cardType?: string;
}
