/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { BackstageTheme } from '@backstage/theme';
import MTable, {
  Column,
  Icons,
  MaterialTableProps,
  MTableBody,
  MTableHeader,
  MTableToolbar,
  Options,
} from '@material-table/core';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { isEqual, transform } from 'lodash';
import React, {
  forwardRef,
  MutableRefObject,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { SelectPropsMod } from '../Select/SelectMod';
import { FilterMod, FiltersMod, SelectedFiltersMod, WithoutMod } from './FiltersMod';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Card } from '@material-ui/core';
import { vars } from '../../../../app/src/themes/variables';

// Material-table is not using the standard icons available in in material-ui. https://github.com/mbrn/material-table/issues/51
const tableIcons: Icons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => (
    <FilterAltOutlinedIcon {...props} ref={ref} />
  )),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => (
    <FilterAltOutlinedIcon {...props} ref={ref} />
  )), // Filtro
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

// TODO: Material table might already have such a function internally that we can use?
function extractValueByField(data: any, field: string): any | undefined {
  const path = field.split('.');
  let value = data[path[0]];

  for (let i = 1; i < path.length; ++i) {
    if (value === undefined) {
      return value;
    }

    const f = path[i];
    value = value[f];
  }

  return value;
}

export type TableHeaderClassKeyMod = 'header';

const StyledMTableHeader = withStyles(
  theme => ({
    header: {
      padding: theme.spacing(1, 2, 1, 2.5),
      borderTop: `1px solid ${theme.palette.grey.A100}`,
      borderBottom: `1px solid ${theme.palette.grey.A100}`,
      // withStyles hasn't a generic overload for theme
      fontWeight: theme.typography.fontWeightBold as any, // TSC
      position: 'static',
      wordBreak: 'normal',
    },
  }),
  { name: 'BackstageTableHeader' },
)(MTableHeader);

export type TableToolbarClassKeyMod = 'root' | 'title' | 'searchField';

const StyledMTableToolbar = withStyles(
  theme => ({
    root: {
      padding: theme.spacing(3, 0, 2.5, 2.5),
    },
    title: {
      '& > h6': {
        fontWeight: theme.typography.fontWeightBold,
      },
    },
    // ? Filtro tabla
    searchField: {
      paddingRight: theme.spacing(2),
      padding: '0px 0px 0px 1px',
      background:
        theme.palette.type === 'dark' ? vars.dark.background.white : 'none',
      border: theme.palette.type === 'dark' ? 'none' : '1px solid',
      borderRadius: '12px',
      // ? Color del texto y iconos filtro
      '& input': {
        color: 'black',
      },
      '& svg': {
        fill: 'black',
      },
    },
  }),
  { name: 'BackstageTableToolbar' },
)(MTableToolbar);

/** @public */
export type FiltersContainerClassKeyMod = 'root' | 'title';

const useFilterStyles = makeStyles<BackstageTheme>(
  theme => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      fontWeight: theme.typography.fontWeightBold as any, // TSC
      fontSize: 18,
      whiteSpace: 'nowrap',
    },
  }),
  { name: 'BackstageTableFiltersContainer' },
);

export type TableClassKeyMod = 'root';

const useTableStyles = makeStyles<BackstageTheme>(
  theme => ({
    root: {
      display: 'flex',
      alignItems: 'start',
    },
    cardContainer: {
      width: '100%',
      background: `${
        theme.palette.type === 'dark'
          ? vars.dark.background.card
          : vars.light.background.card
      }`,
      borderRadius: 12,
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 20,
      // backdropFilter: 'blur(120px)',
    },
  }),
  { name: 'BackstageTable' },
);

function convertColumns<T extends object>(
  columns: TableColumnMod<T>[],
  theme: BackstageTheme,
): TableColumnMod<T>[] {
  return columns.map(column => {
    const headerStyle: React.CSSProperties = column.headerStyle ?? {};

    let cellStyle = column.cellStyle || {};

    if (column.highlight) {
      headerStyle.color = theme.palette.text.secondary;

      if (typeof cellStyle === 'object') {
        (cellStyle as React.CSSProperties).fontWeight =
          theme.typography.fontWeightBold;
      } else {
        const cellStyleFn = cellStyle as (
          data: any,
          rowData: T,
          column?: Column<T>,
        ) => React.CSSProperties;
        cellStyle = (data, rowData, rowColumn) => {
          const style = cellStyleFn(data, rowData, rowColumn);
          return { ...style, fontWeight: theme.typography.fontWeightBold };
        };
      }
    }

    return {
      ...column,
      headerStyle,
      cellStyle,
    };
  });
}

