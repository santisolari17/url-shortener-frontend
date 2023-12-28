import { ShortUrl } from '../../../domain/entities/ShortUrl.entity';

export type TShortUrlTableProps = {
  onSelectedElement: (elementIds: string[]) => void;
  rows: ShortUrl[];
  rowsIdProperty: string;
};
