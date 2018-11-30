var phaserwidth = window.innerWidth;
var phaserheight = window.innerHeight;

var day = 1;
var trigger = {end:0,set:0,mood:0,eat:0};
var gameTimer = 0;
var gameTimer2 = 0;
var gameTimer3 = 0;
var collide_num = 0;
var as_type = 0;
var rat_life;
var rat_mood = 0;
var rat_jump = 0;
var move_num;
var up_num;
var device_type;
var food_choice = 0;
var i;
var bar_type = 1;
var bar_input = 20;
var bar_value = [50,50,50,50];


function dowm() {
    switch (this.key) {
        case "end":
            trigger.end =1;
            break;
        case "set":
			trigger.set = 1;
            break;
        case "mood":
			trigger.mood = 1;
            break;  
		case "eat":
			trigger.eat = 1;
			break;
        default:
            break;
    }
};
function up() {
    switch (this.key) {
        case "end":
            trigger.end = 0;
            break;
        case "set":
			trigger.set = 0;
            break;
        case "mood":
			trigger.mood = 0;
            break;
		case "eat":
			trigger.eat = 0;
			break;
        default:
            break;
    }       
};
function deviceType() {
	if(navigator.userAgent.match(/mobile/i)) {
		device_type = 0;
		var atemp = document.getElementById('a1');
		atemp.setAttribute('id','a3');
		document.getElementById("game").style.marginTop = phaserheight-(720*phaserwidth/420)+"px";
	} else {
		device_type = 1;
		$("#status").css({"width":"420px","height":"160px"});
		$("#day").css({"top":"90px","left":"300px","font-size":"1.8em"});
		$("#ratname").css({"position":"absolute","top":"668px","left":"190px"});
		$("#ratnamesize").css({"font-size":"1.2em"});
		var atemp = document.getElementById('a2');
		atemp.setAttribute('id','a3');
	}
};

var game = new Phaser.Game(420,720, Phaser.AUTO, 'game');

