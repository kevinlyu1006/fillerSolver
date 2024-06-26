const colors = ["bla", "blu", "yel", "red", "gre", "pur"];

interface IQueue<T> {
    enqueue(item: T): void;
    dequeue(): T | undefined;
    size(): number;
  }


class Queue<T> implements IQueue<T> {
    private storage: T[] = [];
  
    constructor(private capacity: number = Infinity) {}
  
    enqueue(item: T): void {
      if (this.size() === this.capacity) {
        throw Error("Queue has reached max capacity, you cannot add more items");
      }
      this.storage.push(item);
    }
    dequeue(): T | undefined {
      return this.storage.shift();
    }
    size(): number {
      return this.storage.length;
    }
  }

  const dir:number[][] = [[1,0],[0,1],[-1,0],[0,-1]];


export function bfs(grid: string[][], start:string){
    const queue = new Queue<string>();
    queue.enqueue(start);
    let row:number = parseInt(start[0]);
    let col:number = parseInt(start[1]);
    let colour = grid[row][col];
    var visited:boolean[][] = [];
    for(let i = 0;i<7;i++){
        let temp: boolean[] = [];
        for(let j = 0;j<8;j++){
            temp.push(false);
        }
        visited.push(temp);
    } 
    visited[row][col] = true;
    while(queue.size()!=0){
        let top = queue.dequeue();
        if(top){
            row = parseInt(top[0]);
            col = parseInt(top[1]);

            for(let i = 0;i<dir.length;i++){
                let newR:number = row+dir[i][0];
                let newC:number = col+dir[i][1];
                if(newR>=0 && newC>=0 && newR<7 && newC<8 && visited[newR][newC] === false && grid[newR][newC] === colour){
                    queue.enqueue(newR.toString()+newC.toString());
                    visited[newR][newC] = true;
                }
            }
        }
    }
    return visited;
}


export function countBottomLeft(grid:string[][]){
    let visited:boolean[][] = bfs(grid,"60");
    let res = 0;
    for(let i = 0;i<7;i++){
        for(let j = 0;j<8;j++){
            res+=(visited[i][j] === true?1:0);
        }
    }
    return res;
}


export function countTopRight(grid:string[][]){
    let visited:boolean[][] = bfs(grid,"07");

    let res = 0;
    for(let i = 0;i<7;i++){
        for(let j = 0;j<8;j++){
            res+=(visited[i][j] === true?1:0);
        }
    }
    return res;
}


function deepCopyGrid(grid: string[][]): string[][] {
    return grid.map(row => [...row]);
}



function setColo(gri:string[][], toColor:string, start:string){
    let g:string[][] = deepCopyGrid(gri);    
    let visited:boolean[][] = bfs(g,start);
    for(let i = 0;i<7;i++){
        for(let j = 0;j<8;j++){
            if(visited[i][j] === true){
                g[i][j] = toColor;
            }
        }
    }
    return g;
}


export function fn1(grid: string[][], depth:number, step: number, player:number):any{
    if(depth === step){
        return countBottomLeft(grid);
    }
    if(step === 0){


        let col = "";
        let backUp = "";
        let ans = 0;
        let counter = countBottomLeft(grid);
        for(const a in colors){
            if(colors[a]!== grid[6][0] && colors[a]!== grid[0][7]){
                let gr = setColo(grid,colors[a],"60");
                let opt = fn1(gr,depth,step+1,(player+1)%2);
                backUp = colors[a];
                if(opt>ans && counter!==countBottomLeft(gr)){
                    ans = opt;
                    col = colors[a];
                }
            }
        }
        
        return col===""?backUp:col;
        // let col = "";
        // let ans = 0;
        let opt = fn1(setColo(grid,"red","60"),depth,step+1,(player+1)%2);
        if(opt>ans){
            ans = opt;
            col = "red-choice";
        }
        opt = fn1(setColo(grid,"gre","60"),depth,step+1,(player+1)%2);
        if(opt>ans){
            ans = opt;
            col = "gre-choice";
        }
        opt = fn1(setColo(grid,"yel","60"),depth,step+1,(player+1)%2);
        if(opt>ans){
            ans = opt;
            col = "yel-choice";
        }
        opt = fn1(setColo(grid,"blu","60"),depth,step+1,(player+1)%2);
        if(opt>ans){
            ans = opt;
            col = "blu-choice";
        }
        opt = fn1(setColo(grid,"pur","60"),depth,step+1,(player+1)%2);
        if(opt>ans){
            ans = opt;
            col = "pur-choice";
        }
        opt = fn1(setColo(grid,"bla","60"),depth,step+1,(player+1)%2);
        if(opt>ans){
            ans = opt;
            col = "bla-choice";
        }
        return col;
    }

    if(player === 0){
        let ans = 0;
        for(const a in colors){
            if(colors[a]!== grid[6][0] && colors[a]!== grid[0][7]){
                let gr = setColo(grid,colors[a],"60");
                ans = Math.max(ans,fn1(gr,depth,step+1,(player+1)%2));
            }
        }
        return ans;
        return Math.max(fn1(setColo(grid,"red","60"),depth,step+1,(player+1)%2),
        fn1(setColo(grid,"gre","60"),depth,step+1,(player+1)%2),
        fn1(setColo(grid,"bla","60"),depth,step+1,(player+1)%2),
        fn1(setColo(grid,"yel","60"),depth,step+1,(player+1)%2),
        fn1(setColo(grid,"pur","60"),depth,step+1,(player+1)%2),
        fn1(setColo(grid,"blu","60"),depth,step+1,(player+1)%2)
    )
    }else{
        let ans = 99999;
        for(const a in colors){
            if(colors[a]!== grid[6][0] && colors[a]!== grid[0][7]){
                let gr = setColo(grid,colors[a],"07");
                ans = Math.min(ans,fn1(gr,depth,step+1,(player+1)%2));
            }
        }
        return ans;
        return Math.min(fn1(setColo(grid,"red","07"),depth,step+1,(player+1)%2),
        fn1(setColo(grid,"gre","07"),depth,step+1,(player+1)%2),
        fn1(setColo(grid,"bla","07"),depth,step+1,(player+1)%2),
        fn1(setColo(grid,"yel","07"),depth,step+1,(player+1)%2),
        fn1(setColo(grid,"pur","07"),depth,step+1,(player+1)%2),
        fn1(setColo(grid,"blu","07"),depth,step+1,(player+1)%2))
    }
}




