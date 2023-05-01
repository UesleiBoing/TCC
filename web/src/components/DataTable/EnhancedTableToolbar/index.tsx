import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Toolbar, Tooltip, Typography, alpha } from "@mui/material";
import IconButton from "@mui/material/IconButton";


interface EnhancedTableToolbarProps {
	numSelected: number;
	title: string;
}

/**
 * Top of the table with the title and the number of selected rows
 * @param props
 * @returns
 */
const EnhancedTableToolbar:React.FC<EnhancedTableToolbarProps> = ({ numSelected, title }) => {
	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				...(numSelected > 0 && {
					bgcolor: (theme) =>
						alpha(
							theme.palette.primary.main,
							theme.palette.action.activatedOpacity
						),
				}),
			}}>
			{numSelected > 0 ? (
				<Typography
					sx={{ flex: "1 1 100%" }}
					color='inherit'
					variant='subtitle1'
					component='div'>
					{numSelected} {numSelected > 1 ? 'selecionados' : 'selecionado'}
				</Typography>
			) : (
				<Typography
					sx={{ flex: "1 1 100%" }}
					variant='h6'
					id='tableTitle'
					component='div'>
					{title}
				</Typography>
			)}
			{numSelected > 0 ? (
				<Tooltip title='Remover'>
					<IconButton>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title='Listra de Filtros'>
					<IconButton>
						<FilterListIcon />
					</IconButton>
				</Tooltip>
			)}
		</Toolbar>
	);
}

export default EnhancedTableToolbar;