import { memo } from "react";
import { useTheme } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import useMediaQuery from "@mui/material/useMediaQuery";
import Pagination from '@mui/material/Pagination';

function CustumPagination({ currentPage, setCurrentPage, count, baseURL }) {
   const theme = useTheme()
   const navigate = useNavigate()
   const isXs = useMediaQuery(theme.breakpoints.down("sm"))
   const rowsPerPage = isXs ? 0 : 1

   function changeCurrentPage(e, newPage) {
      if (window.scrollY > 100) {
         window.scroll(0, 100)
      }
      if (baseURL) {
         setCurrentPage(newPage)
         navigate(`/${baseURL}/pages/${newPage}`)
      }
   }

   return (
      <Stack spacing={2} justifyContent="center" alignItems="center">
         <Pagination
            count={count}
            color="primary"
            page={currentPage || 1}
            onChange={changeCurrentPage}
            siblingCount={rowsPerPage}
         />
      </Stack>
   )
}

export default memo(CustumPagination);