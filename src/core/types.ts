import type { LangCode } from './config'

export enum Gender {
  Male = 'Male',
  Female = 'Female'
}

export interface SpeakOptions {
  text: string
  lang?: LangCode
  rate?: number
  voiceStyle?: string
  onFinish?: () => void
  voice?: string // 角色
  volume?: number // 音量
  pitch?: number // 音高
}

export interface EdgeVoice {
  FriendlyName: string
  Gender: Gender
  Locale: string
  ShortName: string
  Name: string
  SuggestedCodec: string
  VoiceTag?: any
}

export type TTSProvider = 'WebSpeech' | 'EdgeTTS'
