// src/Popup.tsx
import React, { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { pink , grey} from '@mui/material/colors';
const Popup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const showPopup = () => {
    setIsVisible(true);
  };

  const hidePopup = () => {
    setIsVisible(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={showPopup} 
        className=" text-white rounded hover:bg-gray-400"
      >
        <HelpOutlineIcon fontSize="large"  sx={{ color: grey[700] }} />
      </button>
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="flex bg-white pl-5 pb-5 rounded shadow-lg z-50">
            
           
            <div>
                <br></br>
                <h3 className="font-bold">
                Rules:
              </h3>
              <p>1. Each player is assigned a corner tile at the start of the game.</p>
              <p>2. Players take turns filling their tiles with one of the 6 colors in an attempt to capture adjacent tiles of the same color.</p>
              <p>3. You are not allowed to change the color of your tiles into the color of your opponents tiles.</p>
              <p>4. The game ends when there are no more tiles to occupy.</p>
              <br></br>

              <h3 className="font-bold">
                Goal:
              </h3>
              <p>Player who manages to capture the most tiles wins!</p>
              <br></br>

              <h3 className="font-bold">
                Computer Analysis:
              </h3>
              <p>1. The color with the dashed outline is the computer's suggested move.</p>
              <p>2. To adjust the depth of the analysis, use the slider.</p>
              <p>3. The higher the depth, the more acurate the suggestion but slower the analysis</p>
            </div>
            <button 
              onClick={hidePopup} 
              className="h-8 px-0 mr-1 py-0 text-white rounded hover:bg-gray-200"
            >
              <ClearIcon color = "disabled" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