var mainpage ={
  preload:()=>{
	game.load.tilemap('map', 'assets/json/b_map.json', null,Phaser.Tilemap.TILED_JSON);
	game.load.image('bgimage','assets/img/bgimage.png');			
	game.load.image('endb','assets/img/endb3.png');
	game.load.image('setb','assets/img/setb2.png');		
	game.load.image('wall','assets/img/wall.png');
	game.load.image('wall2','assets/img/wall2.png');
	game.load.image('bowl','assets/img/bowl.png');
	game.load.image('bamboo','assets/img/bamboo2.png');
	game.load.spritesheet('rat_player','assets/img/rat5.png', 210, 114);
	},
  create:()=>{	
    //物理引擎
    game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.arcade.gravity.y = 0;
	game.time.desiredFps = 30;
	//視窗設定
	game.scale.setGameSize(420,720);
	if(device_type === 0){
		game.scale.scaleMode  = Phaser.ScaleManager.SHOW_ALL;
		game.scale.pageAlignVertically = true;
		game.scale.pageAlignHorizontally = true;
	}
	Phaser.Canvas.setImageRenderingCrisp(game.canvas);
	//載入
	map = game.add.tilemap('map');
	map.addTilesetImage('bgimage','bgimage');
	map.addTilesetImage('wall','wall');
	map.addTilesetImage('wall2','wall2');
	map.createLayer('layer3');
	layer = map.createLayer('layer1');
	map.createLayer('layer2');
	map.setCollision(1,true,layer);
	
	
	this.button_eat = game.add.button(160, 655, 'bowl');
	this.button_eat.scale.set(0.8);
	this.button_eat.onInputDown.add( dowm,{key:"eat"},this);
    this.button_eat.onInputUp.add(up, { key: "eat" }, this);

	rat_player = game.add.sprite(150,500, 'rat_player');
	game.physics.enable(rat_player,Phaser.Physics.ARCADE);
	rat_player.facing = 'right';
	rat_player.animations.add('left', [6,7,8,9], 7, true);
    rat_player.animations.add('right', [1,2,3,4], 7, true);
	rat_player.animations.add('catch', [10,11],10, true);
	rat_player.anchor.setTo(0.5,0.5);
	rat_player.body.collideWorldBounds = true;
	rat_player.inputEnabled = true;
	rat_player.input.enableDrag(true);
	bounds = new Phaser.Rectangle(30, 400, 360, 250);
	rat_player.input.boundsRect = bounds;
	//按鈕設定
	this.button_end = game.add.button(345, 655, 'endb');
	this.button_end.scale.set(0.9);
    this.button_end.onInputDown.add( dowm,{key:"end"},this);
    this.button_end.onInputUp.add(up, { key: "end" }, this);  
	
	this.button_set = game.add.button(10, 655, 'setb');
	this.button_set.scale.set(0.9);
    this.button_set.onInputDown.add( dowm,{key:"set"},this);
    this.button_set.onInputUp.add(up, { key: "set" }, this);  
	
	game.time.events.loop(Phaser.Timer.SECOND*2,updateMoveNum, this);
	game.time.events.loop(Phaser.Timer.SECOND*2,updowm, this);
	
	},
  update:()=>{
	//按鍵觸發
	if(trigger.end === 1&& game.time.now > gameTimer)
	{
		day++;
		$('#day').text("DAY "+day);
		gameTimer = game.time.now + 750;
    $("#paper").show();
    $("#optionA").show();
    $("#optionB").show();
    $("#cover").show();
	}
	if(trigger.set === 1 && trigger.achieve!= 1)
	{
		$("#cover").show();
		$("#setting").show();
		$("#return").show();
		as_type = 2;
	}
	if(trigger.eat === 1)
	{
		bar_animation(1,30);
		food_choice = 1;
		switch(food_choice)
		{
			case 1:
				bamboo = game.add.sprite(170,630,'bamboo');
				bamboo.scale.set(0.7);
				for(i = 0;i < 3;i++)
					bamboo.moveDown();
				break;
			default:
			break;
		}
	}
	if(game.physics.arcade.collide(rat_player, layer)&& rat_player.body.onWall())
		collide_num = 1;
	rat_player.angle = 0;
	if(rat_player.input.isDragged)
	{
		rat_player.body.velocity.x = 0;
		rat_player.body.velocity.y = 0;
		rat_player.angle = 90;
		rat_player.play('catch');
	}
	else
	{
		switch(move_num)
		{
			case 1:
			{
				if(collide_num === 1&& rat_player.facing === 'left')
				{
					rat_player.frame = 5;
					rat_player.body.velocity.y = 0;
				}
				else
				{
					rat_player.body.velocity.y = 50*up_num;
					collide_num = 0;
					rat_player.body.velocity.x = -100;
					rat_player.play('left');
					if (rat_player.facing !== 'left')
						rat_player.facing = 'left';
				}
			}
			break;
			case 2:
			{
				if(collide_num === 1&& rat_player.facing === 'right' )
				{
					rat_player.frame = 0;
					rat_player.body.velocity.y = 0;
				}
				else
				{
					rat_player.body.velocity.y = 50*up_num;
					collide_num = 0;
					rat_player.body.velocity.x = 100;
					rat_player.play('right');
					if (rat_player.facing !== 'right') 
						rat_player.facing = 'right';
				}
			}
			break;
			case 3:
			{
				rat_player.body.velocity.x = 0;
				rat_player.body.velocity.y = 0;
				if (rat_player.facing === 'left') 
					rat_player.frame = 5;
				if (rat_player.facing === 'right') 
					rat_player.frame = 0;
			}
			break;
			default:
			break;
		}
	}
	},
	render:()=>{
		//game.debug.text("Time until event: " + game.time.events.duration.toFixed(0), 32, 32);
		//game.debug.spriteInfo(rat_player,32,32);
		//game.debug.spriteBounds(rat_player);
	},
};

function updateMoveNum(){
	move_num = game.rnd.integerInRange(1,3);
};
function updowm(){
	up_num = game.rnd.integerInRange(-1,1);
};
	
game.state.add('mainpage', mainpage);
game.state.start('mainpage');

