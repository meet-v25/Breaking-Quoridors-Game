let tileSize = 50;
let numRows = 5;
let numCols = 7;

let player1_color; let player2_color; let player1_color_active; let player2_color_active; 
let player1_piece1_active = false; let player1_piece2_active = false; let player1_piece3_active = false; 
let player2_piece1_active = false; let player2_piece2_active = false; let player2_piece3_active = false; 
let player1_piece1_row; let player1_piece2_row; let player1_piece3_row; let player2_piece1_row; let player2_piece2_row; let player2_piece3_row; 
let player1_piece1_col; let player1_piece2_col; let player1_piece3_col; let player2_piece1_col; let player2_piece2_col; let player2_piece3_col; 


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
