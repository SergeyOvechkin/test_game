var img_interior_1 = new Image();
var img_interior_2 = new Image();
var img_sprite_lines = new Image();
var img_sprite_interior = new Image();
var img_hend = new Image();

img_interior_1.src = "./images/interior.png";
img_interior_2.src = "./images/interior_2.png";
img_sprite_lines.src = "./images/sprite_lines-min.png";
img_sprite_interior.src = "./images/sprite_interior-min.png";
img_hend.src = "./images/hend_3.png";

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//определяем ширину и высоту холста
var canvas_width = canvas.clientWidth;
var canvas_height = canvas.clientHeight;

if(canvas_width > canvas_height){	
	canvas.setAttribute('style', "width:"+canvas_height+"px;");
	canvas_width = canvas_height;
}

canvas.height = canvas_height;  var main_height = 1920; //высота изображения
canvas.width = canvas_width;    var main_width = canvas_width*main_height/canvas_height; //ширина изображения определяется по пропорции
                                var max_width = 1920; //максимально допустимая ширина изображения

//пропорция 
proportion_x =  main_width / canvas_width;
proportion_y =  main_height / canvas_height ;

//объекты сообщений
var decs_text_objects = {
	//Metropolis-ExtraBold
	dialog_1: {		
		x_1: 0,	x_2: 650, y_1: 0, y_2: 400, top: 730, cetnre: 2000, /*-157*/ color: "black",
		text: "Please help as width our bedroom interior", font: "bold "+60/proportion_y+"px  Verdana", lineHeight: 100/proportion_y, },
	dialog_2: {		
		x_1: 0,	x_2: 550, y_1: 0, y_2: 400, top: 700, cetnre: 2000, /*-157*/ color: "black",
		text: "    Cool!     You're born to be a designer", font: "bold "+ 60/proportion_y+"px  Verdana", lineHeight: 100/proportion_y, },
	dialog_3: {
		x_1: 0,	x_2: main_width*0.8, y_1: 0, y_2: 400, top: 950, cetnre: 0, color: "white",
		text: "Jumpstart your designer career right now!", font: "bold "+ 95/proportion_y+"px  Verdana", lineHeight: 120/proportion_y,}	
}

var sprites = {};

createSprites(sprites, img_sprite_lines, desc_sprite_lines, "common");
createSprites(sprites, img_sprite_interior, desc_sprite_interior, "common");
createSprites(sprites, null, decs_text_objects, "text");
sprites.black_screen = new SpriteBalckScreen(rest_objects.black_screen);
sprites.hend = new SpriteImg(img_hend, rest_objects.hend);

var stars = [];
createStars();

///переменные главного цикла
var oldTime = null;//время предыдущего цикла
var curentScene  =1;//2.3; //текущая сцена
var inaction = 2000; //флаг бездействия - включение повторяющихся анимаций 
var inactionCounter = 2000;
var variant_tabble = 1; //вариант стола
var variant_art = 1;
var showStars = false;



var animation_order_button_pulsation = animation_order(); ///запускает анимации в порядке для масштабирования кнопки
var animation_order_scene_1 = animation_order(); ///запускает анимации в порядке для 1 сцены
var animation_order_lines = animation_order();
var animation_order_scene_2 = animation_order();
var animation_order_hend = animation_order();
var animation_order_scene_3 = animation_order();
var animation_order_scene_3_5 = animation_order();
var animation_order_scene_4 = animation_order();
var animation_order_scene_4_5 = animation_order();


