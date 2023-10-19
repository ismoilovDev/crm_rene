import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { memo } from 'react';

function LoaderBackdrop({ disable }) {
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={disable}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default memo(LoaderBackdrop);