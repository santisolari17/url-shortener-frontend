/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppConfig, appConfig } from '../../infrastructure/config/AppConfig';
import { http } from '../../infrastructure/services/Http/AxiosHttpClient/Http.service';
import { IHttpClient } from '../../infrastructure/services/Http/interfaces/IHttpClient';
import { ShortUrl } from '../entities/ShortUrl.entity';
import { IAuthenticationService, authService } from './Authentication.service';

class UrlShortenerService {
  private readonly _host: string;

  constructor(
    private readonly _http: IHttpClient,
    private readonly _authService: IAuthenticationService,
    config: IAppConfig,
  ) {
    this._host = config.backendUrl;
  }

  public async getShortUrlList(): Promise<ShortUrl[]> {
    const url = `${this._host}/urlshort`;
    const response = await this._http.get<ShortUrl[]>({
      url,
      headers: [{ header: 'Authorization', value: `Bearer ${this._authService.getAuthToken()}` }],
    });

    const shortUrls = response.data.map(el => new ShortUrl(el));

    return shortUrls;
  }

  public async shortenUrl(longUrl: string) {
    const url = `${this._host}/urlshort`;
    const body = { longUrl };
    const response = await this._http.post<ShortUrl>({
      url,
      body,
      headers: [{ header: 'Authorization', value: `Bearer ${this._authService.getAuthToken()}` }],
    });

    const shortUrl = new ShortUrl(response.data);

    return shortUrl;
  }

  public async getById(urlId: string) {
    const url = `${this._host}/urlshort/${urlId}`;

    const response = await this._http.get<ShortUrl>({
      url,
      headers: [{ header: 'Authorization', value: `Bearer ${this._authService.getAuthToken()}` }],
    });

    const shortUrl = new ShortUrl(response.data);

    return shortUrl;
  }

  public async deleteShortUrls(urlIds: string[]) {
    const url = `${this._host}/urlshort`;
    const body = { urlIds };
    await this._http.delete<ShortUrl>({
      url,
      body,
      headers: [{ header: 'Authorization', value: `Bearer ${this._authService.getAuthToken()}` }],
    });
  }
}

export const urlShortenerService = new UrlShortenerService(http, authService, appConfig);
