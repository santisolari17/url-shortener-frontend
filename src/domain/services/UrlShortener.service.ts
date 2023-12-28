/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppConfig, appConfig } from '../../infrastructure/config/AppConfig';
import { http } from '../../infrastructure/services/Http/AxiosHttpClient/Http.service';
import { IHttpClient } from '../../infrastructure/services/Http/interfaces/IHttpClient';
import { ShortUrl } from '../entities/ShortUrl.entity';

class UrlShortenerService {
  // private readonly _host = 'http://back.sbx5.blue.cl';
  private readonly _host: string;

  constructor(
    private readonly _http: IHttpClient,
    config: IAppConfig,
  ) {
    this._host = config.backendUrl;
  }

  public async getShortUrlList(): Promise<ShortUrl[]> {
    const url = `${this._host}/urlshort`;
    const response = await this._http.get<ShortUrl[]>({ url });

    const shortUrls = response.data.map(el => new ShortUrl(el));

    return shortUrls;
  }

  public async shortenUrl(longUrl: string) {
    const url = `${this._host}/urlshort`;
    const body = { longUrl };
    const response = await this._http.post<ShortUrl>({ url, body });

    const shortUrl = new ShortUrl(response.data);

    return shortUrl;
  }

  public async deleteShortUrls(urlIds: string[]) {
    const url = `${this._host}/urlshort`;
    const body = { urlIds };
    await this._http.delete<ShortUrl>({ url, body });
  }
}

export const urlShortenerService = new UrlShortenerService(http, appConfig);
