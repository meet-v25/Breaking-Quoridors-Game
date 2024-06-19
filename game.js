let tileSize = 50;
let numRows = 5;
let numCols = 7;
let player_turn = 1; 

let player1_color; let player2_color; let player1_color_active; let player2_color_active; 
let player1_piece1_active = false; let player1_piece2_active = false; let player1_piece3_active = false; 
let player2_piece1_active = false; let player2_piece2_active = false; let player2_piece3_active = false; 
let player1_piece1_row; let player1_piece2_row; let player1_piece3_row; let player2_piece1_row; let player2_piece2_row; let player2_piece3_row; 
let player1_piece1_col; let player1_piece2_col; let player1_piece3_col; let player2_piece1_col; let player2_piece2_col; let player2_piece3_col; 


function turn_change() {
    if(player_turn===1) {player_turn = 2;}
    else {player_turn = 1;}
}

function setup() {
    createCanvas(tileSize * numCols, tileSize * numRows);
    noLoop();
    // Initialize the pieces parameters
    player1_color = '#0000FF'; player2_color = "#000000"; player1_color_active = '#00FFFF'; player2_color_active = "#888888"; 
    player1_piece1_row = numRows - 1; player1_piece2_row = numRows - 1; player1_piece3_row = numRows - 1; 
    player2_piece1_row = 0; player2_piece2_row = 0; player2_piece3_row = 0; 
    player1_piece1_col = Math.floor(numCols/2); player1_piece2_col = Math.floor(numCols/4); player1_piece3_col = Math.floor((3*numCols)/4); 
    player2_piece1_col = Math.floor(numCols/2); player2_piece2_col = Math.floor(numCols/4); player2_piece3_col = Math.floor((3*numCols)/4); 
}

function draw() {
    // Create game board
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            let color = ((row + col) % 2 === 0) ? '#FF8F59' : '#CBDD31'; 
            fill(color);
            rect(col * tileSize, row * tileSize, tileSize, tileSize);
        }
    }
    // Draw the pieces
    fill(player1_color); 
    rect((player1_piece1_col*tileSize + tileSize/4), (player1_piece1_row*tileSize + tileSize/4), (tileSize/2), (tileSize/2)); 
    rect((player1_piece2_col*tileSize + tileSize/4), (player1_piece2_row*tileSize + tileSize/4), (tileSize/2), (tileSize/2)); 
    rect((player1_piece3_col*tileSize + tileSize/4), (player1_piece3_row*tileSize + tileSize/4), (tileSize/2), (tileSize/2)); 
    
    fill(player2_color); 
    rect((player2_piece1_col*tileSize + tileSize/4), (player2_piece1_row*tileSize + tileSize/4), (tileSize/2), (tileSize/2)); 
    rect((player2_piece2_col*tileSize + tileSize/4), (player2_piece2_row*tileSize + tileSize/4), (tileSize/2), (tileSize/2)); 
    rect((player2_piece3_col*tileSize + tileSize/4), (player2_piece3_row*tileSize + tileSize/4), (tileSize/2), (tileSize/2)); 
}

function is_cell_empty(row,col) {
    return ( 
    !(player1_piece1_row===row && player1_piece1_col===col) &&  
    !(player1_piece2_row===row && player1_piece2_col===col) &&  
    !(player1_piece3_row===row && player1_piece3_col===col) &&  
    !(player2_piece1_row===row && player2_piece1_col===col) &&  
    !(player2_piece2_row===row && player2_piece2_col===col) &&  
    !(player2_piece3_row===row && player2_piece3_col===col) 
    ); 
}


