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

/*
x_1, y_1 - начальная точка в спрайте
x_2, y_2 - конечная точка в спрайте
top - растояние от верхнего края до размещения спрайта на canvas если его высота = 1920px
centre - растояние от центра до размещения спрайта на canvas
dx, dy - расстояние от от левого края на канвас и от верхнего с учетом масштаба
dWidth, dHeight - размер спрайта на канвас с учетом масштаба

*/
var desc_sprite_lines = {
			
		game_logo: {		
			x_1: 0,	x_2: 636, y_1: 0, y_2: 324, top: 53, cetnre: 322,
		},
		button: {		
			x_1: 636,	x_2: 1106, y_1: 0, y_2: 128, top: 1730/*-63*/, cetnre: 235,
		},
		line_wall_art: {
			
			x_1: 636,	x_2: 1149, y_1: 131, y_2: 438, top: 833, cetnre: 412,
		},
		line_tabble: {
			
			x_1: 0,	x_2: 299, y_1: 326, y_2: 414, top: 1496, cetnre: 550, opacity: 1.0,
		},		
		line_bed: {
			
			x_1: 0,	x_2: 967, y_1: 438, y_2: 735, top: 1400, cetnre: 392, opacity: 1.0,
		},
		dialog: {
			
			x_1: 0,	x_2: 682, y_1: 735, y_2: 1145, top: 597, cetnre: 2000, //183, 
		},		
		layer565: {
			
			x_1: 0,	x_2: 760, y_1: 1148, y_2: 2157, top: 912, cetnre: 1750 ,//627,
		},
		option_panel_all: {
			
			x_1: 0,	x_2: 1016, y_1: 2158, y_2: 2478, top: 468, cetnre: 508, opacity: 0.2, show: false,
		},
		option_panel_green: {
			
			x_1: 687,	x_2: 1004, y_1: 735, y_2: 1058, top: 468, cetnre: 159, show: false,
		},
		option_panel_center: {
			
			x_1: 349,	x_2: 666, y_1: 2158, y_2: 2478, top: 468, cetnre: 159, show: false,
		},		
}

var desc_sprite_interior = {
			
		option_panel_beds: {		
			x_1: 0,	x_2: 958, y_1: 0, y_2: 153, top: 568, cetnre: 475, show: false,
		},
		option_bed_1: {		
			x_1: 0,	x_2: 260, y_1: 0, y_2: 153, top: 568, cetnre: 128,
		},
		option_bed_2: {		
			x_1: 347,	x_2: 603, y_1: 0, y_2: 153, top: 568, cetnre: 128, show: false,
		},
		option_bed_3: {		
			x_1: 700,	x_2: 960, y_1: 0, y_2: 153, top: 568, cetnre: 128,
		},	
/////////////////////////////////////////////////////////////////////		
		option_panel_tabbles: {		
			x_1: 0,	x_2: 875, y_1: 153, y_2: 312, top: 565, cetnre: 436, opacity: 0.0,
		},
		option_tabble_1: {		
			x_1: 0,	x_2: 176, y_1: 153, y_2: 312, top: 565, cetnre: 82, show: false,
		},
		option_tabble_2: {		
			x_1: 355,	x_2: 525, y_1: 153, y_2: 312, top: 565, cetnre: 82, show: false,
		},
		option_tabble_3: {		
			x_1: 706,	x_2: 876, y_1: 153, y_2: 312, top: 565, cetnre: 82, show: false,
		},
/////////////////////////////////////////////////////////////////
		option_panel_arts: {		
			x_1: 0,	x_2: 935, y_1: 312, y_2: 446, top: 569, cetnre: 452, opacity: 0.0,
		},
		option_art_1: {		
			x_1: 0,	x_2: 231, y_1: 312, y_2: 446, top: 569, cetnre: 120, show: false,
		},
		option_art_2: {		
			x_1: 330,	x_2: 567, y_1: 312, y_2: 446, top: 569, cetnre: 120, show: false,
		},
		option_art_3: {		
			x_1: 675,	x_2: 935, y_1: 312, y_2: 446, top: 569, cetnre: 120, show: false,
		},
/////////////////////////////////////////////////////////////////
		wall_art_interior_1: {		
			x_1: 0,	x_2: 437, y_1: 446, y_2: 698, top: 866, cetnre: 376, opacity: 0.0, 
		},
		wall_art_interior_2: {		
			x_1: 447,	x_2: 902, y_1: 446, y_2: 698, top: 866, cetnre: 376, opacity: 0.0, 
		},
		wall_art_interior_3: {		
			x_1: 917,	x_2: 1300, y_1: 446, y_2: 698, top: 866, cetnre: 376, opacity: 0.0, 
		},
/////////////////////////////////////////////////////////////////
		side_tabble_left_1: {		
			x_1: 0,	x_2: 245, y_1: 698, y_2: 905, top: 1362, cetnre: 537, opacity: 0.0, 
		},
		side_tabble_left_2: {		
			x_1: 314,	x_2: 560, y_1: 698, y_2: 905, top: 1362, cetnre: 537, opacity: 0.0, 
		},
		side_tabble_left_3: {		
			x_1: 641,	x_2: 885, y_1: 698, y_2: 905, top: 1362, cetnre: 537, opacity: 0.0, 
		},
/////////////////////////////////////////////////////////////////
		side_tabble_right_1: {		
			x_1: 0,	x_2: 192, y_1: 905, y_2: 1068, top: 1268, cetnre: -82, opacity: 0.0, 
		},
		side_tabble_right_2: {		
			x_1: 234,	x_2: 428, y_1: 905, y_2: 1068, top: 1268, cetnre: -82, opacity: 0.0, 
		},
		side_tabble_right_3: {		
			x_1: 485,	x_2: 678, y_1: 905, y_2: 1068, top: 1268, cetnre: -82, opacity: 0.0, 
		},
/////////////////////////////////////////////////////////////////
		bed_interior: {		
			x_1: 0,	x_2: 918, y_1: 1068, y_2: 1597, top: 1136, cetnre: 367, opacity: 0.0, show: false,
		},		
}
//объекты сообщений
var decs_text_objects = {
	//Metropolis-ExtraBold
	dialog_1: {
		
		x_1: 0,	x_2: 650, y_1: 0, y_2: 400, top: 730, cetnre: 2000, /*-157*/ color: "black",
		text: "Please help as width our bedroom interior", font: "bold "+60/proportion_y+"px  Verdana", lineHeight: 100/proportion_y,
	},
	dialog_2: {
		
		x_1: 0,	x_2: 550, y_1: 0, y_2: 400, top: 700, cetnre: 2000, /*-157*/ color: "black",
		text: "    Cool!     You're born to be a designer", font: "bold "+ 60/proportion_y+"px  Verdana", lineHeight: 100/proportion_y,
	},
	dialog_3: {
		x_1: 0,	x_2: main_width*0.8, y_1: 0, y_2: 400, top: 950, cetnre: 0, color: "white",
		text: "Jumpstart your designer career right now!", font: "bold "+ 95/proportion_y+"px  Verdana", lineHeight: 120/proportion_y,	
		
	}
	
}
var stars = [];

