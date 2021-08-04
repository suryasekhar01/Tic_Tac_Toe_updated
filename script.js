
window.onload =function() {

    var num; // num of canvas(1-9)
    var box; // id clicked by human
    var ctx; // contextt of canvas
    var turn=1; // no turns (max=9)
    var filled; //  filled or not
    var symbol; // if filled what is the symbol
    var winner; // store result after check winning condition
    var gameOver=false; // 
    var human='X'; //
    var ai='O'; //
    var result={}; // store result of all possible moves {canvas id,score}

    filled=new Array();
    symbol=new Array();

    // winning codition
    winner=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

    // initially all are empty
    for(var i=0;i<9;i++){
        filled[i]=false;
        symbol[i]='';
    }


    // new game buttton

    var n=document.getElementById("new");
    n.addEventListener("click",newGame);

    function newGame(){
        document.location.reload();
    };


    //click on canvas and find that id

    // e is click-event object  of tic on click
    document.getElementById("tic").addEventListener("click",function(e){
        boxClick(e.target.id);
    });


    // draw X(human) function

    function drawX(){
        box.style.backgroundColor="#fb5181";
        ctx.beginPath();
        ctx.moveTo(15,15);
        ctx.lineTo(85,85);
        ctx.moveTo(85,15);
        ctx.lineTo(15,85);
        ctx.lineWidth=21;
        ctx.lineCap="round";
        ctx.strokeStyle="white";
        ctx.stroke();
        ctx.closePath();

        symbol[num-1]='X';

    }


    // draw O 

    function drawO(next){
        box.style.backgroundColor="#93f273";
        ctx.beginPath();
        ctx.arc(50,50,35,0,2*Math.PI);
        ctx.lineWidth=21;
        ctx.lineCap="round";
        ctx.strokeStyle="white";
        ctx.stroke();
        ctx.closePath();

        symbol[next]='O';
    }

    // winner check function

    function winnerCheck(symbol,player){
        for(var j=0;j<winner.length;j++){
            if(symbol[winner[j][0]]===player && symbol[winner[j][1]]===player &&  symbol[winner[j][2]]===player)
            return true;
        }
        return false;
    }


    //boxclick function for human

    function boxClick(numId){
        box=document.getElementById(numId);
        ctx=box.getContext("2d");

        switch(numId){
            case "canvas1":
                num=1;
                break;
            case "canvas2":
                    num=2;
                    break;
            case "canvas3":
                    num=3;
                    break;
            case "canvas4":
                    num=4;                
                    break;
            case "canvas5":
                    num=5;
                     break;
           case "canvas6":
                     num=6;
                    break;
          case "canvas7":
                 num=7;
                break;
          case "canvas8":
                 num=8;
                 break;
         case "canvas9":
                    num=9;
                    break;
                                                                                                                                                                
                    
        }

        if(filled[num-1]==false){
            if(gameOver==false){
                if(turn%2!==0){
                    drawX();
                    turn++;
                    filled[num-1]=true;

                    if(winnerCheck(symbol,symbol[num-1])==true){
                        document.getElementById("result").innerText="Player "+symbol[num-1]+" won!!!";
                        gameOver=true;
                        return;
                    }

                    if(turn>9 && gameOver==false){
                        document.getElementById("result").innerText="Its a Draw";
                        return;
                    }

                    if(turn%2==0){
                        playAI();
                    }
                }

            }
            else{
                alert("Game Over !!! pls click new game button");
            }
        }
        else{
            alert("this box is already filled");
        }

    }


    // find empty positions

    function emptyBoxes(newSymbol){
        var j=0;
        var empty=[];

        for(var i=0;i<newSymbol.length;i++){
            if(newSymbol[i]!='X' && newSymbol[i]!='O'){
                empty[j]=i;
                j++;
            }
        }

        return empty;
    }

    // playAI function

    function playAI(){
        var nextMove=minimax(symbol,ai);// id+score

        var nextId="canvas"+(nextMove.id+1);
        box=document.getElementById(nextId);
        ctx=box.getContext("2d");

        if(gameOver==false){
            if(turn%2==0){
                drawO(nextMove.id);
                turn++;
                filled[nextMove.id]=true;

                if(winnerCheck(symbol,'O')==true){
                    document.getElementById("result").innerText="Player "+symbol[nextMove.id]+" winner!!!";
                    gameOver=true;
                }

                if(turn>9 && gameOver==false){
                    document.getElementById("result").innerText="Draw!!!";

                }
            }
        }
        else{
            alert("Game Over !!! pls click new game button");
        }

    }

    //minimax function

    function minimax(newSymbol,player){
        var empty=[];
        empty=emptyBoxes(newSymbol);

        if(winnerCheck(newSymbol,human)){
            return {score:-10};
        }
        else if(winnerCheck(newSymbol,ai)){
            return {score:10};
        }
        else if(empty.length==0){
            if(winnerCheck(newSymbol,human)){
                return {score:-10};
            }
            else if(winnerCheck(newSymbol,ai)){
                return {score:10};
            }

            return {score:0};
        }

        var posMoves=[];// id+score
        for(var i=0;i<empty.length;i++){
            var currMove={};
            currMove.id=empty[i];
            newSymbol[empty[i]]=player;

            if(player==human){
                result=minimax(newSymbol,ai);
                currMove.score=result.score;
            }
            else{
                result=minimax(newSymbol,human);
                currMove.score=result.score;
            }

            newSymbol[empty[i]]='';
            posMoves.push(currMove);
        }

        //calculate intermediate state value

        var bestMove;

        if(player==human){
            var lowestscore=1000;

            for(var i=0;i<posMoves.length;i++){
                if(posMoves[i].score<lowestscore){
                    lowestscore=posMoves[i].score;
                    bestMove=i;
                }
            }
        }
        else{
            var highestscore=-1000;

            for(var i=0;i<posMoves.length;i++){
                if(posMoves[i].score>highestscore){
                    highestscore=posMoves[i].score;
                    bestMove=i;
                }
            }
        }

        return posMoves[bestMove];


    }
    


};