var littlegame ={
  preload:()=>{
	game.load.spritesheet('rat_player','assets/img/rat3.png', 210, 182);
	game.load.image('background','assets/img/rat_race_bg.png');		
	game.load.image('rat_race','assets/img/rat_race.png');
	game.load.image('obstacle','assets/img/spike.png');	
	game.load.image('obstacle2','assets/img/rock.png');		
	},
  create:()=>{	
	$("#ratname").hide();
    //物理引擎
    game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.arcade.gravity.y = 350;
	game.time.desiredFps = 30;
	game.scale.setGameSize(1050,600);
	//視窗設定
	if(device_type === 0){
		game.scale.scaleMode  = Phaser.ScaleManager.SHOW_ALL;
		game.scale.pageAlignVertically = true;
		game.scale.pageAlignHorizontally = true;
	}
	Phaser.Canvas.setImageRenderingCrisp(game.canvas);
	//載入
	bg = game.add.tileSprite(0, 0,1280, 600, 'background');
	bg.autoScroll(-250,0);
	rat_race = game.add.sprite(0,472,'rat_race');
	
	rat_player = game.add.sprite(50,200, 'rat_player');
	game.physics.enable(rat_player,Phaser.Physics.ARCADE);

	game.physics.enable(rat_race,Phaser.Physics.ARCADE);
	rat_race.body.allowGravity = false;
	rat_race.body.immovable = true;
	
	rat_player.facing = 'right';
    rat_player.animations.add('right', [1,2,3,4], 9, true);
	rat_player.body.collideWorldBounds = true;
	rat_player.animations.add('jump', [5,6,7], 2, false);
	//game.input.onDown.add(function(){rat_jump = 1;});
	game.input.onUp.add(function(){rat_jump = 1;});

	rat_life = 3;
	gameTimer2 = 1000;
	lifeText = game.add.text(20,50,'生命: '+rat_life, {fontSize: '24px', fill: '#000000'});
	},
  update:()=>{
	/*$(window).on("orientationchange",function(){
		if(window.orientation != 0)
		{
				game.scale.setGameSize(1050,600);
		}
	});*/
	if(rat_jump && game.time.now > gameTimer && game.physics.arcade.collide(rat_player, rat_race))
	{
		rat_player.play('jump');
		rat_player.body.velocity.y = -350;
		gameTimer = game.time.now + 1300;
	}
	else if(game.physics.arcade.collide(rat_player, rat_race)&& rat_jump === 0)
	{
		rat_player.play('right');
	}
	rat_jump = 0;
	if(game.time.now > gameTimer2)
	{
		obstacle = game.add.sprite(1000,395,'obstacle');
		game.physics.enable(obstacle,Phaser.Physics.ARCADE);
		obstacle.scale.set(0.3);
		obstacle.body.allowGravity = false;
		obstacle.body.immovable = true;
		obstacle.body.velocity.x = -350;
		gameTimer2 = game.time.now +4000;
	}
	if(game.physics.arcade.overlap(rat_player, obstacle) && game.time.now > gameTimer3)
	{
		rat_life--;
		lifeText.setText("生命: " + rat_life);
		gameTimer3 = game.time.now +2000;
	}
	if(obstacle.body.x < 1)
		obstacle.kill();
	if(rat_life === 0)
	{
		$("#day").show();
		$("#ratname").show();
		game.state.start('mainpage');
	}
	},
	render:()=>{
		//game.debug.text("Time until event: " + game.time.events.duration.toFixed(0), 32, 32);
		//game.debug.spriteInfo(rat_player,32,32);
		 //game.debug.spriteBounds(rat_player);
	},

};

game.state.add('littlegame',littlegame);

function as_return(){
	$("#return").click(function(){
		if(as_type === 1)
		{
			$("#cover").hide();		
			$("#achieve").hide();
			$("#return").hide();
		}
		if(as_type === 2)
		{
			$("#cover").hide();
			$("#achieve").hide();
			$("#setting").hide();
			$("#return").hide();
		}
	});
};
$("#optionA").click(function(){
  $("#cover").hide();
  $("#optionA").hide();
  $("#optionB").hide();
  $("#paper").hide();
  bar_input = bar_input/100*59;
  $("#bar"+bar_type).animate({width:'+='+ bar_input+'vw'},1000);
});

$("#optionB").click(function(){
  $("#cover").hide();
  $("#optionA").hide();
  $("#optionB").hide();
  $("#paper").hide();
  bar_input = bar_input/100*59*-1;
  $("#bar"+bar_type).animate({width:'+='+ bar_input+'vw'},1000);
});
$(document).ready(function(){	
	$("#cover").hide();
	$("#setting").hide();
	$("#achieve").hide();
	$("#return").hide();
  $("#paper").hide();
  $("#optionA").hide();
  $("#optionB").hide();
	as_return();
	$('#day').text("DAY "+day);
	deviceType();
});
