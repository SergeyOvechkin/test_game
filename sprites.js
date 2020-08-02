


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
	
		this.dx = dx(this.cetnre);
		this.dy = dy(this.top);
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
			
			this.anim_move_props._X = dx(X);
			this.anim_move_props._Y = dy(Y);
			
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
	(resources.lineHeight !=undefined) ? this.lineHeight = resources.lineHeight/proportion_y : this.lineHeight = 100/proportion_y;
	
	if(resources.font !=undefined && resources.fontSize != undefined && resources.fontWeight != undefined){		
		this.font = resources.fontWeight +" "+(resources.fontSize/proportion_y)+"px "+resources.font;	
       //console.log(this.font);		
	}else{		
		this.font = "bold "+ 60/proportion_y+"px  Verdana"; 
	}	
	
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