createStars();

///остальные объекты
var rest_objects = {
	
	black_screen: {
		
		opacity: 0.0, show: false,
		
	},
	hend: {
		
		dx: canvas_width/2- -1000/*120*//proportion_x, dy: 1000/*600*//proportion_y, dWidth: 250/proportion_x, dHeight: 500/proportion_y, show: false, centre: 120, top: 600,
	}
	
}
//добавляет позицию на холсте к спрайтам и масштабирует размеры спрайта.
function addCanvasPositionEndSize(sprite){
	
	for(var key in sprite){		
		sprite[key].dx = canvas_width/2 - sprite[key].cetnre/proportion_x;
		sprite[key].dy = sprite[key].top/proportion_y;
		sprite[key].dWidth = (sprite[key].x_2 - sprite[key].x_1)/proportion_x;
		sprite[key].dHeight = (sprite[key].y_2 - sprite[key].y_1)/proportion_y;
	}
	
}
addCanvasPositionEndSize(desc_sprite_interior);
addCanvasPositionEndSize(desc_sprite_lines);
addCanvasPositionEndSize(decs_text_objects);

//отображает сцену
function drawScene(img){
	ctx.drawImage(img, (max_width - main_width)/2, 0, main_width, main_height, 0, 0, main_width/proportion_x, main_height/proportion_y);		
}
//отображает объект из спрайта
function drawObject(img, name_obj, /*scale, pos_x, pos_y */){
	if(name_obj.show != undefined && name_obj.show == false)return;
	if(name_obj.opacity != undefined)ctx.globalAlpha = name_obj.opacity;	
	ctx.drawImage(img, name_obj.x_1, name_obj.y_1, name_obj.x_2 - name_obj.x_1, name_obj.y_2 - name_obj.y_1, name_obj.dx, name_obj.dy, name_obj.dWidth, name_obj.dHeight);		
	if(name_obj.opacity != undefined)ctx.globalAlpha = 1.0;
}
//отображает сообщение на экране
function drawDialogText(text_obj){
	//console.log(text_obj.dx, text_obj.dy)
	ctx.font = text_obj.font;
	ctx.textAlign = "center";
	ctx.fillStyle = text_obj.color;
	var phraseArray = getLines(ctx, text_obj.text, text_obj.dWidth);		
	for (var i = 0; i<phraseArray.length; i++){		
		ctx.fillText(phraseArray[i], text_obj.dx,  text_obj.dy + (text_obj.lineHeight)*i );		
	}	
}
//рисует экран в конечной сцене;
function drawEndScreene(){
	 ctx.globalAlpha = 0.5;
	 ctx.fillStyle = "black";	 
	 var phraseArray = getLines(ctx, decs_text_objects.dialog_3.text, decs_text_objects.dialog_3.dWidth);	 
	 var y1 = decs_text_objects.dialog_3.dy-decs_text_objects.dialog_3.lineHeight*1.25;
	 var y2 = (phraseArray.length+1)*decs_text_objects.dialog_3.lineHeight;
	 var ellowLineHeight = decs_text_objects.dialog_3.lineHeight*0.15;	 
	 ctx.fillRect(0, y1 , canvas_width , y2);
	 ctx.globalAlpha = 1.0;
	 ctx.fillStyle = "#f4d846";
	 ctx.fillRect(0, y1, canvas_width , ellowLineHeight);
	 ctx.fillRect(0, (y1+y2)-ellowLineHeight, canvas_width , ellowLineHeight);						
}
	
//рисует руку
function drawHend(){
    if(rest_objects.hend.show != undefined && rest_objects.hend.show == false)return;	
	ctx.drawImage(img_hend, rest_objects.hend.dx, rest_objects.hend.dy, rest_objects.hend.dWidth, rest_objects.hend.dHeight);	
}

