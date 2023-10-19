import { memo } from 'react';
import { styled } from '@mui/material/styles';
import { TableCell, tableCellClasses, TableRow, Skeleton } from '@mui/material';

function SkeletonRow() {
   const StyledTableCell = styled(TableCell)(() => ({
      [`&.${tableCellClasses.body}`]: {
         maxHeight: 40,
         fontSize: 10,
         fontWeight: 600
      },
   }));

   const StyledTableRow = styled(TableRow)(({ theme }) => ({
      '&:nth-of-type(odd)': {
         backgroundColor: theme.palette.action.hover,
      },
      // hide last border
      '&:last-child td, &:last-child th': {
         border: 0,
      },
   }));

   return (
      <StyledTableRow
         style={{ height: '30px' }}
         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
         <StyledTableCell component="th" scope="row" style={{ cursor: 'progress' }}>
            <Skeleton sx={{ bgcolor: 'silver' }} height={20} />
         </StyledTableCell>
         <StyledTableCell align="right">
            <Skeleton sx={{ bgcolor: 'silver' }} height={20} />
         </StyledTableCell>
         <StyledTableCell align="right">
            <Skeleton sx={{ bgcolor: 'silver' }} height={20} />
         </StyledTableCell>
         <StyledTableCell align="right">
            <Skeleton sx={{ bgcolor: 'silver' }} height={20} />
         </StyledTableCell>
      </StyledTableRow>
   )
}

export default memo(SkeletonRow);