import React, { memo } from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

export const Settings = memo(({ isDrawerOpen, toggleDrawer }) => {

   const list = () => (
      <Box
         sx={{ width: 250 }}
         role="presentation"
         onClick={toggleDrawer(false)}
         onKeyDown={toggleDrawer(false)}
      >
         <List>
            <p>Hello</p>
         </List>
         <Divider />
         <List>
            <p>World</p>
         </List>
      </Box>
   );

   return (
      <>
         <Drawer
            anchor={'right'}
            open={isDrawerOpen}
            onClose={toggleDrawer(false)}
         >
            {list('right')}
         </Drawer>
      </>
   )
})