var anim_obj = {
	//button_play: animationScale(1.2, 800, 1000, 2500,  desc_sprite_lines.button), //пульсация кнопки
	
	button_play_scale: animationScale_1(desc_sprite_lines.button),
	button_play_scale_2: animationScale_1(desc_sprite_lines.button),
	button_play_scale_wait: animationWait(),
	
	
	piples: animationMove(desc_sprite_lines.layer565),
    dialog: animationMove(desc_sprite_lines.dialog),
    dialog_text_1: animationMove(decs_text_objects.dialog_1),
	dialog_text_2: animationMove(decs_text_objects.dialog_2),
	
	bed_line: animationOpacity(desc_sprite_lines.line_bed),	 //анимация линии кровати
	wait_bed_line: animationWait(), //ждет время внутри цикла для анимации линии кровати
	
	tabble_line: animationOpacity(desc_sprite_lines.line_tabble),	 
	wait_tabble_line: animationWait(),
	
	option_panel_all: animationOpacity(desc_sprite_lines.option_panel_all), //анимация появления панели выбора ворианотв
	black_screen: animationOpacity(rest_objects.black_screen), //анимация появления черного экрана
	hend_move: animationMove(rest_objects.hend),///анимация движение руки
	wait: animationWait(), //ждет время внутри цикла
	
	opacity_gren_centre: animationOpacity(desc_sprite_lines.option_panel_green),
	scale_gren_centre: animationScale_1(desc_sprite_lines.option_panel_green),
	
	scale_center_panel: animationScale_1(desc_sprite_lines.option_panel_center), //анимация центрального квадрата выбора
	scale_option_bed_2: animationScale_1(desc_sprite_interior.option_bed_2),
	opacity_option_bed_2: animationOpacity(desc_sprite_interior.option_bed_2),
	
	opacity_bed_main: animationOpacity(desc_sprite_interior.bed_interior),
	
	opacity_option_panel_tabbles: animationOpacity(desc_sprite_interior.option_panel_tabbles),
	
	scale_option_sentre_tabble: false, 
	opacity_option_sentre_tabble: false,
    opacity_tabble_left: false,
	opacity_tabble_right: false,
	
	
	art_line: animationOpacity(desc_sprite_lines.line_wall_art),
	wait_art_line: animationWait(),
	opacity_option_panel_arts:  animationOpacity(desc_sprite_interior.option_panel_arts),
	scale_option_sentre_art: false,
	opacity_option_sentre_art:  false,		 
	opacity_art: false,
	
	move_button: animationMove(desc_sprite_lines.button),
	move_logo: animationMove(desc_sprite_lines.game_logo),
	
};



var animation_order_scene_1 = animation_order(anim_obj); ///запускает анимации в порядке для первой сцены
var animation_order_scene_2 = animation_order(anim_obj); ///запускает анимации в порядке 
var animation_order_scene_3 = animation_order(anim_obj); ///запускает анимации в порядке
var animation_order_scene_3_5 = animation_order(anim_obj);
var animation_order_scene_4 = animation_order(anim_obj); ///запускает анимации в порядке
var animation_order_scene_4_5 = animation_order(anim_obj);

var animation_order_lines = animation_order(anim_obj); ///запускает анимации для желтых линий разметки интерера
var animation_order_button_pulsation = animation_order(anim_obj); ///запускает анимации в порядке
var animation_order_hend = animation_order(anim_obj);

///переменные главного цикла
var oldTime = null;//время предыдущего цикла
var curentScene  =1;//2.3; //текущая сцена
var inaction = 2000; //флаг бездействия - включение повторяющихся анимаций 
var inactionCounter = 2000;
var variant_tabble = 1; //вариант стола
var variant_art = 1;
var showStars = false;

