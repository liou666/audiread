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

export interface TTSConfig {
  language: string // tts stt
  voiceName: string // 参考 https://aka.ms/speech/tts-languages
  rate: number // 语速
  voiceStyle: string // 情感
  volume: number // 音量
  pitch: number // 音高
}

export enum AudioType{
  MP3 = 'audio/mp3',
  WAV = 'audio/wav',
  OGG = 'audio/ogg',
  WEBM = 'audio/webm',
}


export enum AudioFileSuffix{
  MP3 = '.mp3',
  WAV = '.wav',
  OGG = '.ogg',
  WEBM = '.webm',
}
