"use client";
import { Box, Button, Divider, IconButton, List, Toolbar } from "@mui/material";
import { useState } from "react";
import { clearGrid, checkFilled, handleStart, fillGrid, UpdateGrid, bottomColor, chooseFalse, chooseTrue, addAnalysisTop, isOneBlock} from "./Grid";
import { countBottomLeft, countTopRight } from "@/app/script";
import { mainListItems } from "./Listitems";
import React from "react";

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';





const colors = ["bla", "blu", "yel", "red", "gre", "pur"];
export default function Buttons() {
    const [buttonName, setButtonName] = useState<string>("Reset");
    const [choose, setChoose] = useState<boolean>(false);



    const handleResetStart = () => {
        const elements = document.getElementsByClassName('choice');
        Array.from(elements).forEach(element => {
            element.classList.remove("outline-dashed");
        });
        if (!choose) {
            //alert("d")
            clearGrid();
            setButtonName("Start");
            setChoose(true);
            chooseTrue();
            let element = document.getElementById("p1");
            if(element)
            for(const a in colors){
                element.classList.remove(colors[a]);
            }
            element = document.getElementById("p2");
            if(element)
            for(const a in colors){
                element.classList.remove(colors[a]);
            }
            for(const a in colors){
                let element = document.getElementById(colors[a]+"-choice");
                element?.classList.remove("scale-75");
            }
            
        } else {
            if (checkFilled() && !isOneBlock()) {
                setButtonName("Reset");
                setChoose(false);
                chooseFalse();
                handleStart();
            }
        }
    };

    const handleRandomize = ()=>{
        let grid:string[][] = fillGrid();
        for(let i = 0;i<7;i++){
            for(let j = 0;j<8;j++){
                const element = document.getElementById(i.toString()+'-'+j.toString());
                element?.classList.remove("red", "gre", "yel", "blu", "pur", "bla","outline-dashed");
                element?.classList.add(grid[i][j]);
            }
        }
        setButtonName("Reset");
        setChoose(false);
        chooseFalse();
        handleStart();
        const elements = document.getElementsByClassName('choice');
        Array.from(elements).forEach(element => {
            element.classList.remove("outline-dashed");
        });
        let element = document.getElementById("p1");
        if(element){
            for(const a in colors){
                element.classList.remove(colors[a]);
            }
            element.classList.add(grid[6][0]);
        }
        element = document.getElementById("p2");
        if(element){
            for(const a in colors){
                element.classList.remove(colors[a]);
            }
            element.classList.add(grid[0][7]);
        }
        
        addAnalysisTop();
    };
    



    return (

        <>
        

          <div className="flex justify-center items-center pt-4">
              <div id="p1" className={`border border-black mr-16 px-3 py-2 rounded-2xl text-white font-bold`}>1</div>
              <Button className='mr-1' size="medium" variant="contained" onClick={handleRandomize} >Randomize</Button>
              <Button onClick={handleResetStart} className='ml-1 px-8' size="medium" variant="contained">{buttonName}</Button>
              <div id="p2" className="border border-black ml-16 px-2.5 py-2 rounded-xl text-white font-bold">1</div>
          </div>
          
        
        
        </>

    );
}