function mousePressed() {
    const row = Math.floor(mouseY / tileSize);
    const col = Math.floor(mouseX / tileSize);
    const any_piece_not_active = player1_piece1_active || player1_piece2_active || player1_piece3_active || player2_piece1_active || player2_piece2_active || player2_piece3_active; 
    
    // Logic to Move the Pieces
    if(1) {
    if((!any_piece_not_active) && (player_turn===1) && (player1_piece1_row === row && player1_piece1_col === col)) { 
        fill(player1_color_active); 
        rect((player1_piece1_col*tileSize + tileSize/4), (player1_piece1_row*tileSize + tileSize/4), (tileSize/2), (tileSize/2)); 
        player1_piece1_active = true; }
    else if((player1_piece1_active) && (player1_piece1_row === row && player1_piece1_col === col)) { 
        player1_piece1_row = row; player1_piece1_col = col; redraw(); player1_piece1_active = false; }
    else if((player1_piece1_active) && ((Math.abs(row - player1_piece1_row) === 1 && col === player1_piece1_col) || 
    (Math.abs(col - player1_piece1_col) === 1 && row === player1_piece1_row)) && (is_cell_empty(row,col))) { 
        player1_piece1_row = row; player1_piece1_col = col; redraw(); player1_piece1_active = false; turn_change(); }
    
    if((!any_piece_not_active) && (player_turn===1) && (player1_piece2_row === row && player1_piece2_col === col)) { 
        fill(player1_color_active); 
        rect((player1_piece2_col*tileSize + tileSize/4), (player1_piece2_row*tileSize + tileSize/4), (tileSize/2), (tileSize/2)); 
        player1_piece2_active = true; }
    else if((player1_piece2_active) && (player1_piece2_row === row && player1_piece2_col === col)) { 
        player1_piece2_row = row; player1_piece2_col = col; redraw(); player1_piece2_active = false; }
    else if((player1_piece2_active) && ((Math.abs(row - player1_piece2_row) === 1 && col === player1_piece2_col) || 
    (Math.abs(col - player1_piece2_col) === 1 && row === player1_piece2_row)) && (is_cell_empty(row,col))) { 
        player1_piece2_row = row; player1_piece2_col = col; redraw(); player1_piece2_active = false; turn_change(); }
    
    if((!any_piece_not_active) && (player_turn===1) && (player1_piece3_row === row && player1_piece3_col === col)) { 
        fill(player1_color_active); 
        rect((player1_piece3_col*tileSize + tileSize/4), (player1_piece3_row*tileSize + tileSize/4), (tileSize/2), (tileSize/2)); 
        player1_piece3_active = true; }
    else if((player1_piece3_active) && (player1_piece3_row === row && player1_piece3_col === col)) { 
        player1_piece3_row = row; player1_piece3_col = col; redraw(); player1_piece3_active = false; }
    else if((player1_piece3_active) && ((Math.abs(row - player1_piece3_row) === 1 && col === player1_piece3_col) || 
    (Math.abs(col - player1_piece3_col) === 1 && row === player1_piece3_row)) && (is_cell_empty(row,col))) { 
        player1_piece3_row = row; player1_piece3_col = col; redraw(); player1_piece3_active = false; turn_change(); }


    if((!any_piece_not_active) && (player_turn===2) && (player2_piece1_row === row && player2_piece1_col === col)) { 
        fill(player2_color_active); 
        rect((player2_piece1_col*tileSize + tileSize/4), (player2_piece1_row*tileSize + tileSize/4), (tileSize/2), (tileSize/2)); 
        player2_piece1_active = true; }
    else if((player2_piece1_active) && (player2_piece1_row === row && player2_piece1_col === col)) { 
        player2_piece1_row = row; player2_piece1_col = col; redraw(); player2_piece1_active = false; }
    else if((player2_piece1_active) && ((Math.abs(row - player2_piece1_row) === 1 && col === player2_piece1_col) || 
    (Math.abs(col - player2_piece1_col) === 1 && row === player2_piece1_row)) && (is_cell_empty(row,col))) { 
        player2_piece1_row = row; player2_piece1_col = col; redraw(); player2_piece1_active = false; turn_change(); }
    
    if((!any_piece_not_active) && (player_turn===2) && (player2_piece2_row === row && player2_piece2_col === col)) { 
        fill(player2_color_active); 
        rect((player2_piece2_col*tileSize + tileSize/4), (player2_piece2_row*tileSize + tileSize/4), (tileSize/2), (tileSize/2)); 
        player2_piece2_active = true; }
    else if((player2_piece2_active) && (player2_piece2_row === row && player2_piece2_col === col)) { 
        player2_piece2_row = row; player2_piece2_col = col; redraw(); player2_piece2_active = false; }
    else if((player2_piece2_active) && ((Math.abs(row - player2_piece2_row) === 1 && col === player2_piece2_col) || 
    (Math.abs(col - player2_piece2_col) === 1 && row === player2_piece2_row)) && (is_cell_empty(row,col))) { 
        player2_piece2_row = row; player2_piece2_col = col; redraw(); player2_piece2_active = false; turn_change(); }
    
    if((!any_piece_not_active) && (player_turn===2) && (player2_piece3_row === row && player2_piece3_col === col)) { 
        fill(player2_color_active); 
        rect((player2_piece3_col*tileSize + tileSize/4), (player2_piece3_row*tileSize + tileSize/4), (tileSize/2), (tileSize/2)); 
        player2_piece3_active = true; }
    else if((player2_piece3_active) && (player2_piece3_row === row && player2_piece3_col === col)) { 
        player2_piece3_row = row; player2_piece3_col = col; redraw(); player2_piece3_active = false; }
    else if((player2_piece3_active) && ((Math.abs(row - player2_piece3_row) === 1 && col === player2_piece3_col) || 
    (Math.abs(col - player2_piece3_col) === 1 && row === player2_piece3_row)) && (is_cell_empty(row,col))) { 
        player2_piece3_row = row; player2_piece3_col = col; redraw(); player2_piece3_active = false; turn_change(); }
    }



}