//основной цикл игры 
function mainСycle(timestamp){
	if(oldTime == null)oldTime = timestamp;
	var stepTime = timestamp - oldTime;

	if (stepTime > 25) { //обновляем экран 40 раз в секунду (1000/25)
		oldTime = timestamp;
	    inactionCounter += stepTime;
	
///////////////пульсация кнопки ///			
		animation_order_button_pulsation([
			[sprites.button, "anim_scale", "big", 1.1, 800, stepTime, function(counter){ counter.count = 1; }],
			[sprites.button, "anim_scale", "little", 1.1, 1000, stepTime, function(counter){ counter.count = 2; }],
			[sprites.button, "anim_wait", 2500, stepTime, function(counter){ counter.count = 0; }],		
		]);
      if(curentScene  == 1){
           animation_order_scene_1([
		   
		          [sprites.layer565, "anim_wait" , 500, stepTime, (counter)=>{  counter.count = 1; }],
				  [sprites.layer565, "anim_move", 627, 912, 1000, stepTime, function(counter){ counter.count = 2; }],
				  [ ///запускает две анимации пралельно
				    [sprites.dialog, "anim_move", 183, 597, 720, stepTime, function(counter){ counter.count += 1; }],
					[sprites.dialog_1, "anim_move", -157, 730, 700, stepTime, function(counter){ counter.count += 0.51; }],
				  ], 
                  [sprites.layer565, 'anim_wait', 3000, stepTime, function(counter){ counter.count = 4;  }],
				  [///запускаем три анимации паралельно
				    [sprites.dialog_1, "anim_move", 1700, 730, 1800, stepTime, function(counter){ counter.count += 0.34; }],
					[sprites.dialog, "anim_move", 1800, 597, 1600, stepTime, function(counter){ counter.count += 0.5 }],
					[sprites.layer565, "anim_move", 1750, 912, 1000, stepTime, function(counter){ counter.count += 0.5 }],
				  ],
				  [sprites.layer565, "anim_wait", 200, stepTime, function(counter){ counter.count = 6;  curentScene = 2; }],       			  
		   ]);
	  }
	  /////////////////////////////////Сцена 2////////////////////////////////////////////////////////////////
      if(Math.floor(curentScene)  == 2){
		  
		  if(inactionCounter > inaction || animation_order_lines("isEnd") == "bed_line_" ){
			 // console.log(sprites.line_bed);
			animation_order_lines([
				[sprites.line_bed, "anim_opacity", 500, 0.2,  stepTime,  function(counter){  counter.count = 1; counter.isEnd = "bed_line_";  }],		 
				[sprites.line_bed, "anim_opacity", 500, 1.0,  stepTime,  function(counter){  counter.count = 2; }],	
				[sprites.line_bed, "anim_opacity", 500, 0.2,  stepTime,  function(counter){  counter.count = 3; }],	
				[sprites.line_bed, "anim_opacity", 500, 1.0, stepTime,  function(counter){ counter.count = 4; } ],
				[sprites.line_bed, "anim_wait", 3000, stepTime, function(counter){ counter.count = 0; counter.isEnd = "bed_line";  } ],			 
			]);  			  
		  }
		  if( curentScene == 2){
           animation_order_scene_2([
			[sprites.option_panel_all, "anim_wait", 4000, stepTime, function(counter){ sprites.option_panel_all.show = true; sprites.option_panel_beds.show = true; counter.count = 1; }],
			[sprites.option_panel_all, "anim_opacity", 500,  1.0, stepTime,  function(counter){  sprites.black_screen.show = true; counter.count = 2; }],
			[sprites.black_screen, "anim_opacity", 500, 0.5,  stepTime,  function(counter){ sprites.hend.show = true;  counter.count = 3; }],
			[sprites.hend, "anim_move", 120, 600, 1500, stepTime, function(counter){ counter.count = 4; sprites.option_panel_center.show = true;}],
			[sprites.option_panel_center, "anim_scale", "little", 1.02, 100, stepTime, function(counter){  counter.count = 5; sprites.option_panel_center.show = false;}],
			[sprites.option_panel_center, "anim_scale", "big", 1.02, 100, stepTime, function(counter){ counter.count = 6; }],
			[sprites.option_panel_all, "anim_wait", 300, stepTime, function(counter){  counter.count = 7; }],
			[sprites.hend, "anim_move", -1000, 1000, 500, stepTime, function(counter){  counter.count = 8; }],
			[sprites.option_panel_all, "anim_wait", 500, stepTime, function(counter){  counter.count = 0;  curentScene = 2.3 }],
		   ]);
		   
	     }else if( curentScene == 2.3 && inactionCounter > inaction ||  curentScene == 2.5 && animation_order_hend("isEnd") == "2.3_" ){	 
			 animation_order_hend([ 
			    [sprites.option_panel_center, "anim_wait", 3000, stepTime, function(counter){ counter.count = 1; counter.isEnd = "2.3_";  }],
				[sprites.hend, "anim_move", 120, 600, 1500, stepTime, function(counter){ counter.count = 2; sprites.option_panel_center.show = true;}],
				[sprites.option_panel_center, "anim_scale", "little", 1.02, 100, stepTime, function(counter){  counter.count = 3; sprites.option_panel_center.show = false;}],
				[sprites.option_panel_center, "anim_scale", "big", 1.02, 100, stepTime, function(counter){ counter.count = 4; }],
				[sprites.option_panel_center, "anim_wait", 300, stepTime, function(counter){  counter.count = 5; }],
				[sprites.hend, "anim_move", -1000, 1000, 500, stepTime, function(counter){ counter.count = 0; counter.isEnd = "2.3"; }],
							 
			 ])
		 }else if( curentScene == 2.5 ){
			 animation_order_scene_2([ 
				[
				  [sprites.black_screen, "anim_opacity", 500, 0.0,  stepTime,  function(counter){ 
				    sprites.hend.show = false; sprites.black_screen.show = false; sprites.option_bed_2.show = true;  
					sprites.option_panel_beds.show = false;  counter.count += 0.51; 
					sprites.option_panel_all.show = false;
					sprites.option_panel_green.show = true;
				  }],
				  [sprites.option_panel_all, "anim_opacity", 500,  0.0, stepTime,  function(counter){   counter.count += 0.5; }],
				],
		        [sprites.option_panel_green, "anim_opacity", 300, 0.0, stepTime, function(counter){   counter.count = 2; }],
				[sprites.option_panel_green, "anim_opacity", 300, 1.0, stepTime, function(counter){   counter.count = 3; }],
				[sprites.option_panel_green, "anim_opacity", 300, 0.0, stepTime, function(counter){   counter.count = 4; }],
				[sprites.option_panel_green, "anim_opacity", 300, 1.0, stepTime, function(counter){   counter.count = 5; sprites.bed_interior.show =true; }],
				[
					[sprites.option_panel_green, "anim_scale",  "big", 1.2, 800, stepTime, function(counter){ counter.count += 0.34;  sprites.option_panel_center.show = false; }],
					[sprites.option_bed_2, "anim_scale",  "big", 1.2, 800, stepTime, function(counter){ counter.count += 0.34; }],					
					[sprites.line_bed, "anim_opacity", 300, 0.0,  stepTime,  function(counter){  counter.count += 0.34; inactionCounter= -5000; }],					
				],
				[sprites.option_panel_green, "anim_wait", 2000, stepTime, function(counter){  counter.count = 7; }],
				[
					[sprites.option_panel_green, "anim_scale",  "little", 1.2, 1000, stepTime, function(counter){ counter.count += 0.251; }],
					[sprites.option_bed_2, "anim_scale",  "little", 1.2, 1000, stepTime, function(counter){ counter.count += 0.251; }],
					[sprites.option_panel_green, "anim_opacity",  300, 0.0, stepTime, function(counter){   counter.count += 0.251;  sprites.option_bed_2.show = false; }],
					[sprites.option_bed_2, "anim_opacity",  300, 0.0, stepTime, function(counter){   counter.count += 0.25; }],
				],
				[sprites.bed_interior, "anim_opacity", 800, 1.0,  stepTime,  function(counter){  counter.count = 9; inactionCounter= -5000;  sprites.option_panel_green.show = false; }],
				[sprites.option_panel_green, "anim_wait", 1000, stepTime, function(counter){  counter.count = 10; curentScene = 3; inactionCounter= -3000; sprites.hend.show = true; }],
			 ]) 
		 }
	  }	
	  ///////////////////////////сцена 3 ///////////////////////////
      if(Math.floor(curentScene)  == 3){ 
			
		 if(curentScene == 3 && inactionCounter > inaction || curentScene == 3.5 && animation_order_lines("isEnd") == "table_line_" ){
			animation_order_lines([
				[sprites.line_tabble, "anim_opacity", 500, 0.2,  stepTime,  function(counter){  counter.count = 1; counter.isEnd = "table_line_";  }],		 
				[sprites.line_tabble, "anim_opacity", 500, 1.0,  stepTime,  function(counter){  counter.count = 2; }],	
				[sprites.line_tabble, "anim_opacity", 500, 0.2,  stepTime,  function(counter){  counter.count = 3; }],	
				[sprites.line_tabble, "anim_opacity", 500, 1.0, stepTime,  function(counter){ counter.count = 4; } ],
				[sprites.line_tabble, "anim_wait", 3000, stepTime, function(counter){ counter.count = 0; counter.isEnd = "table_line";  } ],			 
			]);  			  
		  }
		  if( curentScene == 3 && inactionCounter > inaction || curentScene == 3.5 && animation_order_hend("isEnd") == "hend_" ){
			 animation_order_hend([ 
			    [sprites.option_panel_center, "anim_wait", 3000, stepTime, function(counter){ counter.count = 1; counter.isEnd = "hend_";  }],
				[sprites.hend, "anim_move", 120, 600, 1500, stepTime, function(counter){ counter.count = 2; sprites.option_panel_center.show = true;}],
				[sprites.option_panel_center, "anim_scale", "little", 1.02, 100, stepTime, function(counter){  counter.count = 3; sprites.option_panel_center.show = false;}],
				[sprites.option_panel_center, "anim_scale", "big", 1.02, 100, stepTime, function(counter){ counter.count = 4; }],
				[sprites.option_panel_center, "anim_wait", 300, stepTime, function(counter){  counter.count = 5; }],
				[sprites.hend, "anim_move", -1000, 1000, 500, stepTime, function(counter){  counter.count = 0; counter.isEnd = "hend"; }],
							 
			 ])		   
		  }
		  animation_order_scene_3([
				[sprites.option_panel_all, "anim_wait", 1500, stepTime, function(counter){  counter.count = 1; sprites.option_panel_all.show = true; sprites.option_panel_all.opacity = 0.0;  }],
				[
					[sprites.option_panel_all, "anim_opacity", 500,  1.0 , stepTime,  function(counter){   counter.count += 0.5; }],
					[sprites.option_panel_tabbles,  "anim_opacity", 500, 1.0, stepTime,  function(counter){   counter.count += 0.5; }],
				],	
			]);		
		 if(curentScene == 3.5){
			
			animation_order_scene_3_5([
			    [sprites.option_panel_all, "anim_wait", 500, stepTime, function(counter){ sprites["option_tabble_"+variant_tabble].show = true;
 				  sprites.option_panel_tabbles.show = false; sprites.option_panel_center.show = true; counter.count = 1;
				  sprites.option_panel_green.show = true; }],		    
				[sprites.option_panel_all, "anim_opacity", 500,  0.0, stepTime,  function(counter){   counter.count = 2; sprites.option_panel_all.show = false;  }],
			    [sprites.option_panel_green, "anim_opacity", 300, 1.0, stepTime, function(counter){   counter.count = 3; }],
				[sprites.option_panel_green, "anim_opacity", 300, 0.0, stepTime, function(counter){   counter.count = 4; }],
				[sprites.option_panel_green, "anim_opacity", 300, 1.0, stepTime, function(counter){   counter.count = 5; }],
				[
					[sprites.option_panel_green, "anim_scale",  "big", 1.2, 800, stepTime, function(counter){ counter.count += 0.34;  }],
					[sprites["option_tabble_"+variant_tabble], "anim_scale",  "big", 1.2, 800, stepTime, function(counter){ counter.count += 0.34; }],					
					[sprites.line_tabble,  "anim_opacity", 300, 0.0,  stepTime,  function(counter){  counter.count += 0.34; inactionCounter= -5000; }],					
				],
				[sprites.option_panel_all, "anim_wait", 1000, stepTime, function(counter){  counter.count = 7; sprites.option_panel_center.show = false; }],
				[
					[sprites.option_panel_green, "anim_scale",  "little", 1.2, 1000, stepTime, function(counter){ counter.count += 0.251; }],
					[sprites["option_tabble_"+variant_tabble], "anim_scale",  "little", 1.2, 1000, stepTime, function(counter){ counter.count += 0.251; }],
					[sprites.option_panel_green, "anim_opacity", 300, 0.0, stepTime, function(counter){   counter.count += 0.251;  }],
					[sprites["option_tabble_"+variant_tabble], "anim_opacity", 300, 0.0, stepTime, function(counter){   counter.count += 0.25; }],
				],
				[
					[sprites["side_tabble_right_"+variant_tabble], "anim_opacity", 500, 1.0, stepTime, function(counter){   counter.count += 0.5; }],
					[sprites["side_tabble_left_"+variant_tabble], "anim_opacity", 500, 1.0, stepTime, function(counter){  curentScene = 4; counter.count += 0.5; }],					
				]				
			]);
	     }
      }
	  ///////////////////////////////////сцеа 4 ////////////////////////
      if(Math.floor(curentScene) == 4){ 
		if(curentScene == 4 && inactionCounter > inaction || curentScene == 4.5 && animation_order_lines("isEnd") == "art_line1_" ){
			animation_order_lines([
				[sprites.line_wall_art, "anim_opacity", 500, 0.2,  stepTime,  function(counter){  counter.count = 1; counter.isEnd = "table_line1_";  }],		 
				[sprites.line_wall_art, "anim_opacity", 500, 1.0,  stepTime,  function(counter){  counter.count = 2; }],	
				[sprites.line_wall_art, "anim_opacity", 500, 0.2,  stepTime,  function(counter){  counter.count = 3; }],	
				[sprites.line_wall_art, "anim_opacity", 500, 1.0, stepTime,  function(counter){ counter.count = 4; } ],
				[sprites.line_wall_art, "anim_wait", 3000, stepTime, function(counter){ counter.count = 0; counter.isEnd = "table_line1";  } ],			 
			]); 			  
		  }
		  if(curentScene == 4 && inactionCounter > inaction || curentScene == 4.5 && animation_order_hend("isEnd") == "hend1_" ){
			 animation_order_hend([ 
			    [sprites.option_panel_center, "anim_wait", 3000, stepTime, function(counter){ counter.count = 1; counter.isEnd = "hend1_";  }],
				[sprites.hend, "anim_move", 120, 600, 1500, stepTime, function(counter){ counter.count = 2; sprites.option_panel_center.show = true;}],
				[sprites.option_panel_center, "anim_scale", "little", 1.02, 100, stepTime, function(counter){  counter.count = 3; sprites.option_panel_center.show = false;}],
				[sprites.option_panel_center, "anim_scale", "big", 1.02, 100, stepTime, function(counter){ counter.count = 4; }],
				[sprites.option_panel_center, "anim_wait", 300, stepTime, function(counter){  counter.count = 5; }],
				[sprites.hend, "anim_move", -1000, 1000, 500, stepTime, function(counter){  counter.count = 0; counter.isEnd = "hend1"; }],
							 
			 ])		   
		  }
		  if(curentScene == 4){
			animation_order_scene_4([
				[sprites.option_panel_all, "anim_wait", 1500, stepTime, function(counter){  counter.count = 1; sprites.option_panel_all.show = true; sprites.option_panel_all.opacity = 0.0;  }],
				[
					[sprites.option_panel_all, "anim_opacity", 500,  1.0 , stepTime,  function(counter){   counter.count += 0.5; }],
					[sprites.option_panel_arts,  "anim_opacity", 500, 1.0, stepTime,  function(counter){   counter.count += 0.5; }],
				],	
			]);
		  }		 
	      if(curentScene == 4.5){		
			animation_order_scene_4_5([
			    [sprites.option_panel_all, "anim_wait", 500, stepTime, function(counter){ sprites["option_art_"+variant_art].show = true;
 				  sprites.option_panel_arts.show = false; sprites.option_panel_center.show = true; counter.count = 1;
				  sprites.option_panel_green.show = true; }],		    
				[sprites.option_panel_all, "anim_opacity", 500,  0.0, stepTime,  function(counter){   counter.count = 2; sprites.option_panel_all.show = false;  }],
			    [sprites.option_panel_green, "anim_opacity", 300, 1.0, stepTime, function(counter){   counter.count = 3; }],
				[sprites.option_panel_green, "anim_opacity", 300, 0.0, stepTime, function(counter){   counter.count = 4; }],
				[sprites.option_panel_green, "anim_opacity", 300, 1.0, stepTime, function(counter){   counter.count = 5; }],
				[
					[sprites.option_panel_green, "anim_scale",  "big", 1.2, 800, stepTime, function(counter){ counter.count += 0.34;  }],
					[sprites["option_art_"+variant_art], "anim_scale",  "big", 1.2, 800, stepTime, function(counter){  counter.count += 0.34; }],					
					[sprites.line_wall_art,  "anim_opacity", 300, 0.0,  stepTime,  function(counter){  counter.count += 0.34; inactionCounter= -5000; }],					
				],
				[sprites.option_panel_all, "anim_wait", 1000, stepTime, function(counter){  counter.count = 7; sprites.option_panel_center.show = false; }],
				[
					[sprites.option_panel_green, "anim_scale",  "little", 1.2, 1000, stepTime, function(counter){ counter.count += 0.251; }],
					[sprites["option_art_"+variant_art], "anim_scale",  "little", 1.2, 1000, stepTime, function(counter){ counter.count += 0.251; }],
					[sprites.option_panel_green, "anim_opacity", 300, 0.0, stepTime, function(counter){   counter.count += 0.251;  }],
					[sprites["option_art_"+variant_art], "anim_opacity", 300, 0.0, stepTime, function(counter){   counter.count += 0.25; }],
				],				
				[sprites["wall_art_interior_"+variant_art], "anim_opacity", 500, 1.0, stepTime, function(counter){   counter.count = 9; }],
                [sprites.option_panel_all, "anim_wait", 1500, stepTime, function(counter){  counter.count = 10; showStars = true; }],
				[sprites.option_panel_all, "anim_wait", 1000, stepTime, function(counter){  counter.count = 11; createStars(300);   }],	
				[sprites.option_panel_all, "anim_wait", 1000, stepTime, function(counter){  counter.count = 12; createStars(300);   }],	
				[sprites.option_panel_all, "anim_wait", 1000, stepTime, function(counter){  counter.count = 13; createStars(300);   }],	
				[sprites.layer565, "anim_move", 627, 912, 1000, stepTime, function(counter){ counter.count = 14; }],
				[ ///запускает две анимации пралельно
				    [sprites.dialog, "anim_move",  183, 597, 720, stepTime, function(counter){ counter.count += 0.5; }],
					[sprites.dialog_2, "anim_move", -157, 710, 695, stepTime, function(counter){ counter.count += 0.51; }],
			    ],
                [sprites.option_panel_all, "anim_wait", 2500, stepTime, function(counter){  counter.count = 0; showStars = false; curentScene = 5; }],	

			]);
			if(showStars){
				fadeInStars(stepTime, 500);
				rotateStar_1(stepTime, 3000); 
				moveStars(stepTime, 7000);
				rotateStarAll(stepTime, 25000);
			}
	    }	
	  }
	if(curentScene == 5){	
			animation_order_scene_4_5([
				[
				    [sprites.game_logo, "anim_move", 322, 200, 2000, stepTime, function(counter){ counter.count += 0.51; }],
					[sprites.button, "anim_move", 235, 1530, 2000, stepTime, function(counter){ counter.count += 0.5; }],				
				],
			]);  
	  }	  
        
//////////////////////////	отрисовка всех объектов ///////////	    
        drawAll();
/////////////////////////////////////////////////////////////запус цикла		
	window.requestAnimationFrame(mainСycle);		
    }else{		
		window.requestAnimationFrame(mainСycle);
	}   	
}
//запускает основной цикл
img_sprite_interior.onload = function() {
	window.requestAnimationFrame(mainСycle);
}


