let tileSize = 100; 
let numRows = 5; 
let numCols = 7; 
let player_turn = 1; 
let player1_rem_walls = 6; let player2_rem_walls = 6; 
let player1_rem_hammers = 2; let player2_rem_hammers = 2; 

let all_walls = [];     // wall = row1,col1,orientation,color

let board_tile_color1 = "#89FF00"; let board_tile_color2 = "#89B000"; 
let player1_piece_color = '#0000FF'; let player2_piece_color = "#FF0000"; let player1_piece_color_active = '#00FFFF'; let player2_piece_color_active = "#888888"; 
let player1_wall_color = "#550088"; let player2_wall_color = "#AA0000"; 

let player1_piece1_active = false; let player1_piece2_active = false; let player1_piece3_active = false; 
let player2_piece1_active = false; let player2_piece2_active = false; let player2_piece3_active = false; 
let player1_piece1_row; let player1_piece2_row; let player1_piece3_row; let player2_piece1_row; let player2_piece2_row; let player2_piece3_row; 
let player1_piece1_col; let player1_piece2_col; let player1_piece3_col; let player2_piece1_col; let player2_piece2_col; let player2_piece3_col; 


function setup() { createCanvas(tileSize * numCols * 1.5, tileSize * numRows * 1);
    noLoop();
    // Initialize the pieces parameters
    player1_piece1_row = numRows - 1; player1_piece2_row = numRows - 1; player1_piece3_row = numRows - 1; 
    player2_piece1_row = 0; player2_piece2_row = 0; player2_piece3_row = 0; 
    player1_piece1_col = Math.floor(numCols/2); player1_piece2_col = Math.floor(numCols/4); player1_piece3_col = Math.floor((3*numCols)/4); 
    player2_piece1_col = Math.floor(numCols/2); player2_piece2_col = Math.floor(numCols/4); player2_piece3_col = Math.floor((3*numCols)/4); 
}
function draw_Board() {
    // Create game board
    rectMode(CENTER); 
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            let color = ((row + col) % 2 === 0) ? board_tile_color1 : board_tile_color2; 
            fill(color);
            rect((0.5+col)*tileSize, (0.5+row)*tileSize, (0.85*tileSize), (0.85*tileSize));
        }
    }
    rectMode(CORNER); 
}
function draw_Pieces() {
    // Draw the pieces
    fill(player1_piece_color); 
    rect((player1_piece1_col*tileSize + tileSize/4), (player1_piece1_row*tileSize + tileSize/4), (tileSize/2), (tileSize/2)); 
    rect((player1_piece2_col*tileSize + tileSize/4), (player1_piece2_row*tileSize + tileSize/4), (tileSize/2), (tileSize/2)); 
    rect((player1_piece3_col*tileSize + tileSize/4), (player1_piece3_row*tileSize + tileSize/4), (tileSize/2), (tileSize/2)); 
    
    fill(player2_piece_color); 
    rect((player2_piece1_col*tileSize + tileSize/4), (player2_piece1_row*tileSize + tileSize/4), (tileSize/2), (tileSize/2)); 
    rect((player2_piece2_col*tileSize + tileSize/4), (player2_piece2_row*tileSize + tileSize/4), (tileSize/2), (tileSize/2)); 
    rect((player2_piece3_col*tileSize + tileSize/4), (player2_piece3_row*tileSize + tileSize/4), (tileSize/2), (tileSize/2)); 
}
function draw_Panel_and_Text() {
    let panel_width = 250; let panel_height = tileSize * 10; 
    let panel_x_loc = tileSize * (numCols+0.25); let panel_y_loc = 0; 
    let title_offset = 50; let player1_offset = 100; let player2_offset = 300; 
    let wall_box_width = 90; let wall_box_height = 30; 

    // Boxes Section
    fill("#000000"); 
    rect(panel_x_loc, panel_y_loc, panel_width, panel_height); 
    
    rectMode(CENTER); 
    fill("#FFFFFF"); 
    rect((panel_x_loc + Math.floor(panel_width/2)), title_offset+6, 140, 4); 
    fill("#0000FF"); 
    rect((panel_x_loc + Math.floor((3*panel_width)/10)), player1_offset + 72 - 5, wall_box_width, wall_box_height); 
    rect((panel_x_loc + Math.floor((7*panel_width)/10)), player1_offset + 72 - 5, wall_box_width, wall_box_height); 
    rect((panel_x_loc + Math.floor(panel_width/2)), player1_offset + 140 - 5, wall_box_width, wall_box_height); 
    fill("#FF0000"); 
    rect((panel_x_loc + Math.floor((3*panel_width)/10)), player2_offset + 72 - 5, wall_box_width, wall_box_height); 
    rect((panel_x_loc + Math.floor((7*panel_width)/10)), player2_offset + 72 - 5, wall_box_width, wall_box_height); 
    rect((panel_x_loc + Math.floor(panel_width/2)), player2_offset + 140 - 5, wall_box_width, wall_box_height); 
    rectMode(CORNER); 


    // Text Section
    textAlign(CENTER); 
    fill("#FFFFFF"); 
    textSize(30); 
    text("Info Panel", (panel_x_loc + Math.floor(panel_width/2)), title_offset); 
    textSize(22); 
    text("Player 1", (panel_x_loc + Math.floor(panel_width/2)), player1_offset + 10); 
    text("Player 2", (panel_x_loc + Math.floor(panel_width/2)), player2_offset + 10); 
    
    textSize(16); 
    text("Remaining Walls : "+String(player1_rem_walls), (panel_x_loc + Math.floor(panel_width/2)), player1_offset + 40); 
    text("Remaining Walls : "+String(player2_rem_walls), (panel_x_loc + Math.floor(panel_width/2)), player2_offset + 40); 
    text("Remaining Hammers : "+String(player1_rem_hammers), (panel_x_loc + Math.floor(panel_width/2)), player1_offset + 110); 
    text("Remaining Hammers : "+String(player2_rem_hammers), (panel_x_loc + Math.floor(panel_width/2)), player2_offset + 110); 
    text("Horizontal", (panel_x_loc + Math.floor((3*panel_width)/10)), player1_offset + 72); 
    text("Horizontal", (panel_x_loc + Math.floor((3*panel_width)/10)), player2_offset + 72); 
    text("Vertical", (panel_x_loc + Math.floor((7*panel_width)/10)), player1_offset + 72); 
    text("Vertical", (panel_x_loc + Math.floor((7*panel_width)/10)), player2_offset + 72); 
    text("Hammer", (panel_x_loc + Math.floor(panel_width/2)), player1_offset + 140); 
    text("Hammer", (panel_x_loc + Math.floor(panel_width/2)), player2_offset + 140); 
}
function draw_Walls() {
    for (let wall of all_walls) {
        let row1, col1, orientation, color = wall; fill(color); 
        if(orientation==="H") {rect(col1*tileSize, row1*tileSize, tileSize, tileSize/5);}
        else                  {rect(col1*tileSize, row1*tileSize, tileSize/5, tileSize);}
    }
}
function draw() {
    draw_Board(); 
    draw_Pieces(); 
    draw_Panel_and_Text(); 
    // draw_Walls(); 
}



