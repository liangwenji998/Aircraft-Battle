var map;
var food;
var time;
var feichuan;
var bullet;
var code;
var speed = 50;
var allWidth = 1200;
var allHeight = 800;
var marginLeft = (window.innerWidth - allWidth)/2;
var marginTop = (window.innerHeight - allHeight)/2;
var foodWidth = 20;
var foodHeight = 20;
var xBlock = Math.floor(allWidth/foodWidth);
var yBlock = Math.floor(allHeight/foodHeight);
function Map(){
	this.width = allWidth;
	this.height = allHeight;
	this.color = "#000";
	this.position = 'absolute';
	this.marginLeft = marginLeft;
	this.marginTop = marginTop;
	this._map = null;
	this.show = function(){
		this._map = document.createElement("div");
		this._map.style.backgroundColor = this.color;
		this._map.style.width = this.width + "px";
		this._map.style.border = this.border;
		this._map.style.height = this.height + "px";
		this._map.style.marginLeft = this.marginLeft + "px";
		this._map.style.marginTop = this.marginTop + "px";
		this._map.style.position = this.position;
		document.getElementsByTagName("body")[0].appendChild(this._map);
	}
}
function food(){
	this.width = foodWidth;
	this.height = foodHeight;
	this.color = "rgb(255,255,255)";
	this.position = "absolute";
	this.x = 0;
	this.y = 0;
	this._food = null;
	this.show = function(){
		if(this._food == null){
			this._food = document.createElement("div");
			this._food.style.backgroundColor = this.color;
			this._food.style.width = this.width + "px";
			this._food.style.height = this.height + "px";
			this._food.style.position = this.position;
			map._map.appendChild(this._food);
		}
		this.x = Math.floor(Math.random()*(xBlock/2));
		this.y = Math.floor(Math.random()*yBlock);
		this._food.style.left = this.x*20 + "px";
		this._food.style.top = this.y*20 + "px";
	}	
}
function feichuan(){
	this.width = foodWidth;
	this.height = foodHeight;
	this.color = "red";
	this.position = "absolute";
	this.x = xBlock - 1;
	this.y = yBlock/2;
	this.direct;
	this._feichuan = null;
	this.show = function(){
		if(this._feichuan == null){
			this._feichuan = document.createElement("div");
			this._feichuan.style.backgroundColor = this.color;
			this._feichuan.style.width = this.width + "px";
			this._feichuan.style.height = this.height + "px";
			this._feichuan.style.position = this.position;
			map._map.appendChild(this._feichuan);
		}
		this._feichuan.style.left = this.x*20 + "px";
		this._feichuan.style.top = this.y*20 + "px";
	}
	this.move = function(){
		if( this.direct == "up" && this.y != 0){
			this.y -= 1;
		}
		if( this.direct == "down" && this.y != yBlock - 1){
			this.y += 1;
		}
		this.show();
	}
}
function Bullet(){
	this.width = foodWidth;
	this.height = foodHeight;
	this.color = "gold";
	this.position = "absolute";
	this.border = 50;
	this._bullet = [];
	var m;
	this.show = function(){
		for( i in this._bullet ){
			if( this._bullet[i][2] == null ){
				this._bullet[i][2] = document.createElement("div");
				this._bullet[i][2].style.width = this.width + "px";
				this._bullet[i][2].style.backgroundColor = this.color;
				this._bullet[i][2].style.height = this.height + "px";
				this._bullet[i][2].style.position = this.position;
				this._bullet[i][2].style.borderRadius = this.border + "%";
				map._map.appendChild(this._bullet[i][2]);	
				this._bullet[i][2].id = "div" + i;
				this._bullet[i][2].style.top = feichuan.y*20 + "px";
			}
			this._bullet[i][2].style.left = this._bullet[i][0]*20 + "px";	
		}			
	}
	this.move = function(){
		for( i in this._bullet ){
			this._bullet[i][0] -= 1;
			m = document.getElementById("div"+i);
			if( this._bullet[i][0] == food.x && this._bullet[i][1] == food.y ){
				delete this._bullet[i];
				m.remove(m);
				food.show();
			}
			if( this._bullet[i][0] == -1){
				delete this._bullet[i];
				m.remove(m);
			}			
		}
		this.show();		
	}
}

setDirect = function(code){
		switch(code){
			case 38:
			case 87:
					feichuan.direct = "up";
					feichuan.move();
				break;
			case 40:
			case 83:
					feichuan.direct = "down";
					feichuan.move();
				break;
			case 32:				
					bullet._bullet.push([xBlock-1,feichuan.y,null])
					bullet.move();
				break;				
		}	
}
window.onload=function(){	
	map = new Map();
	map.show();	
	food = new food();
	food.show();	
	feichuan = new feichuan();
	feichuan.show();
	feichuan.move();	
	bullet = new Bullet();
	times = setInterval('bullet.move()',speed);	
	
	document.onkeydown = function(event){
		if(window.event){
			code = window.event.keyCode;
		}else{
			code = event.keyCode;
		}
		setDirect(code);
	}
}