function removeDefaultValues(state: any, defaultState: any): any {
  return transform(state, (result, value, key) => {
    if (!isEqual(value, defaultState[key])) {
      result[key] = value;
    }
  });
}

const defaultInitialState = {
  search: '',
  filtersOpen: false,
  filters: {},
};

export interface TableColumnMod<T extends object = {}> extends Column<T> {
  highlight?: boolean;
  width?: string;
}

export type TableFilterMod = {
  column: string;
  type: 'select' | 'multiple-select';
};

export type TableStateMod = {
  search?: string;
  filtersOpen?: boolean;
  filters?: SelectedFiltersMod;
};

export interface TablePropsMod<T extends object = {}>
  extends MaterialTableProps<T> {
  columns: TableColumnMod<T>[];
  subtitle?: string;
  filters?: TableFilterMod[];
  initialState?: TableStateMod;
  emptyContent?: ReactNode;
  isLoading?: boolean;
  onStateChange?: (state: TableStateMod) => any;
}

export interface TableOptionsMod<T extends object = {}> extends Options<T> {}

export function TableToolbar(toolbarProps: {
  toolbarRef: MutableRefObject<any>;
  setSearch: (value: string) => void;
  onSearchChanged: (value: string) => void;
  toggleFilters: () => void;
  hasFilters: boolean;
  selectedFiltersLength: number;
}) {
  const {
    toolbarRef,
    setSearch,
    hasFilters,
    selectedFiltersLength,
    toggleFilters,
  } = toolbarProps;
  const filtersClasses = useFilterStyles();
  const onSearchChanged = useCallback(
    (searchText: string) => {
      toolbarProps.onSearchChanged(searchText);
      setSearch(searchText);
    },
    [toolbarProps, setSearch],
  );

  if (hasFilters) {
    return (
      <Box className={filtersClasses.root}>
        <Box className={filtersClasses.root}>
          <IconButton onClick={toggleFilters} aria-label="filter list">
            <FilterAltOutlinedIcon />
          </IconButton>
          <Typography className={filtersClasses.title}>
            Filte ({selectedFiltersLength})
          </Typography>
        </Box>
        <StyledMTableToolbar
          {...toolbarProps}
          ref={toolbarRef}
          onSearchChanged={onSearchChanged}
        />
      </Box>
    );
  }

  return (
    <StyledMTableToolbar
      {...toolbarProps}
      ref={toolbarRef}
      onSearchChanged={onSearchChanged}
    />
  );
}

/**
 * @public
 */
