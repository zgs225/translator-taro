export interface YoudaoRequest {
  q: string
  from: string
  to: string
  appKey: string
  salt: string
  sign: string
  signType: string
  curTime: number
  ext?: string
  voice?: string
  strict?: string
}

export interface YoudaoResponse {
  errorCode: string
  query: string
  translation: string[]
  basic?: {
    phonetic: string
    'uk-phonetic': string
    'us-phonetic': string
    'uk-speech': string
    'us-speech': string
    explains: string[]
  }
  web?: {
    key: string
    value: string[]
  }[]
  l: string
  tSpeakUrl: string
  speakUrl: string
}

export interface YoudaoAPI {
  translate(req: YoudaoRequest) : Promise<YoudaoResponse>
}