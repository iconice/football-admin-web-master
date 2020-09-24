interface IConfig {
  authKey: string
  baseUrl: string
  imgUrl: string
}
const config: IConfig = {
  baseUrl: '/',
  authKey: 'Authorization',
  imgUrl: 'http://183.230.174.110:11110/'
}
const env = process.env.REACT_APP_CONFIG_ENV || 'prod'
// tslint:disable-next-line: no-var-requires
const envConfig = require(`./config.${env}`).default || {}
export default { ...config, ...envConfig } as IConfig
