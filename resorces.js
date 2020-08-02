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

function dx(x){ return canvas_width/2 - x/proportion_x; }
function dy(y){ return y/proportion_y; }
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
		layer565: { //piples
			
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
		x_1: 0,	x_2: 650, y_1: 0, y_2: 400, top: 730, cetnre: 2000, /*-157*/ color: "black", fontSize: 60, fontWeight: "bold", ///proportion_y
		text: "Please help as width our bedroom interior", font: "Verdana", lineHeight: 100,/*/proportion_y,*/ },
	dialog_2: {		
		x_1: 0,	x_2: 650, y_1: 0, y_2: 400, top: 700, cetnre: 2000, /*-157*/ color: "black", fontSize: 60, fontWeight: "bold",
		text: "      Cool!       You're born to be a designer", font: "Verdana", lineHeight: 100,/*/proportion_y,*/ },
	dialog_3: {
		x_1: 0,	x_2: main_width*0.8, y_1: 0, y_2: 400, top: 950, cetnre: 0, color: "white", fontSize: 95, fontWeight: "bold",
		text: "Jumpstart your designer career right now!", font: "Verdana", lineHeight: 120,/*/proportion_y,*/}	
}


///остальные объекты
var rest_objects = {
	
	black_screen: {
		
		opacity: 0.0, show: false,
		
	},
	hend: {
		
		//dx: canvas_width/2- -1000/*120*//proportion_x, dy: 1000/*600*//proportion_y, dWidth: 250/proportion_x, dHeight: 500/proportion_y, 
		x_1: 0, x_2: 250, y_1: 0, y_2: 500,  
		show: false, cetnre: -1000, top: 1000,
	}
	
}