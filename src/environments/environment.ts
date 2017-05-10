// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  api: {
    // host: "172.30.1.20",
    // host: "192.168.30.72",
    // host: "192.168.35.150",
    host: "localhost",
    port: 5100
  }
};
