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

///создает спрайты из объекта  - ресурса
function createSprites(sprites, img, sprite_description, type){
	
	for(var key in sprite_description){
		
		if(type == "common"){
			
			sprites[key] = new SpriteCommon(img, sprite_description[key]);
			
		}else if(type == "text"){
			
			sprites[key] = new SpriteText(sprite_description[key]);
			
		}		
	}	
}

function SpriteCommon(img, resources){
	
	  this.img = img;
      (resources.x_1 !=undefined) ? this.x_1 = resources.x_1 : this.x_1 = 0; 
	  (resources.x_2 !=undefined) ? this.x_2 = resources.x_2 : this.x_2 = 0; 
	  (resources.y_1 !=undefined) ? this.y_1 = resources.y_1 : this.y_1 = 0; 
	  (resources.y_2 !=undefined) ? this.y_2 = resources.y_2 : this.y_2 = 0;	  
	  (resources.opacity !=undefined) ? this.opacity = resources.opacity : this.opacity = 1.0; 
	  (resources.show !=undefined) ? this.show = resources.show : this.show = true;
	  (resources.top !=undefined) ? this.top = resources.top : this.top = 1.0; 
	  (resources.cetnre !=undefined) ? this.cetnre = resources.cetnre : this.cetnre = 1.0;
	  
	  this.addCanvasPositionEndSize();            
}

SpriteCommon.prototype.addCanvasPositionEndSize = function(){
	
		this.dx = canvas_width/2 - this.cetnre/proportion_x;
		this.dy = this.top/proportion_y;
		this.dWidth = (this.x_2 - this.x_1)/proportion_x;
		this.dHeight = (this.y_2 - this.y_1)/proportion_y;
		
}
SpriteCommon.prototype.render = function(){	

	if(this.show == false)return;
	if(this.opacity < 1.0)ctx.globalAlpha = this.opacity;	
	ctx.drawImage(this.img, this.x_1, this.y_1, this.x_2 - this.x_1, this.y_2 - this.y_1, this.dx, this.dy, this.dWidth, this.dHeight);		
	if(this.opacity < 1.0)ctx.globalAlpha = 1.0;
}

