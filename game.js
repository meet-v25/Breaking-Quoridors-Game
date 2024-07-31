let tileSize = 100; 
let numRows = 5; 
let numCols = 3; 

let player_turn = 1; 
let player1_rem_walls = 6; let player2_rem_walls = 6; 
let player1_rem_hammers = 2; let player2_rem_hammers = 2; 

let panel_x_loc = tileSize * (numCols+0.25); let panel_y_loc = 0; 
let panel_width = 250; let panel_height = tileSize * 10; 

let box_width = 90; let box_height = 30; 
let title_offset = 50; let player1_offset = 300; let player2_offset = 100; 

let player1_box1_centre_x = (panel_x_loc + Math.floor((3*panel_width)/10)); let player1_box3_centre_x = player1_box1_centre_x; let player2_box1_centre_x = player1_box1_centre_x; let player2_box3_centre_x = player1_box1_centre_x; 
let player1_box2_centre_x = (panel_x_loc + Math.floor((7*panel_width)/10)); let player1_box4_centre_x = player1_box2_centre_x; let player2_box2_centre_x = player1_box2_centre_x; let player2_box4_centre_x = player1_box2_centre_x; 
let player1_box1_centre_y = (player1_offset +  70 - 5); let player1_box2_centre_y = player1_box1_centre_y; 
let player1_box3_centre_y = (player1_offset + 140 - 5); let player1_box4_centre_y = player1_box3_centre_y; 
let player2_box1_centre_y = (player2_offset +  70 - 5); let player2_box2_centre_y = player2_box1_centre_y; 
let player2_box3_centre_y = (player2_offset + 140 - 5); let player2_box4_centre_y = player2_box3_centre_y; 

let Walls_List = [];     // element = wall = [row1,col1,row2,col2,player_wall_color]; 
let Blocked_Wall_Positions = [];    // element = position = [row,col]

let board_tile_color1 = "#89FF00"; let board_tile_color2 = "#89B000"; 
let player1_piece_color = '#0000FF'; let player2_piece_color = "#FF0000"; let player1_piece_color_active = '#00FFFF'; let player2_piece_color_active = "#FFAA00"; 
let player1_wall_color = "#550088"; let player2_wall_color = "#AA0000"; 

let player1_using_wall = "N"; let player2_using_wall = "N"; let player1_using_hammer = "N"; let player2_using_hammer = "N"; 
let player1_piece1_active = false; let player1_piece2_active = false; let player1_piece3_active = false; let player2_piece1_active = false; let player2_piece2_active = false; let player2_piece3_active = false; 

let player1_piece1_row = numRows-1; let player1_piece2_row = player1_piece1_row; let player1_piece3_row = player1_piece1_row; 
let player2_piece1_row = 0;         let player2_piece2_row = player2_piece1_row; let player2_piece3_row = player2_piece1_row; 
let player1_piece1_col = Math.floor(numCols/2); let player1_piece2_col = Math.floor((1*numCols)/4); let player1_piece3_col = Math.floor((3*numCols)/4); 
let player2_piece1_col = player1_piece1_col;    let player2_piece2_col = player1_piece2_col;        let player2_piece3_col = player1_piece3_col; 


