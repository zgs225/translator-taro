import { YoudaoAPI, YoudaoResponse, YoudaoRequest } from "./youdao.d";
import Taro from '@tarojs/taro'

export default class YoudaoClient implements YoudaoAPI {
  async translate(req: YoudaoRequest) : Promise<YoudaoResponse> {
      const task = await Taro.request({
        url: 'https://openapi.youdao.com/api',
        data: req,
        method: 'POST'
      })
      console.log(task.errMsg)
      console.log(task.data)
      
      return new Promise<YoudaoResponse>(task.data as YoudaoResponse)
  }
}