import { memo } from 'react';
import { Paper, Table, TableBody,  TableContainer } from '@mui/material';
import SkeletonRow from './SkeletonRow';


function SkeletonBox() {
   return (
      <div className="skeleton">
         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
               <TableBody>
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
               </TableBody>
            </Table>
         </TableContainer>
      </div>
   )
}

export default memo(SkeletonBox);