import { Grid } from "gridjs-react";
import { TColumn } from "gridjs/dist/src/types";

interface GridTableProps {
  data: Array<Record<string, any>>;
  columns: TColumn[];
}

const GridTable: React.FC<GridTableProps> = ({ data, columns }) => {
  return (
    <div>
      <Grid
        data={data || []}
        columns={columns || []}
        search={false}
        sort={false}
        pagination={{
          enabled: true,
          limit: 10,
        }}
        autoWidth={false}
      />
    </div>
  );
};

export default GridTable;
