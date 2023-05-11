import React, { useCallback, useEffect, useMemo, useState } from "react";

import { TablePagination } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import api from "services/api";

import { getDescendantProp } from "utils/getDescendantProp";

import EnhancedTableHead from "./EnhancedTableHead";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import getComparator from "./hooks/getComparator";
import stableSort from "./hooks/stableSort";
import DataTableProps from "./interfaces/DataTableProps";
import Order from "./interfaces/Order";
import { ButtonGroup, Container, SubContainerPaper } from "./style";

import './style.css';


const DataTable: React.FC<DataTableProps> = ({
	title: tableTitle = 'Nutrition',
  dense: denseDefault = false,
	metadata,
  denseButton = true,
  toolbar = true,
  checkbox = false,
  selectable = false,
  pagination = true,
	data: preLoadedData,
	haveActions = true,
	actions,
	url
}) => {
	const primaryKey = useMemo(() => 
		metadata.find((item) => item.primaryKey)?.prop ?? 'id'
	, [metadata]); 
	
	const [order, setOrder] = useState<Order>("asc");
	const [orderBy, setOrderBy] = useState<string>(primaryKey);
	const [selected, setSelected] = useState<readonly string[]>([]);
	const [page, setPage] = useState(0);
	const [dense, setDense] = useState(denseDefault);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [rows, setRows] = useState<any[]>([]);
	const [totalRows, setTotalRows] = useState<number|null>(null);
	
	const handleRequestSort = useCallback((
		event: React.MouseEvent<unknown>,
		property: any
	) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	}, [order, orderBy]);

	const handleSelectAllClick = useCallback((
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (event.target.checked) {
			const newSelected = rows.map((n) => n[primaryKey]);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	}, [rows, primaryKey]);

	const handleClick = useCallback((event: React.MouseEvent<unknown>, name: string) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected: readonly string[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	}, [selected]);

	const handleChangePage = useCallback((event: unknown, newPage: number) => {
		setPage(newPage);
	}, []);

	const handleChangeRowsPerPage = useCallback((
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	}, []);

	const handleChangeDense = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		setDense(event.target.checked);
	}, []);

	const isSelected = useCallback((name: string) => (
		selected.indexOf(name) !== -1
	), [selected]);

	
	useEffect(() => {
		if (preLoadedData) {
			return setRows(preLoadedData);
		}
	}, [preLoadedData]);

	useEffect(() => {
		if (preLoadedData) {
			return;
		}

		api.get(`${url}?take=${rowsPerPage}&page=${page+1}`).then(
			({ data }) => {
				setRows(data.data);
				setTotalRows(data.total);
			}			
		);
	}, [page, rowsPerPage]);

	function calcEmptyRows() {
		if (!preLoadedData && totalRows) {
			if (totalRows - (page) * rowsPerPage < rowsPerPage) {
				return rowsPerPage - (totalRows % rowsPerPage); 
			}
			return 0;
		}

		if (page > 0) {
			return Math.max(0, (1 + page) * rowsPerPage - rows.length) ;
		} 

		return 0;
	}
	
	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = calcEmptyRows();
		
	const sliceInitial = useCallback(() => 
		preLoadedData ? page * rowsPerPage : 0
	, [page, rowsPerPage]);
	
	const sliceFinal = useCallback(() => 
		preLoadedData ? page * rowsPerPage + rowsPerPage : undefined
	, [page, rowsPerPage]); 


	return (
		<Container>
			<SubContainerPaper sx={{ width: "100%", mb: 2 }}>
        {
          toolbar && (
            <EnhancedTableToolbar
              numSelected={selected.length}
              title={tableTitle}
            />
          )
        }
				
				<TableContainer className="decent-horizontal-scrollbar-datatable">
					<Table 
						aria-labelledby='tableTitle'
						size={dense ? "small" : "medium"}>
						<EnhancedTableHead
              checkbox={checkbox}
							metadata={metadata}
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
							haveActions={!!haveActions}
							actions={!!actions}
						/>
						<TableBody>
							{stableSort(rows, getComparator(order, orderBy))
								.slice(
									sliceInitial(),
									sliceFinal()
								)
								.map((row, index) => {
									const isItemSelected = isSelected(row.id as string);
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<TableRow
											hover
											onClick={(event) => 
												selectable ? handleClick(event, row.id as string): false
											}
											role='checkbox'
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={row[primaryKey]}
											selected={isItemSelected}
                    >
                      {
                        checkbox && (
                          <TableCell padding='checkbox'>
                            <Checkbox
                              color='primary'
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby":
                                  labelId,
                              }}
                            />
                          </TableCell>
                        )
                      }
											{metadata.map((item) => (
												<TableCell 
													key={item.prop} 
													component={item.primaryKey ? 'th' : 'td'}
													align={item.numeric ? 'right' : 'left'}>
													{
														item.mask 
															? item.mask(getDescendantProp(row, item.prop))
														 	: getDescendantProp(row, item.prop)
													}
												</TableCell>
											))}
											{
												actions && haveActions && (
													<TableCell align='right'>
														{
															<ButtonGroup>
																{actions(row)}
															</ButtonGroup>
														}
													</TableCell>
												)
											}
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: (dense ? 33 : 53) * emptyRows,
									}}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>

				{pagination && (
					<TablePagination
						rowsPerPageOptions={[10,20,30]}
						labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
						labelRowsPerPage='Mostrar'
						count={totalRows ?? rows.length}
						className="decent-horizontal-scrollbar-datatable"
						component='div'
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				)}

			</SubContainerPaper>
      {
        denseButton && (
          <FormControlLabel
            label='Concentrado'
            control={
              <Switch checked={dense} onChange={handleChangeDense} />
            }
        	/>
      )}
		</Container>
	);
};

export default DataTable;
