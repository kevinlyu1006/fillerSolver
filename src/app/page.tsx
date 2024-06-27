"use client"

import Buttons from "@/components/Buttons";
import Counter from "@/components/Slider";
import ChessBoard from "@/components/Grid";
import { Box, Button, Divider, IconButton, List, Toolbar, styled } from "@mui/material";
import CustomSlider from "@/components/Slider";
import MuiDrawer from '@mui/material/Drawer';
import { mainListItems } from "@/components/Listitems";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import React from "react";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Popup from "@/components/Popup";

const drawerWidth: number = 400;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);




export default function Home() {

  const [open, setOpen] = React.useState(false);
      const toggleDrawer = () => {
          setOpen(!open);
      };
  return (
    <>
{/*       
      <div className="flex justify-center w-full">
      <Box sx={{ display: 'flex', width: open ? '240px' : '0px', height: '50%' }}>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
            height:"10px"
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <QuestionMarkIcon />
          </IconButton>
        </Toolbar>
        <Divider />

        
        <div
          style={{
            height: '50%',
            padding:"0px"
          }}
        >
          {open && (
            <Box sx={{ padding: '16px', wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}>
              <h3 className="font-bold">
                Rules:
              </h3>
              <p>1. Each player is assigned a corner tile at the start of the game.</p>
              <p>2. Players take turns filling their tiles with one of the 6 colors in an attempt to capture adjacent tiles of the same color.</p>
              <p>3. You are not allowed to change the color of your tiles into the color of your opponents tiles.</p>
              <p>4. The game ends when there are no more tiles to occupy.</p>
              <h3 className="font-bold">
                Goal:
              </h3>
              <p>Player who manages to capture the most tiles wins!</p>
              <h3 className="font-bold">
                Computer Analysis
              </h3>
              <p>1. The color with the dashed outline is the computer's suggested move.</p>
              <p>2. To adjust the depth of the analysis, use the slider.</p>
              <p>3. The higher the depth, the more acurate the suggestion but slower the analysis</p>
            </Box>
          )}
        </div>
      </Drawer>
    </Box>
    
      <div className="pl-96 ">
        
        <Buttons />
        <ChessBoard />
        
        <CustomSlider/>
      </div>
    </div> */}
    <Popup />
    <div className="flex justify-center w-full">
    <Buttons />

    </div>
        <ChessBoard />
        
        <CustomSlider/>

    </>
  );
}
