/* eslint-disable react-refresh/only-export-components */
import { GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import { AppDateUtils } from '../../../infrastructure/utils/AppDateUtils/AppDateUtils';
import { ShortUrlLink } from './tableComponents/ShortUrlLink';
import { CopyUrlButton } from './tableComponents/CopyUrlButton';
import { ViewDetailBtn } from './tableComponents/ViewDetailBtn';

export const TABLE_COLUMNS: GridColDef[] = [
  {
    field: 'copyUrl',
    headerName: 'Copy Url',
    sortable: true,
    width: 75,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params: GridRenderCellParams) => <CopyUrlButton shortUrlId={params.row.id} />,
  },
  {
    field: 'viewDetail',
    headerName: 'Detail',
    sortable: true,
    width: 75,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params: GridRenderCellParams) => <ViewDetailBtn shortUrlId={params.row.id} />,
  },
  { field: 'id', headerName: 'UrlId', width: 110 },
  {
    field: 'shortUrl',
    headerName: 'Short Url',
    width: 250,
    sortable: true,
    renderCell: (params: GridRenderCellParams) => <ShortUrlLink urlId={params.row.id} />,
  },
  {
    field: 'clicks',
    headerName: 'Clicks',
    type: 'number',
    sortable: true,
    width: 40,
  },
  {
    field: 'createdAt',
    headerName: 'Created',
    type: 'string',
    valueGetter: (params: GridValueGetterParams) => AppDateUtils.appDateStringFormat(params.row.createdAt),
    sortable: true,
    width: 100,
  },
  {
    field: 'lastVisited',
    headerName: 'Last Visited',
    type: 'string',
    valueGetter: (params: GridValueGetterParams) =>
      params.row.lastVisited ? AppDateUtils.appDatetimeStringFormat(params.row.lastVisited) : 'Not yet clicked',
    sortable: true,
    width: 155,
  },
  {
    field: 'longUrl',
    headerName: 'Long Url',
    sortable: true,
    width: 165,
  },
];
