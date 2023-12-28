/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDateUtils } from '../../infrastructure/utils/AppDateUtils/AppDateUtils';

export class ShortUrl {
  id: string;
  urlId: string;
  longUrl: string;
  createdAt: Date;
  clicks: number;
  lastVisited?: Date;

  constructor(props: any) {
    this.id = props.urlId;
    this.urlId = props.urlId;
    this.longUrl = props.longUrl;
    this.createdAt = AppDateUtils.newDateFromString(props.createdAt);
    this.clicks = props.clicks;
    this.lastVisited = props.lastVisited ? AppDateUtils.newDateFromString(props.lastVisited) : undefined;
  }
}