SpriteCommon.prototype.anim_opacity = function(time,  toOpacity, stepTime_,  callb, counter){
		
	if(this.anim_opacity_props == undefined){
		
		this.anim_opacity_props = {pastTime: 0, old_toOpacity: 0, old_time: 0, difOpacity: 0 }
	}   
    if(this.anim_opacity_props.pastTime == 0 && this.anim_opacity_props.old_toOpacity == toOpacity && this.anim_opacity_props.old_time == time)return;	
	
	    if(this.anim_opacity_props.pastTime == 0){
			this.anim_opacity_props.old_toOpacity = toOpacity; this.anim_opacity_props.old_time = time;           			
			this.anim_opacity_props.difOpacity = this.opacity - toOpacity;
		}
		this.anim_opacity_props.pastTime += stepTime_;
		if(this.anim_opacity_props.pastTime >= time){		
			this.opacity = toOpacity;
           // console.log(111);			
			callb(counter);			
			this.anim_opacity_props.pastTime = 0;
		}else{
			
			this.opacity -= this.anim_opacity_props.difOpacity/(time/stepTime_);
		}					
}
SpriteCommon.prototype.anim_move = function(X, Y, time, stepTime_, callb, counter){
	
	if(this.anim_move_props == undefined){
		
	   this.anim_move_props = {		   
		  isMove: 0, distanseX: 0, distanseY: 0, _X: 0, _Y: 0, oldDistanse_x: 0,  oldDistanse_y: 0, old_time: 0, preceding_frame: {x: null, y: null}
	   }	
	}
			
	if(this.anim_move_props.isMove == 0 && this.anim_move_props.oldDistanse_x == X && this.anim_move_props.oldDistanse_y == Y && this.anim_move_props.old_time == time )return;	
	    
		var isEnd = 0;
		
       if(this.anim_move_props.isMove == 0){			
			this.anim_move_props.oldDistanse_x =  X; this.anim_move_props.oldDistanse_y = Y; 
			this.anim_move_props.old_time = time;
			
			this.anim_move_props._X = canvas_width/2 - X/proportion_x;
			this.anim_move_props._Y = Y/proportion_y;
			
			this.anim_move_props.distanseX = this.dx - this.anim_move_props._X;
			this.anim_move_props.distanseY = this.dy - this.anim_move_props._Y;
			this.anim_move_props.isMove = 1;
		}	 		
		    if(this.anim_move_props.preceding_frame.x == null ||  this.anim_move_props.preceding_frame.x >  Math.abs(this.dx - this.anim_move_props._X - this.anim_move_props.distanseX/(time/stepTime_)) ){
			
				this.dx -= this.anim_move_props.distanseX/(time/stepTime_);
                this.anim_move_props.preceding_frame.x = Math.abs(this.dx - this.anim_move_props._X);	
                 		
			}else{
				this.dx = this.anim_move_props._X; isEnd++ ;
			}
			if(this.anim_move_props.preceding_frame.y == null || this.anim_move_props.preceding_frame.y >  Math.abs(this.dy - this.anim_move_props._Y - this.anim_move_props.distanseY/(time/stepTime_))){
				this.dy -= this.anim_move_props.distanseY/(time/stepTime_);
                this.anim_move_props.preceding_frame.y = Math.abs(this.dy - this.anim_move_props._Y);				
			}else{
				this.anim_move_props.dy = this.anim_move_props._Y; isEnd++;
			}
			  if(isEnd == 2){		
				this.anim_move_props.isMove = 0;
				this.anim_move_props.preceding_frame.x = null;
				this.anim_move_props.preceding_frame.y = null;
				callb(counter);
			 }							
}
SpriteCommon.prototype.anim_scale= function(littleBig ,toProportion, time, stepTime_, callb, counter){
	
   if(this.anim_scale_props == undefined){
		
	   this.anim_scale_props = {	
	      	stepTime: 1, step_dWidth: 0, step_dHeight: 0,  step_dx: 0, step_dy: 0,	
			old_littleBig: 0,  old_toProportion: 0,  old_time: 0,
	   }
   }	   	
	if(this.anim_scale_props.stepTime == 1 && this.anim_scale_props.old_littleBig == littleBig && this.anim_scale_props.old_toProportion == toProportion && this.anim_scale_props.old_time == time)return;
		
		if(this.anim_scale_props.stepTime == 1){
			
			this.anim_scale_props.old_littleBig = littleBig; this.anim_scale_props.old_toProportion = toProportion;  this.anim_scale_props.old_time = time;
			
			if(littleBig == "big"){
				this.anim_scale_props.step_dWidth = (this.dWidth * toProportion) - this.dWidth;
				this.anim_scale_props.step_dHeight = (this.dHeight * toProportion) - this.dHeight;				
			}else{
				this.anim_scale_props.step_dWidth = (this.dWidth / toProportion) - this.dWidth;
				this.anim_scale_props.step_dHeight = (this.dHeight / toProportion) - this.dHeight;				
			} 
			 this.anim_scale_props.step_dx =  this.anim_scale_props.step_dWidth/2;
			 this.anim_scale_props.step_dy =  this.anim_scale_props.step_dHeight/2;		
		}		
		this.anim_scale_props.stepTime += stepTime_;
						
			this.dx -= (this.anim_scale_props.step_dx/(time/stepTime_));
			this.dy -= (this.anim_scale_props.step_dy/(time/stepTime_));
			this.dWidth +=  this.anim_scale_props.step_dWidth/(time/stepTime_);
			this.dHeight += this.anim_scale_props.step_dHeight/(time/stepTime_);
			
			if(this.anim_scale_props.stepTime >= time){
				if(this.anim_scale_props.stepTime > time){
					stepTime_ =  time - this.anim_scale_props.stepTime;
					this.dx -= (this.anim_scale_props.step_dx/(time/stepTime_));
					this.dy -= (this.anim_scale_props.step_dy/(time/stepTime_));
					this.dWidth +=  this.anim_scale_props.step_dWidth/(time/stepTime_);
					this.dHeight += this.anim_scale_props.step_dHeight/(time/stepTime_);					
				}
				this.anim_scale_props.stepTime = 1;
				callb(counter);
			}
	
}
SpriteCommon.prototype.anim_wait = function(time, stepTime_, callb, counter){
	
	if(this.pastTime_anim_wait == undefined)this.pastTime_anim_wait = 0;

		this.pastTime_anim_wait += stepTime_;
		
        if(this.pastTime_anim_wait >= time){			
			this.pastTime_anim_wait = 0;
			callb(counter);
            //console.log("wait");		
		}				
}