export function fn2(grid: string[][], depth:number, step: number, player:number):any{
    if(depth === step){
        return countTopRight(grid);
    }
    if(step === 0){
        let col = "";
        let backUp = "";
        let ans = 0;
        let count = countTopRight(grid);
        for(const a in colors){
            if(colors[a]!== grid[6][0] && colors[a]!== grid[0][7]){
                let gr = setColo(grid,colors[a],"07");
                let opt = fn2(gr,depth,step+1,(player+1)%2);
                backUp = colors[a];
                if(opt>ans && count!== countTopRight(gr)){
                    ans = opt;
                    col = colors[a];
                }
            }
        }
        return col===""?backUp:col;

        //let col = "";
        //let ans = 0;



        
        let opt = fn2(setColo(grid,"red","07"),depth,step+1,(player+1)%2);
        if(opt>ans){
            ans = opt;
            col = "red-choice";
        }
        opt = fn2(setColo(grid,"gre","07"),depth,step+1,(player+1)%2);
        if(opt>ans){
            ans = opt;
            col = "gre-choice";
        }

        opt = fn2(setColo(grid,"yel","07"),depth,step+1,(player+1)%2);
        if(opt>ans){
            ans = opt;
            col = "yel-choice";
        }

        opt = fn2(setColo(grid,"blu","07"),depth,step+1,(player+1)%2);
        if(opt>ans){
            ans = opt;
            col = "blu-choice";
        }

        opt = fn2(setColo(grid,"pur","07"),depth,step+1,(player+1)%2);
        if(opt>ans){
            ans = opt;
            col = "pur-choice";
        }

        opt = fn2(setColo(grid,"bla","07"),depth,step+1,(player+1)%2);
        if(opt>ans){
            ans = opt;
            col = "bla-choice";
        }

        return col;
    }

    if(player === 0){
        let ans = 0;
        for(const a in colors){
            if(colors[a]!== grid[6][0] && colors[a]!== grid[0][7]){
                let gr = setColo(grid,colors[a],"07");
                ans = Math.max(ans,fn2(gr,depth,step+1,(player+1)%2));
            }
        }
        return ans;
        return Math.max(fn2(setColo(grid,"red","07"),depth,step+1,(player+1)%2),
        fn2(setColo(grid,"gre","07"),depth,step+1,(player+1)%2),
        fn2(setColo(grid,"bla","07"),depth,step+1,(player+1)%2),
        fn2(setColo(grid,"yel","07"),depth,step+1,(player+1)%2),
        fn2(setColo(grid,"pur","07"),depth,step+1,(player+1)%2),
        fn2(setColo(grid,"blu","07"),depth,step+1,(player+1)%2))
    
    }else{
        let ans = 99999;
        for(const a in colors){
            if(colors[a]!== grid[6][0] && colors[a]!== grid[0][7]){
                let gr = setColo(grid,colors[a],"60");
                ans = Math.min(ans,fn2(gr,depth,step+1,(player+1)%2));
            }
        }
        return ans;
        return Math.min(fn2(setColo(grid,"red","60"),depth,step+1,(player+1)%2),
        fn2(setColo(grid,"gre","60"),depth,step+1,(player+1)%2),
        fn2(setColo(grid,"bla","60"),depth,step+1,(player+1)%2),
        fn2(setColo(grid,"yel","60"),depth,step+1,(player+1)%2),
        fn2(setColo(grid,"pur","60"),depth,step+1,(player+1)%2),
        fn2(setColo(grid,"blu","60"),depth,step+1,(player+1)%2))
    }
}