export function TableMod<T extends object = {}>(props: TablePropsMod<T>) {
  const {
    data,
    columns,
    options,
    title,
    subtitle,
    filters,
    initialState,
    emptyContent,
    onStateChange,
    components,
    isLoading: isLoading,
    ...restProps
  } = props;
  const tableClasses = useTableStyles();

  const theme = useTheme<BackstageTheme>();

  const calculatedInitialState = { ...defaultInitialState, ...initialState };

  const [filtersOpen, setFiltersOpen] = useState(
    calculatedInitialState.filtersOpen,
  );
  const toggleFilters = useCallback(
    () => setFiltersOpen(v => !v),
    [setFiltersOpen],
  );
  const [selectedFiltersLength, setSelectedFiltersLength] = useState(0);
  const [tableData, setTableData] = useState(data as any[]);
  const [selectedFilters, setSelectedFilters] = useState(
    calculatedInitialState.filters,
  );

  const MTColumns = convertColumns(columns, theme);

  const [search, setSearch] = useState(calculatedInitialState.search);

  useEffect(() => {
    if (onStateChange) {
      const state = removeDefaultValues(
        {
          search,
          filtersOpen,
          filters: selectedFilters,
        },
        defaultInitialState,
      );

      onStateChange(state);
    }
  }, [search, filtersOpen, selectedFilters, onStateChange]);

  const defaultOptions: Options<T> = {
    headerStyle: {
      textTransform: 'uppercase',
    },
  };

  const getFieldByTitle = useCallback(
    (titleValue: string | keyof T) =>
      columns.find(el => el.title === titleValue)?.field,
    [columns],
  );

  useEffect(() => {
    if (typeof data === 'function') {
      return;
    }
    if (!selectedFilters) {
      setTableData(data as any[]);
      return;
    }

    const selectedFiltersArray = Object.values(selectedFilters);
    if (data && selectedFiltersArray.flat().length) {
      const newData = (data as any[]).filter(
        el =>
          !!Object.entries(selectedFilters)
            .filter(([, value]) => !!(value as { length?: number }).length)
            .every(([key, filterValue]) => {
              const fieldValue = extractValueByField(
                el,
                getFieldByTitle(key) as string,
              );

              if (Array.isArray(fieldValue) && Array.isArray(filterValue)) {
                return fieldValue.some(v => filterValue.includes(v));
              } else if (Array.isArray(fieldValue)) {
                return fieldValue.includes(filterValue);
              } else if (Array.isArray(filterValue)) {
                return filterValue.includes(fieldValue);
              }

              return fieldValue === filterValue;
            }),
      );
      setTableData(newData);
    } else {
      setTableData(data as any[]);
    }
    setSelectedFiltersLength(selectedFiltersArray.flat().length);
  }, [data, selectedFilters, getFieldByTitle]);

  const constructFilters = (
    filterConfig: TableFilterMod[],
    dataValue: any[] | undefined,
  ): FilterMod[] => {
    const extractDistinctValues = (field: string | keyof T): Set<any> => {
      const distinctValues = new Set<any>();
      const addValue = (value: any) => {
        if (value !== undefined && value !== null) {
          distinctValues.add(value);
        }
      };

      if (dataValue) {
        dataValue.forEach(el => {
          const value = extractValueByField(
            el,
            getFieldByTitle(field) as string,
          );

          if (Array.isArray(value)) {
            (value as []).forEach(addValue);
          } else {
            addValue(value);
          }
        });
      }

      return distinctValues;
    };

    const constructSelect = (
      filter: TableFilterMod,
    ): WithoutMod<SelectPropsMod, 'onChange'> => {
      return {
        placeholder: 'All results',
        label: filter.column,
        multiple: filter.type === 'multiple-select',
        items: [...extractDistinctValues(filter.column)].sort().map(value => ({
          label: value,
          value,
        })),
      };
    };

    return filterConfig.map(filter => ({
      type: filter.type,
      element: constructSelect(filter),
    }));
  };

  const hasFilters = !!filters?.length;
  const Toolbar = useCallback(
    toolbarProps => {
      return (
        <TableToolbar
          setSearch={setSearch}
          hasFilters={hasFilters}
          selectedFiltersLength={selectedFiltersLength}
          toggleFilters={toggleFilters}
          {...toolbarProps}
        />
      );
    },
    [toggleFilters, hasFilters, selectedFiltersLength, setSearch],
  );

  const hasNoRows = typeof data !== 'function' && data.length === 0;
  const columnCount = columns.length;
  const Body = useCallback(
    bodyProps => {
      if (isLoading) {
        return (
          <tbody data-testid="loading-indicator">
            <tr>
              <td colSpan={columnCount}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    minHeight: '15rem',
                  }}
                >
                  <CircularProgress size="5rem" />
                </Box>
              </td>
            </tr>
          </tbody>
        );
      }

      if (emptyContent && hasNoRows) {
        return (
          <tbody>
            <tr>
              <td colSpan={columnCount}>{emptyContent}</td>
            </tr>
          </tbody>
        );
      }

      return <MTableBody {...bodyProps} />;
    },
    [hasNoRows, emptyContent, columnCount, isLoading],
  );

  return (
    <Box className={tableClasses.root}>
      {filtersOpen && data && typeof data !== 'function' && filters?.length && (
        <FiltersMod
          filters={constructFilters(filters, data as any[])}
          selectedFilters={selectedFilters}
          onChangeFilters={setSelectedFilters}
        />
      )}
      <Card className={tableClasses.cardContainer}>
        <MTable<T>
          components={{
            Header: StyledMTableHeader,
            Toolbar,
            Body,
            ...components,
          }}
          options={{ ...defaultOptions, ...options }}
          columns={MTColumns}
          icons={tableIcons}
          title={
            <>
              <Typography variant="h5" component="h2">
                {title}
              </Typography>
              {subtitle && (
                <Typography color="textSecondary" variant="body1">
                  {subtitle}
                </Typography>
              )}
            </>
          }
          data={typeof data === 'function' ? data : tableData}
          style={{ width: '100%' }}
          localization={{
            toolbar: { searchPlaceholder: 'Filter', searchTooltip: 'Filter' },
          }}
          {...restProps}
        />
      </Card>
    </Box>
  );
}

TableMod.icons = Object.freeze(tableIcons);
