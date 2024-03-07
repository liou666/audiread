import type { SpeakOptions } from './types'
import { speak as edgeSpeak } from './edge-tts'
import { langCode2TTSLang } from './config'

export async function synthesis({ lang, ...args }: SpeakOptions, isSpeak = false) {
  const langTag = langCode2TTSLang[lang ?? 'en'] ?? 'en-US'
  return edgeSpeak({ lang: langTag, ...args }, isSpeak)
}
