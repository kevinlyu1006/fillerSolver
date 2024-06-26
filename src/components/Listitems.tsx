"use client"
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
    
      <ListItemText primary="" className='text-black' />
      
    </ListItemButton>
  </React.Fragment>
);

// export const secondaryListItems = (
// //   <React.Fragment >
// //     <ListSubheader component="div" inset  style={{background: "radial-gradient(circle, rgba(4,36,25,1) 0%, rgba(0,0,0,1) 100%)",
// //         backgroundSize: "cover",
// //         backgroundPosition: "center",
// //         backgroundAttachment: "fixed"}} className='text-[#444C4A]'>
// //       Recruiters
// //     </ListSubheader>

// //     {people.map(({id, name, data, cost, calls})=>(
// //       <ListItemButton href={'/'+id.toString()}>
// //       <ListItemIcon>
// //         <AccountCircleIcon sx={{color:"#2cc77f"}} />
// //       </ListItemIcon>
// //       <ListItemText primary={name} className='text-white' />
// //     </ListItemButton>
// //     ))}
    
   
//   </React.Fragment>
// );