//определяет клики по кнопке button (play now)
canvas.onmousedown = function (e) {
	
	inactionCounter = 0;
	
	var bbox = canvas.getBoundingClientRect();
	var x = e.clientX - bbox.left * (canvas.width / bbox.width);
	var y = e.clientY - bbox.top * (canvas.height / bbox.height)
    
    if(x > sprites.button.dx && x < sprites.button.dx+sprites.button.dWidth &&
	   y > sprites.button.dy && y < sprites.button.dy+sprites.button.dHeight){
		   
		   console.log('https://');
	   }

	if(x > sprites.option_panel_center.dx && x < sprites.option_panel_center.dx+sprites.option_panel_center.dWidth &&
	   y > sprites.option_panel_center.dy && y < sprites.option_panel_center.dy+sprites.option_panel_center.dHeight
	   ){		   
			if(curentScene == 3){variant_scene_3(2)}
			if(curentScene == 4){variant_scene_4(2)}
			if(curentScene == 2.3) curentScene = 2.5;
		 
	  }
	  
	  if(x > sprites.option_panel_all.dx && x < sprites.option_panel_all.dx+sprites.option_panel_center.dWidth &&
	   y > sprites.option_panel_all.dy && y < sprites.option_panel_all.dy+sprites.option_panel_all.dHeight
	   ){		   
			if(curentScene == 3){variant_scene_3(1)}
			if(curentScene == 4){variant_scene_4(1)}
          			
	  } 

     if(x > sprites.option_panel_center.dx+sprites.option_panel_center.dWidth+20
 	    && x < sprites.option_panel_center.dx+sprites.option_panel_center.dWidth*2+20 &&
	    y > sprites.option_panel_all.dy && y < sprites.option_panel_all.dy+sprites.option_panel_all.dHeight	    
	   ){
         
          if(curentScene == 3){variant_scene_3(3)}	
          if(curentScene == 4){variant_scene_4(3)}		  
		 
	  }
      
      function variant_scene_3(variant){
		 curentScene = 3.5;
		 variant_tabble = variant;
		  
	  }
	  
      function variant_scene_4(variant){
		 //console.log(variant);
		 curentScene = 4.5;
		 variant_art = variant;
		  
	  }
   	  
};












