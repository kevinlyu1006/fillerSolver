
"use client"
import React, {useState, useRef, useEffect} from 'react';
import './ChessBoard.css';
import { Button } from '@mui/material';
import { bfs, countBottomLeft, countTopRight, fn1, fn2 } from '@/app/script';
import { AltRoute } from '@mui/icons-material';
var time = 0;

const colors = ["bla", "blu", "yel", "red", "gre", "pur"];
var grid: string[][] = [];
var choose = false; // if choose if false then it should be playing
var colour = "red";
let turn = 1;
var depth = 6;



function sameGrid(){
    for(let i = 0;i<7;i++){
        for(let j = 0;j<8;j++){
            const element = document.getElementById(i.toString()+'-'+j.toString());
            if(element){
                const classes = element.classList;
                grid[i][j] = "";
                for(const a in colors){
                    if(classes.contains(colors[a])){
                        grid[i][j] = colors[a];
                    }
                }
            }
        }
    }
}

export function UpdateGrid(g:string[][]){
    for(let i = 0;i<7;i++){
        for(let j =0;j<8;j++){
            grid[i][j] = g[i][j];
        }
    }
    turn = 1;

}

export function setDepth(d:number){
    depth = d;
}

export function fillGrid() {

    let gri:string[][] = [];
    for (let i = 0; i < 7; i++) {
        let temp = [];
        for (let j = 0; j < 8; j++) {
            let top = i !== 0 ? gri[i - 1][j] : "";
            let left = j !== 0 ? temp[j - 1] : "";
            let ava = [];
            for (let k = 0; k < colors.length; k++) {
                if (colors[k] !== top && colors[k] !== left) {
                    ava.push(colors[k]);
                }
            }
            temp.push(ava[Math.floor(Math.random() * ava.length)]);
        }
        gri.push(temp);
    }
    return gri;
}

 export function checkFilled(){
    for(let i = 0;i<7;i++){
        for(let j = 0;j<8;j++){
            if(grid[i][j] === ""){
                return false;
            }
        }
    }
    return true;
}

function clickRed(){
    sameGrid();
    if(choose){
        colour = "red";
    }else if(grid[6][0] !== "red" && grid[0][7]!=="red"){
        turn = (turn+1)%2;
        setColor("red")
    }
}

function clickGre(){
    sameGrid();

    if(choose){
        colour = "gre";
    }else if(grid[6][0] !== "gre" && grid[0][7]!=="gre"){
        turn = (turn+1)%2;
        setColor("gre")
    }
}

function clickBla(){
    sameGrid();

    if(choose){
        colour = "bla";
    }else if(grid[6][0] !== "bla" && grid[0][7]!=="bla"){
        turn = (turn+1)%2;
        setColor("bla")
    }
}

function clickYel(){
    sameGrid();

    if(choose){
        colour  = "yel";
    }else if(grid[6][0] !== "yel" && grid[0][7]!=="yel"){
        turn = (turn+1)%2;
        setColor("yel")
    }
}

function clickPur(){
    sameGrid();

    if(choose){
        colour  = "pur";
    }else if(grid[6][0] !== "pur" && grid[0][7]!=="pur"){
        turn = (turn+1)%2;
        setColor("pur")
    }
}

function shrink(){
    for(const a in colors){
        let element = document.getElementById(colors[a]+"-choice");
        element?.classList.remove("scale-75");
    }
    let element = document.getElementById(grid[6][0]+"-choice");
    element?.classList.add("scale-75");
    element = document.getElementById(grid[0][7]+"-choice");
    element?.classList.add("scale-75");
}


function clickBlu(){
    sameGrid();

    if(choose){
        colour  = "blu";
    }else if(grid[6][0] !== "blu" && grid[0][7]!=="blu"){
        turn = (turn+1)%2;
        setColor("blu")
    }
}




export function handleStart(){
    
    sameGrid();

    const elements = document.getElementsByClassName('square');
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
    element = document.getElementById(grid[6][0]+"-choice");
    element = document.getElementById("p1");
    if(element)
    element.innerText = (countBottomLeft(grid).toString());
    element = document.getElementById("p2");
    if(element)
    element.innerText = (countTopRight(grid).toString());
    addAnalysisTop();
    shrink();
    turn = 1;
   
}


export function addAnalysisTop(){
    let element = document.getElementById(fn2(grid,depth,0,1)+"-choice");
    element?.classList.add("outline-dashed");
}


export function chooseTrue(){
    let element = document.getElementById("p1");
    if(element)
    element.innerText = ("0");
    element = document.getElementById("p2");
    if(element)
    element.innerText = "0";
    choose = true;
}


export function chooseFalse(){
    choose = false;
}


