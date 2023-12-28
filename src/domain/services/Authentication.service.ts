/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppConfig, appConfig } from '../../infrastructure/config/AppConfig';
import { http } from '../../infrastructure/services/Http/AxiosHttpClient/Http.service';
import { IHttpClient } from '../../infrastructure/services/Http/interfaces/IHttpClient';

export enum ELocalStorageAuthKeys {
  Token = '9e9977df-ed01-4dca-987c-161f09e36950',
  Duration = 'c7d5f559-08ce-4a3f-b26c-259c918cb2d4',
}

export interface IAuthenticationService {
  login: (user: string, password: string) => Promise<string>;
  removeSession: () => void;
  getAuthToken: () => string | null;
  getRemainingSessionTime: () => number;
  isSessionExpired: () => boolean;
}

class AuthenticationService implements IAuthenticationService {
  private readonly _host: string;
  private readonly _sessionDurationMins = 10;

  constructor(
    private readonly _http: IHttpClient,
    config: IAppConfig,
  ) {
    this._host = config.backendUrl;
  }

  public async login(user: string, password: string): Promise<string> {
    const url = `${this._host}/authenticate`;

    const body = {
      client_id: user,
      client_secret: password,
      grant_type: 'client_credentials',
    };

    const response = await this._http.post<{ access_token: string }>({
      url,
      body,
      headers: [{ header: 'Content-Type', value: 'application/x-www-form-urlencoded' }],
    });

    const token = response.data.access_token.replace(/^Bearer\s/, '');
    this._setActiveSession(token);

    return token;
  }

  public removeSession(): void {
    localStorage.removeItem(ELocalStorageAuthKeys.Token);
    localStorage.removeItem(ELocalStorageAuthKeys.Duration);
  }

  public getAuthToken(): string | null {
    return localStorage.getItem(ELocalStorageAuthKeys.Token);
  }

  public getRemainingSessionTime(): number {
    const storedExpirationDate = localStorage.getItem(ELocalStorageAuthKeys.Duration) as string;
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();

    return duration;
  }

  public isSessionExpired(): boolean {
    return this.getRemainingSessionTime() < 0;
  }

  private _setActiveSession(token: string): void {
    localStorage.setItem(ELocalStorageAuthKeys.Token, token);
    const sessionExpiration = new Date();
    sessionExpiration.setMinutes(sessionExpiration.getMinutes() + this._sessionDurationMins);
    localStorage.setItem(ELocalStorageAuthKeys.Duration, sessionExpiration.toISOString());
  }
}

export const authService = new AuthenticationService(http, appConfig);