///////////////////////////////////////////////////////////
function SpriteText(resources){
	
	SpriteCommon.call(this, null, resources);
	(resources.color !=undefined) ? this.color = resources.color : this.color = "black"; 
	(resources.text !=undefined) ? this.text = resources.text : this.text = "";
	(resources.align !=undefined) ? this.align = resources.align : this.align = "center";
 	(resources.font !=undefined) ? this.font = resources.font : this.font = "bold "+ 60/proportion_y+"px  Verdana"; 
	(resources.lineHeight !=undefined) ? this.lineHeight = resources.lineHeight : this.lineHeight = 100/proportion_y;
	
}

SpriteText.prototype = Object.create(SpriteCommon.prototype);

Object.defineProperty(SpriteText.prototype, 'constructor', { 
    value: SpriteText, 
    enumerable: false,
    writable: true });

//отображает сообщение на экране
SpriteText.prototype.render = function(){
	
	ctx.font = this.font;
	ctx.textAlign = this.align;
	ctx.fillStyle = this.color;
	var phraseArray = getLines(ctx, this.text, this.dWidth);		
	for (var i = 0; i<phraseArray.length; i++){		
		ctx.fillText(phraseArray[i], this.dx,  this.dy + (this.lineHeight)*i );		
	}	
}
/////////////////////////////////////////////////////////////////////////////
function SpriteBalckScreen(resources){
	
	(resources.opacity !=undefined) ? this.opacity = resources.opacity : this.opacity = 1.0; 
	(resources.show !=undefined) ? this.show = resources.show : this.show = true;
	
}

SpriteBalckScreen.prototype.anim_opacity = function(time,  toOpacity, stepTime_,  callb, counter){
	
	SpriteCommon.prototype.anim_opacity.call(this, time,  toOpacity, stepTime_,  callb, counter);
	
}
SpriteBalckScreen.prototype.anim_wait = function(time, stepTime_, callb, counter){
	
	SpriteCommon.prototype.anim_wait.call(this, time,  time, stepTime_, callb, counter);
		
}
//рисует черный полупрозрачный квадрат с квадратным отверстием для центрального выбора;
SpriteBalckScreen.prototype.render = function(){
	    // console.log(this.opacity, this.show, canvas_width,  );
        if(this.show  == false)return;        		
		ctx.globalAlpha = this.opacity;
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, canvas_width , sprites.option_panel_all.dy - 6.88);
		ctx.fillRect(0, sprites.option_panel_all.dy + sprites.option_panel_all.dHeight + 6.88, canvas_width , canvas_height);
		ctx.fillRect(0, sprites.option_panel_all.dy - 7, sprites.option_panel_green.dx-7 , sprites.option_panel_all.dHeight+14);
		ctx.fillRect(sprites.option_panel_green.dx+7 + sprites.option_panel_green.dWidth ,  sprites.option_panel_all.dy - 7 , canvas_width , sprites.option_panel_all.dHeight+14);		
		ctx.globalAlpha = 1.0;	
}

/////////////////////////////////////////////////////////////
function SpriteImg(img, resources){
	
	  SpriteCommon.call(this, img, resources);
	  //this.addCanvasPositionEndSize();            
}

SpriteImg.prototype = Object.create(SpriteCommon.prototype);

Object.defineProperty(SpriteImg.prototype, 'constructor', { 
    value: SpriteImg, 
    enumerable: false,
    writable: true });

SpriteImg.prototype.render = function(){
	
	//console.log(this);
    if(this.show == false)return;	
	ctx.drawImage(this.img, this.dx, this.dy, this.dWidth, this.dHeight);	
}




