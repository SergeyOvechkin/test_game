//отображает сцену
function drawScene(img){
	ctx.drawImage(img, (max_width - main_width)/2, 0, main_width, main_height, 0, 0, main_width/proportion_x, main_height/proportion_y);		
}

//рисует экран в конечной сцене;
function drawEndScreene(){
	 ctx.globalAlpha = 0.5;
	 ctx.fillStyle = "black";	 
	 var phraseArray = getLines(ctx, sprites.dialog_3.text, sprites.dialog_3.dWidth);	 
	 var y1 = sprites.dialog_3.dy-sprites.dialog_3.lineHeight*1.25;
	 var y2 = (phraseArray.length+1)*sprites.dialog_3.lineHeight;
	 var ellowLineHeight = sprites.dialog_3.lineHeight*0.15;	 
	 ctx.fillRect(0, y1 , canvas_width , y2);
	 ctx.globalAlpha = 1.0;
	 ctx.fillStyle = "#f4d846";
	 ctx.fillRect(0, y1, canvas_width , ellowLineHeight);
	 ctx.fillRect(0, (y1+y2)-ellowLineHeight, canvas_width , ellowLineHeight);						
}

//рисует все объекты на сцене;
function drawAll(){	
	drawScene(img_interior_1);
	
	if(curentScene  == 1){		
		sprites.layer565.render(); sprites.dialog.render(); sprites.dialog_1.render();		
	}
	if(curentScene  == 2 || curentScene  == 2.3 || curentScene  == 2.5){ 		
		sprites.option_panel_all.render();		
		sprites.option_panel_center.render();		
		sprites.option_panel_green.render();			
		sprites.option_panel_beds.render();		
		sprites.option_bed_2.render();				
        sprites.line_bed.render();			
		sprites.bed_interior.render();

	    sprites.black_screen.render();
        sprites.hend.render();									
	}
	if(curentScene  == 3 ||  curentScene  == 3.5){ 
			
		sprites.line_tabble.render();
		sprites.option_panel_all.render();
		
		sprites.option_panel_center.render();
		sprites.option_panel_green.render();	
		
		sprites.option_panel_tabbles.render();
		if(curentScene  == 3.5){
			sprites["option_tabble_"+variant_tabble].render();
			
			sprites["side_tabble_right_"+variant_tabble].render();			
		}
		sprites.bed_interior.render();
		if(curentScene  == 3.5)sprites["side_tabble_left_"+variant_tabble].render();
		sprites.hend.render();	
	}
	if(curentScene  == 4 ||  curentScene  == 4.5 ){ 
	
		sprites.line_wall_art.render();
		sprites.option_panel_all.render();
		
		sprites.option_panel_center.render();
		sprites.option_panel_green.render();	
		
		sprites.option_panel_arts.render();
		
		sprites["side_tabble_right_"+variant_tabble].render();	
		
		if(curentScene  == 4.5){
			sprites["option_art_"+variant_art].render();	
            sprites["wall_art_interior_"+variant_art].render();			
		}
		sprites.bed_interior.render();
		sprites["side_tabble_left_"+variant_tabble].render();
		sprites.hend.render();	
		
		sprites.layer565.render();
		sprites.dialog.render();
		sprites.dialog_2.render();
	
	}
	if(curentScene  == 5 ||  curentScene  == 5.5){  
	
		drawScene(img_interior_2);	
		drawEndScreene();
        sprites.dialog_3.render();	      		
	}
    
	if(showStars)drawStars();
	
	sprites.game_logo.render();
    sprites.button.render();	
}

///выполняет последовательно массив с анимациями в цикле
function animation_order(){
	
	var counter = {count: 0, isEnd: false};

	return function(arr_width_func){
		
		if(arr_width_func == "isEnd")return counter.isEnd;

        if(typeof arr_width_func[Math.floor(counter.count)] == "undefined")return;
		
	    for(var i=0; i<arr_width_func.length; i++){
			
			if(Array.isArray(arr_width_func[i][0])){
					
                  if(i == Math.floor(counter.count)){
					  
					for(var j=0; j<arr_width_func[i].length; j++){
					 if(typeof arr_width_func[i][j] == "text"){						 
						var funcName =  arr_width_func[i][j].shift();
						arr_width_func[i][j].push(counter);
						anim_obj[funcName].apply(null, arr_width_func[i][j]);					
					 }else{						 
						var sprite_and_fn =  arr_width_func[i][j].splice(0, 2);					
						arr_width_func[i][j].push(counter)	           
						sprite_and_fn[0][sprite_and_fn[1]].apply(sprite_and_fn[0], arr_width_func[i][j]);				 						 
					 }	
					}
				  }					
			}else{
				if(i == Math.floor(counter.count)){					
					
					if(typeof arr_width_func[i] == "text"){
						var funcName =  arr_width_func[i].shift();
						arr_width_func[i].push(counter);
						anim_obj[funcName].apply(null, arr_width_func[i]);						
					}else{
						var sprite_and_fn =  arr_width_func[i].splice(0, 2);					
						arr_width_func[i].push(counter)	           
						sprite_and_fn[0][sprite_and_fn[1]].apply(sprite_and_fn[0], arr_width_func[i]);
					}					
				}
			}
	  }			
	}	
}