function setup() { createCanvas((tileSize * numCols + panel_width + 30), Math.max(tileSize * numRows, panel_height)); 
    noLoop(); 
}
function draw_Board() {
    fill("#000000"); 
    rect(0, 0, tileSize*(numCols+0.2), Math.max(tileSize*numRows,1000)); 
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
function draw_Walls() {
    rectMode(CENTER); 
    for (let wall of Walls_List) {  // wall = [row1,col1,row2,col2,player_wall_color]; 
        let [row1,col1,row2,col2,player_wall_color] = wall; fill(player_wall_color); 
        if(row1===row2) { // Horizontal Wall
            rect(col1*tileSize, row1*tileSize, 2*(tileSize*0.96), 10); 
        } else {    // Vertical Wall
            rect(col1*tileSize, row1*tileSize, 10, 2*(tileSize*0.96)); 
        }
    } rectMode(CORNER); 
}
function draw_Panel() {
    rectMode(CORNER); 
    fill("#000000"); 
    rect(panel_x_loc, panel_y_loc, panel_width, panel_height); 
    rectMode(CENTER); 
    fill("#FFFFFF"); 
    rect((panel_x_loc + Math.floor(panel_width/2)), title_offset+6, 140, 4); 
    fill(player1_piece_color); 
    rect(player1_box1_centre_x, player1_box1_centre_y, box_width, box_height); 
    rect(player1_box2_centre_x, player1_box2_centre_y, box_width, box_height); 
    rect(player1_box3_centre_x, player1_box3_centre_y, box_width, box_height); 
    rect(player1_box4_centre_x, player1_box4_centre_y, box_width, box_height); 
    fill(player2_piece_color); 
    rect(player2_box1_centre_x, player2_box1_centre_y, box_width, box_height); 
    rect(player2_box2_centre_x, player2_box2_centre_y, box_width, box_height); 
    rect(player2_box3_centre_x, player2_box3_centre_y, box_width, box_height); 
    rect(player2_box4_centre_x, player2_box4_centre_y, box_width, box_height); 
    rectMode(CORNER); 
}
function draw_Text(text_color) {
    // Text Section
    textAlign(CENTER); 
    fill(text_color); 
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
    text("Horizontal",  (panel_x_loc + Math.floor((3*panel_width)/10)), player1_offset +  70); 
    text("Horizontal",  (panel_x_loc + Math.floor((3*panel_width)/10)), player2_offset +  70); 
    text("Vertical",    (panel_x_loc + Math.floor((7*panel_width)/10)), player1_offset +  70); 
    text("Vertical",    (panel_x_loc + Math.floor((7*panel_width)/10)), player2_offset +  70); 
    text("Horizontal",  (panel_x_loc + Math.floor((3*panel_width)/10)), player1_offset + 140); 
    text("Horizontal",  (panel_x_loc + Math.floor((3*panel_width)/10)), player2_offset + 140); 
    text("Vertical",    (panel_x_loc + Math.floor((7*panel_width)/10)), player1_offset + 140); 
    text("Vertical",    (panel_x_loc + Math.floor((7*panel_width)/10)), player2_offset + 140); 
}
function draw() {
    draw_Board(); 
    draw_Pieces(); 
    draw_Walls(); 
    draw_Panel(); 
    draw_Text("#FFFFFF"); 
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
    const piece_active = player1_piece1_active || player1_piece2_active || player1_piece3_active || player2_piece1_active || player2_piece2_active || player2_piece3_active; 
    const weapon_active = (player1_using_wall!=="N") || (player1_using_hammer!=="N") || (player2_using_wall!=="N") || (player2_using_hammer!=="N"); 

    // BOARD MOVES
    if((0<mouseX) && (mouseX<numCols*tileSize) && (0<mouseY) && (mouseY<numRows*tileSize)) 
    {
      if(!weapon_active) { // NORMAL PLAY
        // THESE TWO NEED TO BE UPDATED FOR THE GAPE
        const board_row = Math.floor(mouseY / tileSize); 
        const board_col = Math.floor(mouseX / tileSize); 
        
        // Logic to Move the Pieces ; 6 if blocks = 6 pieces
        if((!piece_active) && (player_turn===1) && (player1_piece1_row === board_row && player1_piece1_col === board_col)) { 
            fill(player1_piece_color_active); 
            rect((player1_piece1_col*tileSize + tileSize/4), (player1_piece1_row*tileSize + tileSize/4), (tileSize/2), (tileSize/2)); 
            player1_piece1_active = true; }
        else if((player1_piece1_active) && (player1_piece1_row === board_row && player1_piece1_col === board_col)) { 
            player1_piece1_row = board_row; player1_piece1_col = board_col; redraw(); player1_piece1_active = false; }
        else if((player1_piece1_active) && ((Math.abs(board_row - player1_piece1_row) === 1 && board_col === player1_piece1_col) || 
        (Math.abs(board_col - player1_piece1_col) === 1 && board_row === player1_piece1_row)) && (is_cell_empty(board_row,board_col))) { 
            player1_piece1_row = board_row; player1_piece1_col = board_col; redraw(); player1_piece1_active = false; turn_change(); }
        
        if(1) {
        if((!piece_active) && (player_turn===1) && (player1_piece2_row === board_row && player1_piece2_col === board_col)) { 
            fill(player1_piece_color_active); 
            rect((player1_piece2_col*tileSize + tileSize/4), (player1_piece2_row*tileSize + tileSize/4), (tileSize/2), (tileSize/2)); 
            player1_piece2_active = true; }
        else if((player1_piece2_active) && (player1_piece2_row === board_row && player1_piece2_col === board_col)) { 
            player1_piece2_row = board_row; player1_piece2_col = board_col; redraw(); player1_piece2_active = false; }
        else if((player1_piece2_active) && ((Math.abs(board_row - player1_piece2_row) === 1 && board_col === player1_piece2_col) || 
        (Math.abs(board_col - player1_piece2_col) === 1 && board_row === player1_piece2_row)) && (is_cell_empty(board_row,board_col))) { 
            player1_piece2_row = board_row; player1_piece2_col = board_col; redraw(); player1_piece2_active = false; turn_change(); }
        
        if((!piece_active) && (player_turn===1) && (player1_piece3_row === board_row && player1_piece3_col === board_col)) { 
            fill(player1_piece_color_active); 
            rect((player1_piece3_col*tileSize + tileSize/4), (player1_piece3_row*tileSize + tileSize/4), (tileSize/2), (tileSize/2)); 
            player1_piece3_active = true; }
        else if((player1_piece3_active) && (player1_piece3_row === board_row && player1_piece3_col === board_col)) { 
            player1_piece3_row = board_row; player1_piece3_col = board_col; redraw(); player1_piece3_active = false; }
        else if((player1_piece3_active) && ((Math.abs(board_row - player1_piece3_row) === 1 && board_col === player1_piece3_col) || 
        (Math.abs(board_col - player1_piece3_col) === 1 && board_row === player1_piece3_row)) && (is_cell_empty(board_row,board_col))) { 
            player1_piece3_row = board_row; player1_piece3_col = board_col; redraw(); player1_piece3_active = false; turn_change(); }


        if((!piece_active) && (player_turn===2) && (player2_piece1_row === board_row && player2_piece1_col === board_col)) { 
            fill(player2_piece_color_active); 
            rect((player2_piece1_col*tileSize + tileSize/4), (player2_piece1_row*tileSize + tileSize/4), (tileSize/2), (tileSize/2)); 
            player2_piece1_active = true; }
        else if((player2_piece1_active) && (player2_piece1_row === board_row && player2_piece1_col === board_col)) { 
            player2_piece1_row = board_row; player2_piece1_col = board_col; redraw(); player2_piece1_active = false; }
        else if((player2_piece1_active) && ((Math.abs(board_row - player2_piece1_row) === 1 && board_col === player2_piece1_col) || 
        (Math.abs(board_col - player2_piece1_col) === 1 && board_row === player2_piece1_row)) && (is_cell_empty(board_row,board_col))) { 
            player2_piece1_row = board_row; player2_piece1_col = board_col; redraw(); player2_piece1_active = false; turn_change(); }
        
        if((!piece_active) && (player_turn===2) && (player2_piece2_row === board_row && player2_piece2_col === board_col)) { 
            fill(player2_piece_color_active); 
            rect((player2_piece2_col*tileSize + tileSize/4), (player2_piece2_row*tileSize + tileSize/4), (tileSize/2), (tileSize/2)); 
            player2_piece2_active = true; }
        else if((player2_piece2_active) && (player2_piece2_row === board_row && player2_piece2_col === board_col)) { 
            player2_piece2_row = board_row; player2_piece2_col = board_col; redraw(); player2_piece2_active = false; }
        else if((player2_piece2_active) && ((Math.abs(board_row - player2_piece2_row) === 1 && board_col === player2_piece2_col) || 
        (Math.abs(board_col - player2_piece2_col) === 1 && board_row === player2_piece2_row)) && (is_cell_empty(board_row,board_col))) { 
            player2_piece2_row = board_row; player2_piece2_col = board_col; redraw(); player2_piece2_active = false; turn_change(); }
        
        if((!piece_active) && (player_turn===2) && (player2_piece3_row === board_row && player2_piece3_col === board_col)) { 
            fill(player2_piece_color_active); 
            rect((player2_piece3_col*tileSize + tileSize/4), (player2_piece3_row*tileSize + tileSize/4), (tileSize/2), (tileSize/2)); 
            player2_piece3_active = true; }
        else if((player2_piece3_active) && (player2_piece3_row === board_row && player2_piece3_col === board_col)) { 
            player2_piece3_row = board_row; player2_piece3_col = board_col; redraw(); player2_piece3_active = false; }
        else if((player2_piece3_active) && ((Math.abs(board_row - player2_piece3_row) === 1 && board_col === player2_piece3_col) || 
        (Math.abs(board_col - player2_piece3_col) === 1 && board_row === player2_piece3_row)) && (is_cell_empty(board_row,board_col))) { 
            player2_piece3_row = board_row; player2_piece3_col = board_col; redraw(); player2_piece3_active = false; turn_change(); }
        }
      }

      else 

      {     // WEAPON PLAY
        
        // THIS ALSO NEED TO REVISE AS PER GAPS
        const wall_row = Math.floor((mouseY+tileSize/2) / tileSize); 
        const wall_col = Math.floor((mouseX+tileSize/2) / tileSize); 
        rectMode(CENTER); 

        if((0<wall_col) && (wall_col<numCols) && (0<wall_row) && (wall_row<numRows)) {

            if(player1_using_wall==="H") {
                // add check wall overlap
                Walls_List.push([wall_row, wall_col, wall_row, wall_col+1, player1_wall_color]); 
                Blocked_Wall_Positions.push([wall_row, wall_col]); Blocked_Wall_Positions.push([wall_row, wall_col+1]); 
                player1_rem_walls -= 1; player1_using_wall = "N"; turn_change(); 
                draw_Walls(); draw_Panel(); draw_Text("#FFFFFF"); redraw(); 

                console.log(21); console.log(Walls_List); console.log(Blocked_Wall_Positions); 
            }
            if(player1_using_wall==="V") {
                // add check wall overlap
                Walls_List.push([wall_row, wall_col, wall_row+1, wall_col, player1_wall_color]); 
                Blocked_Wall_Positions.push([wall_row, wall_col]); Blocked_Wall_Positions.push([wall_row+1, wall_col]); 
                player1_rem_walls -= 1; player1_using_wall = "N"; turn_change(); 
                draw_Walls(); draw_Panel(); draw_Text("#FFFFFF"); redraw(); 
            }
            if(player1_using_hammer==="H") {
                let index_to_remove = -1; 
                for (let index=0; index<Walls_List.length; index+=1) {
                    let [r1,c1,r2,c2,color] = Walls_List[index]; 
                    if((wall_row===r1) && (wall_col===c1) && (wall_row===r2) && ((wall_col+1)===c2)) { index_to_remove = index; break; }
                }
                Walls_List.splice(index_to_remove,1); 
                Blocked_Wall_Positions.splice(2*index_to_remove,1); Blocked_Wall_Positions.splice(2*index_to_remove,1); 
                player1_rem_hammers -= 1; player1_using_hammer = "N"; turn_change(); 
                draw_Walls(); draw_Panel(); draw_Text("#FFFFFF"); redraw(); 
            }
            if(player1_using_hammer==="V") {
                let index_to_remove = -1; 
                for (let index=0; index<Walls_List.length; index+=1) {
                    let [r1,c1,r2,c2,color] = Walls_List[index]; 
                    if((wall_row===r1) && (wall_col===c1) && ((wall_row+1)===r2) && (wall_col===c2)) { index_to_remove = index; break; }
                }
                Walls_List.splice(index_to_remove,1); 
                Blocked_Wall_Positions.splice(2*index_to_remove,1); Blocked_Wall_Positions.splice(2*index_to_remove,1); 
                player1_rem_hammers -= 1; player1_using_hammer = "N"; turn_change(); 
                draw_Walls(); draw_Panel(); draw_Text("#FFFFFF"); redraw(); 
            }
            if(player2_using_wall==="H") {
                // add check wall overlap
                Walls_List.push([wall_row, wall_col, wall_row, wall_col+1, player2_wall_color]); 
                Blocked_Wall_Positions.push([wall_row, wall_col]); Blocked_Wall_Positions.push([wall_row, wall_col+1]); 
                player2_rem_walls -= 1; player2_using_wall = "N"; turn_change(); 
                draw_Walls(); draw_Panel(); draw_Text("#FFFFFF"); 
            }
            if(player2_using_wall==="V") {
                // add check wall overlap
                Walls_List.push([wall_row, wall_col, wall_row+1, wall_col, player2_wall_color]); 
                Blocked_Wall_Positions.push([wall_row, wall_col]); Blocked_Wall_Positions.push([wall_row+1, wall_col]); 
                player2_rem_walls -= 1; player2_using_wall = "N"; turn_change(); 
                draw_Walls(); draw_Panel(); draw_Text("#FFFFFF"); 
            }
            if(player2_using_hammer==="H") {
                let index_to_remove = -1; 
                for (let index=0; index<Walls_List.length; index+=1) {
                    let [r1,c1,r2,c2,color] = Walls_List[index]; 
                    if((wall_row===r1) && (wall_col===c1) && (wall_row===r2) && ((wall_col+1)===c2)) { index_to_remove = index; break; }
                }
                Walls_List.splice(index_to_remove,1); 
                Blocked_Wall_Positions.splice(2*index_to_remove,1); Blocked_Wall_Positions.splice(2*index_to_remove,1); 
                player2_rem_hammers -= 1; player2_using_hammer = "N"; turn_change(); 
                draw_Walls(); draw_Panel(); draw_Text("#FFFFFF"); redraw(); 
            }
            if(player2_using_hammer==="V") {
                let index_to_remove = -1; 
                for (let index=0; index<Walls_List.length; index+=1) {
                    let [r1,c1,r2,c2,color] = Walls_List[index]; 
                    if((wall_row===r1) && (wall_col===c1) && ((wall_row+1)===r2) && (wall_col===c2)) { index_to_remove = index; break; }
                }
                Walls_List.splice(index_to_remove,1); 
                Blocked_Wall_Positions.splice(2*index_to_remove,1); Blocked_Wall_Positions.splice(2*index_to_remove,1); 
                player2_rem_hammers -= 1; player2_using_hammer = "N"; turn_change(); 
                draw_Walls(); draw_Panel(); draw_Text("#FFFFFF"); redraw(); 
            }
        } rectMode(CORNER); 
      }
    }



    // IF CLICK MOVE HAPPENED ON PANEL
    else 
    {
        rectMode(CENTER); textAlign(CENTER); 
        
        if(         (!weapon_active) && (player_turn===1) && (player1_rem_walls>0) && 
                    ((player1_box1_centre_x - box_width/2) < (mouseX)) && ((mouseX) < (player1_box1_centre_x + box_width/2)) && 
                    ((player1_box1_centre_y - box_height/2) < (mouseY)) && ((mouseY) < (player1_box1_centre_y + box_height/2))) 
        {
            fill(player1_piece_color_active); rect(player1_box1_centre_x, player1_box1_centre_y, box_width, box_height); 
            fill("#000000"); textSize(16); text("Horizontal", (panel_x_loc + Math.floor((3*panel_width)/10)), player1_offset + 70); 
            player1_using_wall = "H"; console.log(311); 
        
        } else if ( (player1_using_wall==="H") && 
                    ((player1_box1_centre_x - box_width/2) < (mouseX)) && ((mouseX) < (player1_box1_centre_x + box_width/2)) && 
                    ((player1_box1_centre_y - box_height/2) < (mouseY)) && ((mouseY) < (player1_box1_centre_y + box_height/2))) {
            draw_Panel(); draw_Text("#FFFFFF"); 
            player1_using_wall = "N"; console.log(312); 
        }

        if(1) {
        if(         (!weapon_active) && (player_turn===1) && (player1_rem_walls>0) && 
                    ((player1_box2_centre_x - box_width/2) < (mouseX)) && ((mouseX) < (player1_box2_centre_x + box_width/2)) && 
                    ((player1_box2_centre_y - box_height/2) < (mouseY)) && ((mouseY) < (player1_box2_centre_y + box_height/2))) {
            fill(player1_piece_color_active); rect(player1_box2_centre_x, player1_box2_centre_y, box_width, box_height); 
            fill("#000000"); textSize(16); text("Vertical", (panel_x_loc + Math.floor((7*panel_width)/10)), player1_offset + 70); 
            player1_using_wall = "V"; console.log(321); 
        
        } else if ( (player1_using_wall==="V") && 
                    ((player1_box2_centre_x - box_width/2) < (mouseX)) && ((mouseX) < (player1_box2_centre_x + box_width/2)) && 
                    ((player1_box2_centre_y - box_height/2) < (mouseY)) && ((mouseY) < (player1_box2_centre_y + box_height/2))) {
            draw_Panel(); draw_Text("#FFFFFF"); 
            player1_using_wall = "N"; console.log(322); 
        } 

        if(         (!weapon_active) && (player_turn===1) && (player1_rem_hammers>0) && 
                    ((player1_box3_centre_x - box_width/2) < (mouseX)) && ((mouseX) < (player1_box3_centre_x + box_width/2)) && 
                    ((player1_box3_centre_y - box_height/2) < (mouseY)) && ((mouseY) < (player1_box3_centre_y + box_height/2))) {
            fill(player1_piece_color_active); rect(player1_box3_centre_x, player1_box3_centre_y, box_width, box_height); 
            fill("#000000"); textSize(16); text("Horizontal", (panel_x_loc + Math.floor((3*panel_width)/10)), player1_offset + 140); 
            player1_using_hammer = "H"; console.log(331); 
        
        } else if ( (player1_using_hammer==="H") && 
                    ((player1_box3_centre_x - box_width/2) < (mouseX)) && ((mouseX) < (player1_box3_centre_x + box_width/2)) && 
                    ((player1_box3_centre_y - box_height/2) < (mouseY)) && ((mouseY) < (player1_box3_centre_y + box_height/2))) {
            draw_Panel(); draw_Text("#FFFFFF"); 
            player1_using_hammer = "N"; console.log(332); 
        } 

        if(         (!weapon_active) && (player_turn===1) && (player1_rem_hammers>0) && 
                    ((player1_box4_centre_x - box_width/2) < (mouseX)) && ((mouseX) < (player1_box4_centre_x + box_width/2)) && 
                    ((player1_box4_centre_y - box_height/2) < (mouseY)) && ((mouseY) < (player1_box4_centre_y + box_height/2))) {
            fill(player1_piece_color_active); rect(player1_box4_centre_x, player1_box4_centre_y, box_width, box_height); 
            fill("#000000"); textSize(16); text("Vertical", (panel_x_loc + Math.floor((7*panel_width)/10)), player1_offset + 140); 
            player1_using_hammer = "V"; console.log(341); 
        
        } else if ( (player1_using_hammer==="V") && 
                    ((player1_box4_centre_x - box_width/2) < (mouseX)) && ((mouseX) < (player1_box4_centre_x + box_width/2)) && 
                    ((player1_box4_centre_y - box_height/2) < (mouseY)) && ((mouseY) < (player1_box4_centre_y + box_height/2))) {
            draw_Panel(); draw_Text("#FFFFFF"); 
            player1_using_hammer = "N"; console.log(342); 
        } 

        if(         (!weapon_active) && (player_turn===2) && (player2_rem_walls>0) && 
                    ((player2_box1_centre_x - box_width/2) < (mouseX)) && ((mouseX) < (player2_box1_centre_x + box_width/2)) && 
                    ((player2_box1_centre_y - box_height/2) < (mouseY)) && ((mouseY) < (player2_box1_centre_y + box_height/2))) {
            fill(player2_piece_color_active); rect(player2_box1_centre_x, player2_box1_centre_y, box_width, box_height); 
            fill("#000000"); textSize(16); text("Horizontal", (panel_x_loc + Math.floor((3*panel_width)/10)), player2_offset + 70); 
            player2_using_wall = "H"; console.log(351); 
        
        } else if ( (player2_using_wall==="H") && 
                    ((player2_box1_centre_x - box_width/2) < (mouseX)) && ((mouseX) < (player2_box1_centre_x + box_width/2)) && 
                    ((player2_box1_centre_y - box_height/2) < (mouseY)) && ((mouseY) < (player2_box1_centre_y + box_height/2))) {
            draw_Panel(); draw_Text("#FFFFFF"); 
            player2_using_wall = "N"; console.log(352); 
        } 

        if(         (!weapon_active) && (player_turn===2) && (player2_rem_walls>0) && 
                    ((player2_box2_centre_x - box_width/2) < (mouseX)) && ((mouseX) < (player2_box2_centre_x + box_width/2)) && 
                    ((player2_box2_centre_y - box_height/2) < (mouseY)) && ((mouseY) < (player2_box2_centre_y + box_height/2))) {
            fill(player2_piece_color_active); rect(player2_box2_centre_x, player2_box2_centre_y, box_width, box_height); 
            fill("#000000"); textSize(16); text("Vertical", (panel_x_loc + Math.floor((7*panel_width)/10)), player2_offset + 70); 
            player2_using_wall = "V"; console.log(361); 
        
        } else if ( (player2_using_wall==="V") && 
                    ((player2_box2_centre_x - box_width/2) < (mouseX)) && ((mouseX) < (player2_box2_centre_x + box_width/2)) && 
                    ((player2_box2_centre_y - box_height/2) < (mouseY)) && ((mouseY) < (player2_box2_centre_y + box_height/2))) {
            draw_Panel(); draw_Text("#FFFFFF"); 
            player2_using_wall = "N"; console.log(362); 
        } 

        if(         (!weapon_active) && (player_turn===2) && (player2_rem_hammers>0) && 
                    ((player2_box3_centre_x - box_width/2) < (mouseX)) && ((mouseX) < (player2_box3_centre_x + box_width/2)) && 
                    ((player2_box3_centre_y - box_height/2) < (mouseY)) && ((mouseY) < (player2_box3_centre_y + box_height/2))) {
            fill(player2_piece_color_active); rect(player2_box3_centre_x, player2_box3_centre_y, box_width, box_height); 
            fill("#000000"); textSize(16); text("Horizontal", (panel_x_loc + Math.floor((3*panel_width)/10)), player2_offset + 140); 
            player2_using_hammer = "H"; console.log(371); 
        
        } else if ( (player2_using_hammer==="H") && 
                    ((player2_box3_centre_x - box_width/2) < (mouseX)) && ((mouseX) < (player2_box3_centre_x + box_width/2)) && 
                    ((player2_box3_centre_y - box_height/2) < (mouseY)) && ((mouseY) < (player2_box3_centre_y + box_height/2))) {
            draw_Panel(); draw_Text("#FFFFFF"); 
            player2_using_hammer = "N"; console.log(372); 
        }

        if(         (!weapon_active) && (player_turn===2) && (player2_rem_hammers>0) && 
                    ((player2_box4_centre_x - box_width/2) < (mouseX)) && ((mouseX) < (player2_box4_centre_x + box_width/2)) && 
                    ((player2_box4_centre_y - box_height/2) < (mouseY)) && ((mouseY) < (player2_box4_centre_y + box_height/2))) {
            fill(player2_piece_color_active); rect(player2_box4_centre_x, player2_box4_centre_y, box_width, box_height); 
            fill("#000000"); textSize(16); text("Vertical", (panel_x_loc + Math.floor((7*panel_width)/10)), player2_offset + 140); 
            player2_using_hammer = "V"; console.log(381); 
        
        } else if ( (player2_using_hammer==="V") && 
                    ((player2_box4_centre_x - box_width/2) < (mouseX)) && ((mouseX) < (player2_box4_centre_x + box_width/2)) && 
                    ((player2_box4_centre_y - box_height/2) < (mouseY)) && ((mouseY) < (player2_box4_centre_y + box_height/2))) {
            draw_Panel(); draw_Text("#FFFFFF"); 
            player2_using_hammer = "N"; console.log(382); 
        }
        }
        rectMode(CORNER); 
    }
}
