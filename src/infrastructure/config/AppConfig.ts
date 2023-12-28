export interface IAppConfig {
  backendUrl: string;
  configVersion: string;
}

const configMap: IAppConfig = {
  backendUrl: import.meta.env.VITE_BACKEND_URL,
  configVersion: import.meta.env.VITE_CONFIG_VERSION,
};

class AppConfig implements IAppConfig {
  public readonly backendUrl: string;
  public readonly configVersion: string;

  constructor(config: IAppConfig) {
    this.backendUrl = config.backendUrl;
    this.configVersion = config.configVersion;
  }
}

export const appConfig = new AppConfig(configMap);
