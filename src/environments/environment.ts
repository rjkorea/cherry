// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  debug: false,
  app: {
    protocol: 'http',
    host: 'localhost',
    port: 4200
  },
  api: {
    protocol: 'http',
    host: 'localhost',
    port: 5100
  },
  iamport: {
    code: 'imp74899369',
    api_key: '4335180923213950',
    api_secret: '8PJ0Bmp6JLDTBITQ281p2BuM5jJ0FpWOeGOQ2eWMZAGBizrkHtKK4ewaygadG72VORLR5IE5ikHBT8WA'
  }
};