function setColor(toColor:string){
    const elements = document.getElementsByClassName('choice');
    Array.from(elements).forEach(element => {
        element.classList.remove("outline-dashed");
    });
    let visited:boolean[][] = bfs(grid,turn===1?"60":"07");
    for(let i = 0;i<7;i++){
        for(let j = 0;j<8;j++){
            if(visited[i][j] === true){
                grid[i][j] = toColor;
                const element = document.getElementById(i.toString()+'-'+j.toString());
                element?.classList.remove('blu', 'gre', 'yel', 'red', 'bla', 'pur');
                element?.classList.add(toColor);
            }
        }
    }
    if(turn ===1){
        const element = document.getElementById(fn2(grid,depth,0,1)+"-choice");
        element?.classList.add("outline-dashed");

    }else{
        const element = document.getElementById(fn1(grid,depth,0,0)+"-choice");
        element?.classList.add("outline-dashed");
    }
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
    shrink();
    element = document.getElementById("p1");
    if(element)
    element.innerText = (countBottomLeft(grid).toString());
    element = document.getElementById("p2");
    if(element)
    element.innerText = (countTopRight(grid).toString());
}




export function clearGrid(){
    const elements = document.getElementsByClassName('square');

    Array.from(elements).forEach(element => {
        element.classList.remove('blu', 'gre', 'yel', 'red', 'bla', 'pur');
        element.classList.add("outline-dashed");
    });
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 8; j++) {
            grid[i][j] = "";
        }
    };
}

var time = 0;
var squares:any[] = [];

const handleClickSquare = (row: number, col: number) => {

    const squareId = `${row}-${col}`;
    if(choose === true){
        const element = document.getElementById(squareId);
        if(element){
            element.classList.remove('blu', 'gre', 'yel', 'red', 'bla', 'pur');
            element.classList.add(colour);
            grid[row][col] = colour;
        }
        
    }
};


export function isOneBlock(){
    let v1 = bfs(grid,"60");
    let v2 = bfs(grid,"07");
    for(let i = 0;i<7;i++){
        for(let j = 0;j<8;j++){
            if(v1[i][j]!=v2[i][j]){
                return false;
            }
        }
    }
    
    return true;
}

const renderSquares = () => {
    const rows = 7;
    const cols = 8;
    //squares = [];
    if(time ===0){
        grid = fillGrid();        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                squares.push(
                    <div
                        key={`${row}-${col}`}
                        id = {`${row}-${col}`}
                        onClick={() => handleClickSquare(row, col)}
                        className={`square ${grid[row][col]}`}
                    ></div>
                );
            }
        }
        
    }
    time+=1;
    
    return squares;
};


export function bottomColor(){
    
    return grid[6][0];
}

export function topColor(){
    return grid[0][7];
}

const ChessBoard: React.FC = () => {
   
    useEffect(() => {
        sameGrid();
        shrink();
        // This code will run once after the component renders
        let element = document.getElementById("p1");
        if(element){
            element.classList.add(grid[6][0]);
        }
        element = document.getElementById("p2");
        if(element){
            element.classList.add(grid[0][7]);
        }

        if(turn ===1){
            const element = document.getElementById(fn2(grid,depth,0,1)+"-choice");
            element?.classList.add("outline-dashed");
    
        }else{
            const element = document.getElementById(fn1(grid,depth,0,0)+"-choice");
            element?.classList.add("outline-dashed");
        }

        // Add any additional logic you want to execute after rendering here
    }, []); // The empty array ensures this runs only once, similar to componentDidMount
    

    return (
        <>  
            
            <div className="flex justify-center items-center pt-2">
                <div className="chessboard">{renderSquares()}</div>
            </div>
            <div className="flex justify-center pt-4">
                <div onClick={clickRed} id='red-choice' className="transform choice red lg:h-10 lg:w-10 m-0.5 shadow-xl md:h-7 md:w-7 w-7 h-7" >
                    
                </div>
                <div onClick={clickGre} id = 'gre-choice' className="transform choice gre lg:h-10 lg:w-10 m-0.5 shadow-xl md:h-7 md:w-7 w-7 h-7">

                </div>
                <div onClick={clickYel}id = 'yel-choice' className="transform choice yel lg:h-10 lg:w-10 m-0.5 shadow-xl md:h-7 md:w-7 w-7 h-7">
                    
                </div>
                <div onClick={clickBlu} id = 'blu-choice' className="transform choice blu lg:h-10 lg:w-10 m-0.5 shadow-xl md:h-7 md:w-7 w-7 h-7">
                    
                </div>
                <div onClick={clickPur} id = 'pur-choice'className="transform choice pur lg:h-10 lg:w-10 m-0.5 shadow-xl md:h-7 md:w-7 w-7 h-7">
                    
                </div>
                <div onClick={clickBla} id = 'bla-choice'className="transform choice bla lg:h-10 lg:w-10 m-0.5 shadow-xl md:h-7 md:w-7 w-7 h-7">
                    
                </div>
            </div>
        </>
    );
};

export default ChessBoard;