function turn_change() {
    if(player_turn===1) {player_turn = 2;}
    else {player_turn = 1;}
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
    // THESE TWO NEED TO BE UPDATED FOR THE GAPE
    const row = Math.floor(mouseY / tileSize);
    const col = Math.floor(mouseX / tileSize);
    const any_piece_not_active = player1_piece1_active || player1_piece2_active || player1_piece3_active || player2_piece1_active || player2_piece2_active || player2_piece3_active; 

    // Logic to Move the Pieces
    if(1) {
    if((!any_piece_not_active) && (player_turn===1) && (player1_piece1_row === row && player1_piece1_col === col)) { 
        fill(player1_piece_color_active); 
        rect((player1_piece1_col*tileSize + tileSize/4), (player1_piece1_row*tileSize + tileSize/4), (tileSize/2), (tileSize/2)); 
        player1_piece1_active = true; }
    else if((player1_piece1_active) && (player1_piece1_row === row && player1_piece1_col === col)) { 
        player1_piece1_row = row; player1_piece1_col = col; redraw(); player1_piece1_active = false; }
    else if((player1_piece1_active) && ((Math.abs(row - player1_piece1_row) === 1 && col === player1_piece1_col) || 
    (Math.abs(col - player1_piece1_col) === 1 && row === player1_piece1_row)) && (is_cell_empty(row,col))) { 
        player1_piece1_row = row; player1_piece1_col = col; redraw(); player1_piece1_active = false; turn_change(); }
    
    if((!any_piece_not_active) && (player_turn===1) && (player1_piece2_row === row && player1_piece2_col === col)) { 
        fill(player1_piece_color_active); 
        rect((player1_piece2_col*tileSize + tileSize/4), (player1_piece2_row*tileSize + tileSize/4), (tileSize/2), (tileSize/2)); 
        player1_piece2_active = true; }
    else if((player1_piece2_active) && (player1_piece2_row === row && player1_piece2_col === col)) { 
        player1_piece2_row = row; player1_piece2_col = col; redraw(); player1_piece2_active = false; }
    else if((player1_piece2_active) && ((Math.abs(row - player1_piece2_row) === 1 && col === player1_piece2_col) || 
    (Math.abs(col - player1_piece2_col) === 1 && row === player1_piece2_row)) && (is_cell_empty(row,col))) { 
        player1_piece2_row = row; player1_piece2_col = col; redraw(); player1_piece2_active = false; turn_change(); }
    
    if((!any_piece_not_active) && (player_turn===1) && (player1_piece3_row === row && player1_piece3_col === col)) { 
        fill(player1_piece_color_active); 
        rect((player1_piece3_col*tileSize + tileSize/4), (player1_piece3_row*tileSize + tileSize/4), (tileSize/2), (tileSize/2)); 
        player1_piece3_active = true; }
    else if((player1_piece3_active) && (player1_piece3_row === row && player1_piece3_col === col)) { 
        player1_piece3_row = row; player1_piece3_col = col; redraw(); player1_piece3_active = false; }
    else if((player1_piece3_active) && ((Math.abs(row - player1_piece3_row) === 1 && col === player1_piece3_col) || 
    (Math.abs(col - player1_piece3_col) === 1 && row === player1_piece3_row)) && (is_cell_empty(row,col))) { 
        player1_piece3_row = row; player1_piece3_col = col; redraw(); player1_piece3_active = false; turn_change(); }


    if((!any_piece_not_active) && (player_turn===2) && (player2_piece1_row === row && player2_piece1_col === col)) { 
        fill(player2_piece_color_active); 
        rect((player2_piece1_col*tileSize + tileSize/4), (player2_piece1_row*tileSize + tileSize/4), (tileSize/2), (tileSize/2)); 
        player2_piece1_active = true; }
    else if((player2_piece1_active) && (player2_piece1_row === row && player2_piece1_col === col)) { 
        player2_piece1_row = row; player2_piece1_col = col; redraw(); player2_piece1_active = false; }
    else if((player2_piece1_active) && ((Math.abs(row - player2_piece1_row) === 1 && col === player2_piece1_col) || 
    (Math.abs(col - player2_piece1_col) === 1 && row === player2_piece1_row)) && (is_cell_empty(row,col))) { 
        player2_piece1_row = row; player2_piece1_col = col; redraw(); player2_piece1_active = false; turn_change(); }
    
    if((!any_piece_not_active) && (player_turn===2) && (player2_piece2_row === row && player2_piece2_col === col)) { 
        fill(player2_piece_color_active); 
        rect((player2_piece2_col*tileSize + tileSize/4), (player2_piece2_row*tileSize + tileSize/4), (tileSize/2), (tileSize/2)); 
        player2_piece2_active = true; }
    else if((player2_piece2_active) && (player2_piece2_row === row && player2_piece2_col === col)) { 
        player2_piece2_row = row; player2_piece2_col = col; redraw(); player2_piece2_active = false; }
    else if((player2_piece2_active) && ((Math.abs(row - player2_piece2_row) === 1 && col === player2_piece2_col) || 
    (Math.abs(col - player2_piece2_col) === 1 && row === player2_piece2_row)) && (is_cell_empty(row,col))) { 
        player2_piece2_row = row; player2_piece2_col = col; redraw(); player2_piece2_active = false; turn_change(); }
    
    if((!any_piece_not_active) && (player_turn===2) && (player2_piece3_row === row && player2_piece3_col === col)) { 
        fill(player2_piece_color_active); 
        rect((player2_piece3_col*tileSize + tileSize/4), (player2_piece3_row*tileSize + tileSize/4), (tileSize/2), (tileSize/2)); 
        player2_piece3_active = true; }
    else if((player2_piece3_active) && (player2_piece3_row === row && player2_piece3_col === col)) { 
        player2_piece3_row = row; player2_piece3_col = col; redraw(); player2_piece3_active = false; }
    else if((player2_piece3_active) && ((Math.abs(row - player2_piece3_row) === 1 && col === player2_piece3_col) || 
    (Math.abs(col - player2_piece3_col) === 1 && row === player2_piece3_row)) && (is_cell_empty(row,col))) { 
        player2_piece3_row = row; player2_piece3_col = col; redraw(); player2_piece3_active = false; turn_change(); }
    }



}
