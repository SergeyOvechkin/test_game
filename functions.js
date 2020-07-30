//отображает сцену
function drawScene(img){
	ctx.drawImage(img, (max_width - main_width)/2, 0, main_width, main_height, 0, 0, main_width/proportion_x, main_height/proportion_y);		
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