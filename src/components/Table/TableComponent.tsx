import React, { useState } from 'react';
import {
  DataTable,
  DataTableProps,
  DataTableValueArray,
} from 'primereact/datatable';
import { Column } from 'primereact/column';

export interface ColumnConfig {
  field?: string;
  header?: string;
  body?: (rowData: any, colProps: any) => React.ReactNode;
}

type DataTableWrapperProps<T extends DataTableValueArray> =
  DataTableProps<T> & {
    value: T;
    columnsConfig: ColumnConfig[];
  };

const TableComponent = <T extends object>({
  value,
  columnsConfig,
  ...rest
}: DataTableWrapperProps<T[]>) => {
  // Inicializar el estado dentro del componente
  const [first, setFirst] = useState(0);
  const rows = 5; // Número fijo de filas por página

  const onPaginate = (e: any) => {
    setFirst(e.first);
  };

  // Función para envolver la plantilla de cuerpo (body) con 'data-testid'
  const wrapWithTestId = (
    field: string | undefined,
    bodyFunc?: (rowData: any, colProps: any) => React.ReactNode
  ) => {
    return (rowData: any, colProps: { rowIndex: number }) => {
      const baseTestId = field ? `cell-${field}` : 'cell-action';
      const dataTestId = `${baseTestId}-${colProps.rowIndex}`;
      const content = bodyFunc
        ? bodyFunc(rowData, colProps)
        : field
        ? rowData[field]
        : null;
      return <span data-testid={dataTestId}>{content}</span>;
    };
  };

  return (
    <DataTable
      value={value}
      paginator={value && value.length > 0}
      first={first}
      rows={rows}
      onPage={onPaginate}
      {...rest}
    >
      {columnsConfig.map(({ field, header, body }, index) => (
        <Column
          key={index}
          field={field ? String(field) : undefined}
          header={header}
          body={wrapWithTestId(field, body)}
        />
      ))}
    </DataTable>
  );
};

export default TableComponent;