//основной цикл игры 
function mainСycle(timestamp){
	if(oldTime == null)oldTime = timestamp;
	var stepTime = timestamp - oldTime;

	if (stepTime > 25) { //обновляем экран 40 раз в секунду (1000/25)
		oldTime = timestamp;
	    inactionCounter += stepTime;
	
///////////////пульсация кнопки ///			
		animation_order_button_pulsation([
			["button_play_scale", "big", 1.1, 800, stepTime, function(counter){ counter.count = 1; }],
			["button_play_scale", "little", 1.1, 1000, stepTime, function(counter){ counter.count = 2; }],
			['button_play_scale_wait', 2500, stepTime, function(counter){ counter.count = 0; }],
		
		]);
        
        		
//////////////////////////////////////сцена 1 - анимация людей ////////////
      if(curentScene  == 1){
           animation_order_scene_1([
		   
		          ["wait" , 500, stepTime, function(counter){  counter.count = 1; }],
				  ["piples", 627, 912, 1000, stepTime, function(counter){ counter.count = 2; }],
				  [ ///запускает две анимации пралельно
				    ["dialog", 183, 597, 720, stepTime, function(counter){ counter.count += 0.5; }],
					["dialog_text_1", -157, 730, 700, stepTime, function(counter){ counter.count += 0.51; }],
				  ], 
                  ['wait', 3000, stepTime, function(counter){ counter.count = 4;  }],
				  [///запускаем три анимации паралельно
					["dialog_text_1", 1700, 730, 1800, stepTime, function(counter){ counter.count += 0.34; }],
					["dialog", 1800, 597, 1600, stepTime, function(counter){ counter.count += 0.34 }],
					["piples", 1750, 912, 1000, stepTime, function(counter){ counter.count += 0.34 }],
				  ],
				  ['wait', 200, stepTime, function(counter){ counter.count = 6;  curentScene = 2; }],       			  
		   ]);
	  }
	  /////////////////////////////////Сцена 2////////////////////////////////////////////////////////////////
      if(Math.floor(curentScene)  == 2){
		  
		  if(inactionCounter > inaction || animation_order_lines("isEnd") == "bed_line_" ){
			animation_order_lines([
				["bed_line", 500, 0.2,  stepTime,  function(counter){  counter.count = 1; counter.isEnd = "bed_line_";  }],		 
				["bed_line", 500, 1.0,  stepTime,  function(counter){  counter.count = 2; }],	
				["bed_line", 500, 0.2,  stepTime,  function(counter){  counter.count = 3; }],	
				["bed_line", 500, 1.0, stepTime,  function(counter){ counter.count = 4; } ],
				["wait_bed_line", 3000, stepTime, function(counter){ counter.count = 0; counter.isEnd = "bed_line";  } ],			 
			]);  			  
		  }
		  if( curentScene == 2){
           animation_order_scene_2([
			["wait", 4000, stepTime, function(counter){ desc_sprite_lines.option_panel_all.show = true; desc_sprite_interior.option_panel_beds.show = true; counter.count = 1; }],
			["option_panel_all", 500,  1.0, stepTime,  function(counter){  rest_objects.black_screen.show = true; counter.count = 2; }],
			["black_screen", 500, 0.5,  stepTime,  function(counter){ rest_objects.hend.show = true;  counter.count = 3; }],
			["hend_move", 120, 600, 1500, stepTime, function(counter){ counter.count = 4; desc_sprite_lines.option_panel_center.show = true;}],
			["scale_center_panel", "little", 1.02, 100, stepTime, function(counter){  counter.count = 5; desc_sprite_lines.option_panel_center.show = false;}],
			["scale_center_panel", "big", 1.02, 100, stepTime, function(counter){ counter.count = 6; }],
			["wait", 300, stepTime, function(counter){  counter.count = 7; }],
			["hend_move", -1000, 1000, 500, stepTime, function(counter){  counter.count = 8; }],
			["wait", 3000, stepTime, function(counter){  counter.count = 9; }],
			["hend_move", 121, 600, 1500, stepTime, function(counter){ desc_sprite_lines.option_panel_center.show = true; counter.count = 10; }],
	        ["scale_center_panel", "little", 1.02, 100, stepTime, function(counter){  counter.count = 11; desc_sprite_lines.option_panel_center.show = false;}], 
			["scale_center_panel", "big", 1.02, 100, stepTime, function(counter){ counter.count = 12; }],
			["wait", 300, stepTime, function(counter){  counter.count = 13; }],
			["hend_move", -1000, 1000, 500, stepTime, function(counter){ counter.count = 14;  }],
			["wait", 100, stepTime, function(counter){ counter.count = 0;  curentScene = 2.3 }],
		   ]);
		   
	     }else if( curentScene == 2.3 && inactionCounter > inaction || curentScene == 2.3 && animation_order_scene_2("isEnd")=="2.3_" || curentScene == 2.5 && animation_order_scene_2("isEnd") == "2.3_" ){	 
			 animation_order_scene_2([ 
			    ["wait", 3000, stepTime, function(counter){ counter.count = 1; counter.isEnd = "2.3_";  }],
				["hend_move", 120, 600, 1500, stepTime, function(counter){ counter.count = 2; desc_sprite_lines.option_panel_center.show = true;}],
				["scale_center_panel", "little", 1.02, 100, stepTime, function(counter){  counter.count = 3; desc_sprite_lines.option_panel_center.show = false;}],
				["scale_center_panel", "big", 1.02, 100, stepTime, function(counter){ counter.count = 4; }],
				["wait", 300, stepTime, function(counter){  counter.count = 5; }],
				["hend_move", -1000, 1000, 500, stepTime, function(counter){ desc_sprite_lines.option_panel_center.show = false; counter.count = 0; counter.isEnd = "2.3"; }],
							 
			 ])
		 }else if( curentScene == 2.5 ){
			 animation_order_scene_2([ 
				[
				  ["black_screen", 500, 0.0,  stepTime,  function(counter){ 
				    rest_objects.hend.show = false; rest_objects.black_screen.show = false; desc_sprite_interior.option_bed_2.show = true;  
					desc_sprite_interior.option_panel_beds.show = false;  counter.count += 0.51; 
					desc_sprite_lines.option_panel_all.show = false;
					desc_sprite_lines.option_panel_green.show = true;
				  }],
				  ["option_panel_all", 500,  0.0, stepTime,  function(counter){   counter.count += 0.5; }],
				],
		        ["opacity_gren_centre", 300, 0.0, stepTime, function(counter){   counter.count = 2; }],
				["opacity_gren_centre", 300, 1.0, stepTime, function(counter){   counter.count = 3; }],
				["opacity_gren_centre", 300, 0.0, stepTime, function(counter){   counter.count = 4; }],
				["opacity_gren_centre", 300, 1.0, stepTime, function(counter){   counter.count = 5; desc_sprite_interior.bed_interior.show =true; }],
				[
					["scale_gren_centre",  "big", 1.2, 800, stepTime, function(counter){ counter.count += 0.34;  desc_sprite_lines.option_panel_center.show = false; }],
					["scale_option_bed_2",  "big", 1.2, 800, stepTime, function(counter){ counter.count += 0.34; }],					
					["bed_line", 300, 0.0,  stepTime,  function(counter){  counter.count += 0.34; inactionCounter= -5000; }],					
				],
				["wait", 2000, stepTime, function(counter){  counter.count = 7; }],
				[
					["scale_gren_centre",  "little", 1.2, 1000, stepTime, function(counter){ counter.count += 0.251; }],
					["scale_option_bed_2",  "little", 1.2, 1000, stepTime, function(counter){ counter.count += 0.251; }],
					["opacity_gren_centre", 300, 0.0, stepTime, function(counter){   counter.count += 0.251;  desc_sprite_interior.option_bed_2.show = false; }],
					["opacity_option_bed_2", 300, 0.0, stepTime, function(counter){   counter.count += 0.25; }],
				],
				["opacity_bed_main", 800, 1.0,  stepTime,  function(counter){  counter.count = 9; inactionCounter= -5000;  desc_sprite_lines.option_panel_green.show = false; }],
				["wait", 1000, stepTime, function(counter){  counter.count = 10; curentScene = 3; inactionCounter= -3000; rest_objects.hend.show = true; }],
			 ]) 
		 }
	  }	
	  ///////////////////////////сцена 3 ///////////////////////////
      if(Math.floor(curentScene)  == 3){ 
			
		 if(curentScene == 3 && inactionCounter > inaction || curentScene == 3.5 && animation_order_lines("isEnd") == "table_line_" ){
			animation_order_lines([
				["tabble_line", 500, 0.2,  stepTime,  function(counter){  counter.count = 1; counter.isEnd = "table_line_";  }],		 
				["tabble_line", 500, 1.0,  stepTime,  function(counter){  counter.count = 2; }],	
				["tabble_line", 500, 0.2,  stepTime,  function(counter){  counter.count = 3; }],	
				["tabble_line", 500, 1.0, stepTime,  function(counter){ counter.count = 4; } ],
				["wait_tabble_line", 3000, stepTime, function(counter){ counter.count = 0; counter.isEnd = "table_line";  } ],			 
			]);  			  
		  }
		  if( curentScene == 3 && inactionCounter > inaction || curentScene == 3.5 && animation_order_hend("isEnd") == "hend_" ){
		  	animation_order_hend([ 
			    ["wait", 5000, stepTime, function(counter){ counter.count = 1; counter.isEnd = "hend_";  }],
				["hend_move", 120, 600, 1500, stepTime, function(counter){ counter.count = 2; desc_sprite_lines.option_panel_center.show = true;}],
				["scale_center_panel", "little", 1.02, 100, stepTime, function(counter){  counter.count = 3; desc_sprite_lines.option_panel_center.show = false;}],
				["scale_center_panel", "big", 1.02, 100, stepTime, function(counter){ counter.count = 4; }],
				["wait", 300, stepTime, function(counter){  counter.count = 5; }],
				["hend_move", -1000, 1000, 500, stepTime, function(counter){ desc_sprite_lines.option_panel_center.show = false; counter.count = 0; counter.isEnd = "hend"; }],
							 
			 ])		   
		  }
		  animation_order_scene_3([
				["wait", 1500, stepTime, function(counter){  counter.count = 1; desc_sprite_lines.option_panel_all.show = true; desc_sprite_lines.option_panel_all.opacity = 0.0;  }],
				[
					["option_panel_all", 500,  1.0 , stepTime,  function(counter){   counter.count += 0.5; }],
					["opacity_option_panel_tabbles", 500, 1.0, stepTime,  function(counter){   counter.count += 0.5; }],
				],	
			]);		
		 if(curentScene == 3.5){
			
			animation_order_scene_3_5([
			    ["wait", 500, stepTime, function(counter){ desc_sprite_interior["option_tabble_"+variant_tabble].show = true;
 				  desc_sprite_interior.option_panel_tabbles.show = false; desc_sprite_lines.option_panel_center.show = true; counter.count = 1;
				  desc_sprite_lines.option_panel_green.show = true; }],		    
				["option_panel_all", 500,  0.0, stepTime,  function(counter){   counter.count = 2; desc_sprite_lines.option_panel_all.show = false;  }],
			    ["opacity_gren_centre", 300, 1.0, stepTime, function(counter){   counter.count = 3; }],
				["opacity_gren_centre", 300, 0.0, stepTime, function(counter){   counter.count = 4; }],
				["opacity_gren_centre", 300, 1.0, stepTime, function(counter){   counter.count = 5; }],
				[
					["scale_gren_centre",  "big", 1.2, 800, stepTime, function(counter){ counter.count += 0.34;  }],
					["scale_option_sentre_tabble",  "big", 1.2, 800, stepTime, function(counter){ counter.count += 0.34; }],					
					["tabble_line", 300, 0.0,  stepTime,  function(counter){  counter.count += 0.34; inactionCounter= -5000; }],					
				],
				["wait", 1000, stepTime, function(counter){  counter.count = 7; desc_sprite_lines.option_panel_center.show = false; }],
				[
					["scale_gren_centre",  "little", 1.2, 1000, stepTime, function(counter){ counter.count += 0.251; }],
					["scale_option_sentre_tabble",  "little", 1.2, 1000, stepTime, function(counter){ counter.count += 0.251; }],
					["opacity_gren_centre", 300, 0.0, stepTime, function(counter){   counter.count += 0.251;  }],
					["opacity_option_sentre_tabble", 300, 0.0, stepTime, function(counter){   counter.count += 0.25; }],
				],
				[
					["opacity_tabble_left", 500, 1.0, stepTime, function(counter){   counter.count += 0.5; }],
					["opacity_tabble_right", 500, 1.0, stepTime, function(counter){  curentScene = 4; counter.count += 0.5; }],					
				]				
			]);
	     }
      }		 
	  ///////////////////////////////////сцеа 4 ////////////////////////
      if(Math.floor(curentScene) == 4){ 
		if(curentScene == 4 && inactionCounter > inaction || curentScene == 4.5 && animation_order_lines("isEnd") == "art_line_" ){
			animation_order_lines([
				["art_line", 500, 0.2,  stepTime,  function(counter){  counter.count = 1; counter.isEnd = "art_line_";  }],		 
				["art_line", 500, 1.0,  stepTime,  function(counter){  counter.count = 2; }],	
				["art_line", 500, 0.2,  stepTime,  function(counter){  counter.count = 3; }],	
				["art_line", 500, 1.0, stepTime,  function(counter){ counter.count = 4; } ],
				["wait_art_line", 3000, stepTime, function(counter){ counter.count = 0; counter.isEnd = "art_line";  } ],			 
			]);  			  
		  }
		  if(curentScene == 4 && inactionCounter > inaction || curentScene == 4.5 && animation_order_hend("isEnd") == "hend1_" ){
		  	animation_order_hend([ 
			    ["wait", 5000, stepTime, function(counter){ counter.count = 1; counter.isEnd = "hend1_";  }],
				["hend_move", 120, 600, 1500, stepTime, function(counter){ counter.count = 2; desc_sprite_lines.option_panel_center.show = true;}],
				["scale_center_panel", "little", 1.02, 100, stepTime, function(counter){  counter.count = 3; desc_sprite_lines.option_panel_center.show = false;}],
				["scale_center_panel", "big", 1.02, 100, stepTime, function(counter){ counter.count = 4; }],
				["wait", 300, stepTime, function(counter){  counter.count = 5; }],
				["hend_move", -1000, 1000, 500, stepTime, function(counter){ desc_sprite_lines.option_panel_center.show = false; counter.count = 0; counter.isEnd = "hend1"; }],
							 
			 ])		   
		  }
		  if(curentScene == 4){
			animation_order_scene_4([
				["wait", 1500, stepTime, function(counter){  counter.count = 1; desc_sprite_lines.option_panel_all.show = true; desc_sprite_lines.option_panel_all.opacity = 0.0;  }],
				[
					["option_panel_all", 500,  1.0 , stepTime,  function(counter){   counter.count += 0.5; }],
					["opacity_option_panel_arts", 500, 1.0, stepTime,  function(counter){   counter.count += 0.5; }],
				],	
			]);
		  }		 
	      if(curentScene == 4.5){		
			animation_order_scene_4_5([
			    ["wait", 500, stepTime, function(counter){ desc_sprite_interior["option_art_"+variant_art].show = true;
 				  desc_sprite_interior.option_panel_arts.show = false; desc_sprite_lines.option_panel_center.show = true; counter.count = 1;
				  desc_sprite_lines.option_panel_green.show = true; }],		    
				["option_panel_all", 500,  0.0, stepTime,  function(counter){   counter.count = 2; desc_sprite_lines.option_panel_all.show = false;  }],
			    ["opacity_gren_centre", 300, 1.0, stepTime, function(counter){   counter.count = 3; }],
				["opacity_gren_centre", 300, 0.0, stepTime, function(counter){   counter.count = 4; }],
				["opacity_gren_centre", 300, 1.0, stepTime, function(counter){   counter.count = 5; }],
				[
					["scale_gren_centre",  "big", 1.2, 800, stepTime, function(counter){ counter.count += 0.34;  }],
					["scale_option_sentre_art",  "big", 1.2, 800, stepTime, function(counter){ counter.count += 0.34; }],					
					["art_line", 300, 0.0,  stepTime,  function(counter){  counter.count += 0.34; inactionCounter= -5000; }],					
				],
				["wait", 1000, stepTime, function(counter){  counter.count = 7; desc_sprite_lines.option_panel_center.show = false; }],
				[
					["scale_gren_centre",  "little", 1.2, 1000, stepTime, function(counter){ counter.count += 0.251; }],
					["scale_option_sentre_art",  "little", 1.2, 1000, stepTime, function(counter){ counter.count += 0.251; }],
					["opacity_gren_centre", 300, 0.0, stepTime, function(counter){   counter.count += 0.251;  }],
					["opacity_option_sentre_art", 300, 0.0, stepTime, function(counter){   counter.count += 0.25; }],
				],			
				["opacity_art", 500, 1.0, stepTime, function(counter){   counter.count =9; }],										
                ["wait", 1500, stepTime, function(counter){  counter.count = 10; showStars = true; }],
				["wait", 1000, stepTime, function(counter){  counter.count = 11; createStars(300);   }],	
				["wait", 1000, stepTime, function(counter){  counter.count = 12; createStars(300);   }],	
				["wait", 1000, stepTime, function(counter){  counter.count = 13; createStars(300);   }],	
				["piples", 627, 912, 1000, stepTime, function(counter){ counter.count = 14; }],
				[ ///запускает две анимации пралельно
				    ["dialog", 183, 597, 720, stepTime, function(counter){ counter.count += 0.5; }],
					["dialog_text_2", -157, 710, 695, stepTime, function(counter){ counter.count += 0.51; }],
			    ],
                ["wait", 2500, stepTime, function(counter){  counter.count = 0; showStars = false; curentScene = 5; }],	

			]);
			if(showStars){
				fadeInStars(stepTime, 500);
				rotateStar_1(stepTime, 3000); 
				moveStars(stepTime, 7000);
			  rotateStarAll(stepTime, 25000);
			}
	    }	
	  }if(curentScene == 5){	
			animation_order_scene_4_5([
				[
				    ["move_logo", 322, 200, 2000, stepTime, function(counter){ counter.count += 0.51; }],
					["move_button", 235, 1530, 2000, stepTime, function(counter){ counter.count += 0.5; }],
					//["wait", 700, stepTime, function(counter){  createStars(300);    }],					
				],
				//["wait", 700, stepTime, function(counter){ createStars(300); counter.count = 2;   }],
				//["wait", 700, stepTime, function(counter){ createStars(300); counter.count = 3;   }],
				//["wait", 1000, stepTime, function(counter){  counter.count = 2; showStars = false;  }],
			]);  
	  }
	  //top: 1730/*-63*/, cetnre: 235,
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

///выполняет последовательно массив с анимациями в цикле
function animation_order(anim_obj){
	
	var counter = {count: 0, isEnd: false};

	return function(arr_width_func){
		
		if(arr_width_func == "isEnd")return counter.isEnd;

        if(typeof arr_width_func[Math.floor(counter.count)] == "undefined")return;
		
	    for(var i=0; i<arr_width_func.length; i++){
			
			if(typeof arr_width_func[i][0] == "object"){
					
                  if(i == Math.floor(counter.count)){
					  
					for(var j=0; j<arr_width_func[i].length; j++){

						var funcName =  arr_width_func[i][j].shift();
						arr_width_func[i][j].push(counter);
						anim_obj[funcName].apply(null, arr_width_func[i][j]);
					}
				  }					
			}else{
				if(i == Math.floor(counter.count)){
					var funcName =  arr_width_func[i].shift();
					
					arr_width_func[i].push(counter)
	           
					anim_obj[funcName].apply(null, arr_width_func[i]);
				}
			}
	  }			
	}	
}


//рисует все объекты на сцене;
function drawAll(){
	
	drawScene(img_interior_1);
	
	if(curentScene  == 1){ //отображает пару с диалогом
		drawObject(img_sprite_lines, desc_sprite_lines.layer565);
		drawObject(img_sprite_lines, desc_sprite_lines.dialog);
		drawDialogText(decs_text_objects.dialog_1);
	}
	if(curentScene  == 2 || curentScene  == 2.3 || curentScene  == 2.5){ 		
		drawObject(img_sprite_lines, desc_sprite_lines.option_panel_all);		
		drawObject(img_sprite_lines, desc_sprite_lines.option_panel_center);		
		drawObject(img_sprite_lines, desc_sprite_lines.option_panel_green);			
		drawObject(img_sprite_interior, desc_sprite_interior.option_panel_beds);		
		drawObject(img_sprite_interior, desc_sprite_interior.option_bed_2);				
        drawObject(img_sprite_lines, desc_sprite_lines.line_bed);		
		drawObject(img_sprite_interior, desc_sprite_interior.bed_interior);

	    drawBlackScreen();
        drawHend();									
	}
	if(curentScene  == 3 ||  curentScene  == 3.5){ 
			
		drawObject(img_sprite_lines, desc_sprite_lines.line_tabble);
		drawObject(img_sprite_lines, desc_sprite_lines.option_panel_all);
		
		drawObject(img_sprite_lines, desc_sprite_lines.option_panel_center);
		drawObject(img_sprite_lines, desc_sprite_lines.option_panel_green);	
		
		drawObject(img_sprite_interior, desc_sprite_interior.option_panel_tabbles);
		if(curentScene  == 3.5){
			drawObject(img_sprite_interior, desc_sprite_interior["option_tabble_"+variant_tabble]);	
			
			drawObject(img_sprite_interior, desc_sprite_interior["side_tabble_right_"+variant_tabble]);			
		}
		drawObject(img_sprite_interior, desc_sprite_interior.bed_interior);
		if(curentScene  == 3.5)drawObject(img_sprite_interior, desc_sprite_interior["side_tabble_left_"+variant_tabble]);
		drawHend();	
	}	
	if(curentScene  == 4 ||  curentScene  == 4.5 ){ 
	
		drawObject(img_sprite_lines, desc_sprite_lines.line_wall_art);
		drawObject(img_sprite_lines, desc_sprite_lines.option_panel_all);
		
		drawObject(img_sprite_lines, desc_sprite_lines.option_panel_center);
		drawObject(img_sprite_lines, desc_sprite_lines.option_panel_green);	
		
		drawObject(img_sprite_interior, desc_sprite_interior.option_panel_arts);
		
		drawObject(img_sprite_interior, desc_sprite_interior["side_tabble_right_"+variant_tabble]);	
		
		if(curentScene  == 4.5){
			drawObject(img_sprite_interior, desc_sprite_interior["option_art_"+variant_art]);	
            drawObject(img_sprite_interior, desc_sprite_interior["wall_art_interior_"+variant_art]);				
		}
		drawObject(img_sprite_interior, desc_sprite_interior.bed_interior);
		drawObject(img_sprite_interior, desc_sprite_interior["side_tabble_left_"+variant_tabble]);
		drawHend();	
		
		drawObject(img_sprite_lines, desc_sprite_lines.layer565);
		drawObject(img_sprite_lines, desc_sprite_lines.dialog);
		drawDialogText(decs_text_objects.dialog_2);
	
	}
	if(curentScene  == 5 ||  curentScene  == 5.5){  
	
		drawScene(img_interior_2);	
		drawEndScreene();
        drawDialogText(decs_text_objects.dialog_3);      		
	}
	if(showStars)drawStars();
	///кнопка и логотип
	drawObject(img_sprite_lines, desc_sprite_lines.game_logo);
	drawObject(img_sprite_lines, desc_sprite_lines.button);
}

///анимация прозрачности
function animationOpacity(anim_obj){
	
	var pastTime = 0; var old_toOpacity; var old_time; var difOpacity;

	if (anim_obj.opacity == undefined){		
		 anim_obj.opacity = 1.0;
	}	
	return function(time,  toOpacity, stepTime_,  callb, counter){

        if(pastTime == 0 && old_toOpacity == toOpacity && old_time == time)return;		 
		if(pastTime == 0){
			old_toOpacity = toOpacity; old_time = time;
            			
			difOpacity = anim_obj.opacity - toOpacity;
		}
		pastTime += stepTime_;
		if(pastTime >= time){		
			anim_obj.opacity = toOpacity;			
			callb(counter);			
			pastTime = 0;
		}else{
			
			anim_obj.opacity -=difOpacity/(time/stepTime_);
		}			
	}	
}

///счетчик времени для анимаций основного цикла
function animationWait(){
	var pastTime = 0;
	
	return function(time, stepTime_, callb, counter){
		
		pastTime += stepTime_;
		//console.log(pastTime);
        if(pastTime >= time){			
			pastTime = 0;
			callb(counter);				
		}			
	}
}

//анимация движения 
function animationMove(anim_obj){
	
	var isMove = 0; var distanseX; var distanseY; var _X; var _Y; var oldDistanse = {x: null, y: null}; var old_time;
	
	var preceding_frame = {x: null, y: null};
	
    return function(X, Y, time, stepTime_, callb, counter){
			
		if(isMove == 0 && oldDistanse.x == X && oldDistanse.y == Y && old_time == time )return;	
		var isEnd = 0;
		
        if(isMove == 0){			
	
			oldDistanse = {x: X, y: Y}; 
			old_time = time;
			
			_X = canvas_width/2 - X/proportion_x;
			_Y = Y/proportion_y;
			
			distanseX = anim_obj.dx - _X;
			distanseY = anim_obj.dy - _Y;
			isMove = 1;
		}	 		
		    if(preceding_frame.x == null ||  preceding_frame.x >  Math.abs(anim_obj.dx - _X - distanseX/(time/stepTime_)) ){
           // console.log(isMove, anim_obj.dx - _X);			
				anim_obj.dx -= distanseX/(time/stepTime_);
                preceding_frame.x = Math.abs(anim_obj.dx - _X);	
                 		
			}else{
				anim_obj.dx = _X; isEnd++ ;
			}
			if(preceding_frame.y == null || preceding_frame.y >  Math.abs(anim_obj.dy - _Y - distanseY/(time/stepTime_))){
				anim_obj.dy -= distanseY/(time/stepTime_);
                preceding_frame.y = Math.abs(anim_obj.dy - _Y);				
			}else{
				anim_obj.dy = _Y; isEnd++;
			}
			  if(isEnd == 2){		
				isMove = 0;
				preceding_frame.x = null;
				preceding_frame.y = null;
				callb(counter);
			 }						
	} 	
}
//анимация масштаба
function animationScale_1(anim_obj){
	var stepTime = 1; var step_dWidth; var step_dHeight; var step_dx; var step_dy;	
	var old_littleBig; var old_toProportion; var old_time;
	
	return function(littleBig ,toProportion, time, stepTime_, callb, counter){	
        if(stepTime == 1 && old_littleBig == littleBig && old_toProportion == toProportion && old_time == time)return;
		
		if(stepTime == 1){
			
			old_littleBig = littleBig; old_toProportion = toProportion;  old_time = time;
			
			if(littleBig == "big"){
				step_dWidth = (anim_obj.dWidth * toProportion) - anim_obj.dWidth;
				step_dHeight = (anim_obj.dHeight * toProportion) - anim_obj.dHeight;				
			}else{
				step_dWidth = (anim_obj.dWidth / toProportion) - anim_obj.dWidth;
				step_dHeight = (anim_obj.dHeight / toProportion) - anim_obj.dHeight;				
			} 
			 step_dx =  step_dWidth/2;
			 step_dy =  step_dHeight/2;		
		}		
		stepTime += stepTime_;
  
			anim_obj.dx -= (step_dx/(time/stepTime_));
			anim_obj.dy -= (step_dy/(time/stepTime_));
			anim_obj.dWidth +=  step_dWidth/(time/stepTime_);
			anim_obj.dHeight += step_dHeight/(time/stepTime_);
			
	     if(stepTime >= time ){
			 
			var clearTime =  time - stepTime;			 
			anim_obj.dx -= (step_dx/(time/clearTime));
			anim_obj.dy -= (step_dy/(time/clearTime));
			anim_obj.dWidth +=  step_dWidth/(time/clearTime);
			anim_obj.dHeight += step_dHeight/(time/clearTime);			 			 
			callb(counter);		
			stepTime = 1;			
		}
	}		
}

//определяет клики по кнопке button (play now)
canvas.onmousedown = function (e) {
	
	inactionCounter = 0;
	
	var bbox = canvas.getBoundingClientRect();
	var x = e.clientX - bbox.left * (canvas.width / bbox.width);
	var y = e.clientY - bbox.top * (canvas.height / bbox.height)
    
    if(x > desc_sprite_lines.button.dx && x < desc_sprite_lines.button.dx+desc_sprite_lines.button.dWidth &&
	   y > desc_sprite_lines.button.dy && y < desc_sprite_lines.button.dy+desc_sprite_lines.button.dHeight){
		   
		   console.log('https://apps.apple.com/us/app/home-designer-match-blast/id1449747378');
	   }

	if(x > desc_sprite_lines.option_panel_center.dx && x < desc_sprite_lines.option_panel_center.dx+desc_sprite_lines.option_panel_center.dWidth &&
	   y > desc_sprite_lines.option_panel_center.dy && y < desc_sprite_lines.option_panel_center.dy+desc_sprite_lines.option_panel_center.dHeight
	   ){		   
			if(curentScene == 3){variant_scene_3(2)}
			if(curentScene == 4){variant_scene_4(2)}
			if(curentScene == 2.3) curentScene = 2.5;
		 
	  }

     if(x > desc_sprite_lines.option_panel_all.dx && x < desc_sprite_lines.option_panel_all.dx+desc_sprite_lines.option_panel_center.dWidth &&
	   y > desc_sprite_lines.option_panel_all.dy && y < desc_sprite_lines.option_panel_all.dy+desc_sprite_lines.option_panel_all.dHeight
	   ){		   
			if(curentScene == 3){variant_scene_3(1)}
			if(curentScene == 4){variant_scene_4(1)}
          			
	  } 

     if(x > desc_sprite_lines.option_panel_center.dx+desc_sprite_lines.option_panel_center.dWidth+20
 	    && x < desc_sprite_lines.option_panel_center.dx+desc_sprite_lines.option_panel_center.dWidth*2+20 &&
	    y > desc_sprite_lines.option_panel_all.dy && y < desc_sprite_lines.option_panel_all.dy+desc_sprite_lines.option_panel_all.dHeight	    
	   ){
         
          if(curentScene == 3){variant_scene_3(3)}	
          if(curentScene == 4){variant_scene_4(3)}		  
		 
	  }
      
      function variant_scene_3(variant){
		 curentScene = 3.5;
		 variant_tabble = variant;
		 anim_obj.scale_option_sentre_tabble = animationScale_1(desc_sprite_interior["option_tabble_"+variant_tabble]);
		 anim_obj.opacity_option_sentre_tabble = animationOpacity(desc_sprite_interior["option_tabble_"+variant_tabble]);
		 anim_obj.opacity_tabble_left = animationOpacity(desc_sprite_interior["side_tabble_left_"+variant_tabble]);
		 anim_obj.opacity_tabble_right = animationOpacity(desc_sprite_interior["side_tabble_right_"+variant_tabble]); 		  
	  }
	  
      function variant_scene_4(variant){
		 console.log(variant);
		 curentScene = 4.5;
		 variant_art = variant;
		 anim_obj.scale_option_sentre_art = animationScale_1(desc_sprite_interior["option_art_"+variant_art]);
		 anim_obj.opacity_option_sentre_art = animationOpacity(desc_sprite_interior["option_art_"+variant_art]);		 
		 anim_obj.opacity_art = animationOpacity(desc_sprite_interior["wall_art_interior_"+variant_art]);
		  
	  }
   	  
};

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

//рисует черный полупрозрачный квадрат с квадратным отверстием для центрального выбора;
function drawBlackScreen(){
        if(rest_objects.black_screen.show != undefined && rest_objects.black_screen.show == false)return;        
		
		ctx.globalAlpha = rest_objects.black_screen.opacity;
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canvas_width , desc_sprite_lines.option_panel_all.dy - 6.88);
		ctx.fillRect(0, desc_sprite_lines.option_panel_all.dy + desc_sprite_lines.option_panel_all.dHeight + 6.88, canvas_width , canvas_height);
		ctx.fillRect(0, desc_sprite_lines.option_panel_all.dy - 7, desc_sprite_lines.option_panel_green.dx-7 , desc_sprite_lines.option_panel_all.dHeight+14);
		ctx.fillRect(desc_sprite_lines.option_panel_green.dx+7 + desc_sprite_lines.option_panel_green.dWidth ,  desc_sprite_lines.option_panel_all.dy - 7 , canvas_width , desc_sprite_lines.option_panel_all.dHeight+14);		
		ctx.globalAlpha = 1.0;	
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

    