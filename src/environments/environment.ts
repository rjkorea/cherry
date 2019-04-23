// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  debug: false,
  app: {
    protocol: 'http',
    // host: 'localhost',
    host: '192.168.35.183',
    // host: '172.16.6.19',
    // host: '172.30.1.20',
    port: 4200
  },
  api: {
    protocol: 'http',
    // host: 'localhost',
    host: '192.168.35.183',
    // host: '172.16.6.19',
    // host: '172.30.1.20',
    port: 5100
  },
  ws: {
    protocol: 'ws',
    host: 'localhost',
    // host: '192.168.35.183',
    // host: '172.16.6.19',
    // host: '172.30.1.20',
    port: 5100
  },
  iamport: {
    code: 'imp74899369',
    api_key: '4335180923213950',
    api_secret: '8PJ0Bmp6JLDTBITQ281p2BuM5jJ0FpWOeGOQ2eWMZAGBizrkHtKK4ewaygadG72VORLR5IE5ikHBT8WA'
  },
  kakao: {
    api_key: '1c9eb8b4c2d89e8f9de7d6fbc9794674'
  },
  google: {
    api_key: 'AIzaSyDj_SDwfwqwGNUjky0nri6FHcmhHyeD6j4'
  }
};