///разбивает строку текста на несколько если она не помещается в указанный максимальный размер
function getLines(ctx, text, maxWidth) {
    var words = text.split(" ");
    var lines = [];
    var currentLine = words[0];

    for (var i = 1; i < words.length; i++) {
        var word = words[i];
        var width = ctx.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
}

function createStars(radius){
	
	if(!radius)radius = 400;
			
	for(var i=0; i<12; i++){
	    
		var fi = (i)*(Math.PI*2)/12;
		
		var x_ = radius*Math.cos(fi);
		var y_ = radius*Math.sin(fi);
		
		var dx = canvas_width/2 - radius*Math.cos(fi)/proportion_x;  
		var dy = canvas_height/2 - radius*Math.sin(fi)/proportion_y;
		
		stars.push({ fi: fi, radius: radius, rotate: 35, opacity: 0.1, dx: dx, dy: dy})	
	}		
}

function rotateStar_1(stepTime, speed){
	
	for(var i=0; i< stars.length; i++){
		
		stars[i].rotate += 360/(speed/stepTime);		
			
		if(stars[i].rotate > 360)stars[i].rotate = stars[i].rotate - 360;
			
	}	
}
function rotateStarAll(stepTime, speed){
	
	for(var i=0; i< stars.length; i++){
				
		stars[i].fi += 360/(speed/stepTime);		
	
		if(stars[i].fi > 360)stars[i].fi = stars[i].fi - 360;		
	}	
}

function fadeInStars(stepTime, speed){
	
	for(var i=0; i< stars.length; i++){
		//console.log(stars[i].opacity);
		if(stars[i].opacity >= 1 ){
			
			continue;
		}
		
		stars[i].opacity += 1/(speed/stepTime);
	}	
}

function moveStars(stepTime, speed){
	
	for(var i=0; i< stars.length; i++){
	
		if(stars[i].radius >= main_height ){
			
			stars.splice(i, 1);
			
			continue;
			
		}		
		stars[i].radius += main_height/(speed/stepTime);
	}	
}
function drawStars(){
	 //console.log("1");
	for (var i=0; i<stars.length; i++){
        ctx.globalAlpha = stars[i].opacity;	
		
		var dx_ = canvas_width/2 - stars[i].radius*Math.cos(stars[i].fi)/proportion_x;  
		var dy_ = canvas_height/2 - stars[i].radius*Math.sin(stars[i].fi)/proportion_y;
	//	console.log(dx_, dy_)
       		
		ctx.translate(dx_, dy_);		
		ctx.rotate(stars[i].rotate * Math.PI / 180);		
		ctx.translate(-dx_, -dy_);	
		
		drawStar(dx_, dy_ , 4, 20/proportion_y, 7/proportion_y);
		
	    ctx.translate(dx_, dy_);		
    	ctx.rotate(-(stars[i].rotate * Math.PI / 180));
		ctx.translate(-dx_, -dy_);
		ctx.globalAlpha =  1.0;
	}	
}
function drawStar(cx,cy,spikes,outerRadius,innerRadius){
      var rot=Math.PI/2*3;
      var x=cx;
      var y=cy;
      var step=Math.PI/spikes;

      ctx.beginPath();
      ctx.moveTo(cx,cy-outerRadius)
      for(i=0;i<spikes;i++){
        x=cx+Math.cos(rot)*outerRadius;
        y=cy+Math.sin(rot)*outerRadius;
        ctx.lineTo(x,y)
        rot+=step

        x=cx+Math.cos(rot)*innerRadius;
        y=cy+Math.sin(rot)*innerRadius;
        ctx.lineTo(x,y)
        rot+=step
      }
      ctx.lineTo(cx,cy-outerRadius);
      ctx.closePath();
      ctx.lineWidth=5;
      ctx.strokeStyle="#f4d846";
      ctx.stroke();
      ctx.fillStyle='yellow';
      ctx.fill();
    }