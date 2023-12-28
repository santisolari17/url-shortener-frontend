import { DataGrid } from '@mui/x-data-grid';
import { TShortUrlTableProps } from './ShortUrlTable.types';
import { TABLE_COLUMNS } from './ShortUrlTable.model';
import { Box } from '@mui/material';

export const ShortUrlTable = (props: TShortUrlTableProps) => {
  return (
    <Box sx={{ height: 375, width: '100%' }}>
      <DataGrid
        rows={props.rows}
        columns={TABLE_COLUMNS}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        density="standard"
        pageSizeOptions={[5, 10]}
        loading={props.rows.length === 0}
        checkboxSelection
        onRowSelectionModelChange={selectedRowsIds => props.onSelectedElement(selectedRowsIds as string[])}
        disableRowSelectionOnClick
      />
    </Box>
  );
};
