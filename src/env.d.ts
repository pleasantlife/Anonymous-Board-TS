declare namespace NodeJS {
  interface ProcessEnv {
    SECRET_KEY: string;
    HOST: string;
    SQL_PORT: string;
    SQL_USER: string;
    SQL_PASSWORD: string;
  }
}
