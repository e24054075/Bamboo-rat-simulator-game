var phaserwidth = window.innerWidth;
var phaserheight = window.innerHeight;
var phaserwid = 600*phaserwidth/phaserheight;

var day = 1;
var trigger = {end:0,achieve:0,set:0,mood:0};
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

function dowm() {
    switch (this.key) {
        case "end":
            trigger.end =1;
            break;
        case "achieve":
			trigger.achieve =1;
            break;
        case "set":
			trigger.set = 1;
            break;
        case "mood":
			trigger.mood = 1;
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
        case "achieve":
			trigger.achieve = 0;
            break;
        case "set":
			trigger.set = 0;
            break;
        case "mood":
			trigger.mood = 0;
            break;
        default:
            break;
    }       
};
function deviceType() {
	if(navigator.userAgent.match(/mobile/i)) {
		device_type = 0;
	} else {
		device_type = 1;
		$("#day").css({"top":"90px","left":"300px","font-size":"1.8em"});
	}
};

var game = new Phaser.Game(420,720, Phaser.AUTO, 'game');

var mainpage ={
  preload:()=>{
	game.load.tilemap('map', 'assets/json/b_map.json', null,Phaser.Tilemap.TILED_JSON);
	game.load.image('back','assets/img/back.png');		
	game.load.image('endb','assets/img/endb3.png');
	game.load.image('setb','assets/img/setb2.png');		
	game.load.image('achb','assets/img/achb2.png');
	game.load.image('wall','assets/img/wall.png');
	game.load.spritesheet('mood','assets/img/mood.png', 120, 121);
	game.load.spritesheet('weather','assets/img/weather.png', 177, 177);
	game.load.spritesheet('rat_player','assets/img/rat2.png', 210, 114);
	},
  create:()=>{	
    //物理引擎
    game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.arcade.gravity.y = 0;
	game.time.desiredFps = 30;
	//視窗設定
	game.scale.setGameSize(420,700);
	if(device_type === 0){
		game.scale.scaleMode  = Phaser.ScaleManager.SHOW_ALL;
		game.scale.pageAlignVertically = true;
		game.scale.pageAlignHorizontally = true;
	}
	Phaser.Canvas.setImageRenderingCrisp(game.canvas);
	//載入
	map = game.add.tilemap('map');
	map.addTilesetImage('wall','wall');
	map.addTilesetImage('back','back');
	map.createLayer('layer2');
	layer = map.createLayer('layer1');
	map.setCollision(1,true,layer);
	
	rat_player = game.add.sprite(100,450, 'rat_player');
	game.physics.enable(rat_player,Phaser.Physics.ARCADE);
	rat_player.facing = 'right';
	rat_player.animations.add('left', [6,7,8,9], 7, true);
    rat_player.animations.add('right', [1,2,3,4], 7, true);
	rat_player.body.collideWorldBounds = true;
	rat_player.inputEnabled = true;
	rat_player.input.enableDrag(true);
	bounds = new Phaser.Rectangle(30, 400, 360, 300);
	rat_player.input.boundsRect = bounds;
	//參數設定
	//按鈕設定
	this.button_end = game.add.button(345, 645, 'endb');
	this.button_end.scale.set(0.9);
    this.button_end.onInputDown.add( dowm,{key:"end"},this);
    this.button_end.onInputUp.add(up, { key: "end" }, this);  
	
	this.button_set = game.add.button(10, 645, 'setb');
	this.button_set.scale.set(0.9);
    this.button_set.onInputDown.add( dowm,{key:"set"},this);
    this.button_set.onInputUp.add(up, { key: "set" }, this);  
	
	this.button_ach = game.add.button(80, 645, 'achb');
	this.button_ach.scale.set(0.9);
    this.button_ach.onInputDown.add( dowm,{key:"achieve"},this);
    this.button_ach.onInputUp.add(up, { key: "achieve" }, this); 
	
	this.button_mood = game.add.button(355, 30, 'mood');
	this.button_mood.onInputDown.add( dowm,{key:"mood"},this);
    this.button_mood.onInputUp.add(up, { key: "mood" }, this);
	
	this.button_mood.scale.set(0.38);
	this.button_weather = game.add.button(295, 30, 'weather');
	this.button_weather.scale.set(0.3);
	
	game.time.events.loop(Phaser.Timer.SECOND*2,updateMoveNum, this);
	game.time.events.loop(Phaser.Timer.SECOND*2,updowm, this);
	
	cursors = game.input.keyboard.createCursorKeys();
	},
  update:()=>{
	//按鍵觸發
	if(trigger.end === 1&& game.time.now > gameTimer)
	{
		day++;
		$('#day').text("DAY "+day);
		gameTimer = game.time.now + 750;
	}
	if(trigger.achieve === 1 && trigger.set != 1)
	{
		$("#cover").show();
		$("#achieve").show();
		$("#return").show();
		as_type = 1;
	}
	if(trigger.set === 1 && trigger.achieve!= 1)
	{
		$("#cover").show();
		$("#setting").show();
		$("#return").show();
		as_type = 2;
	}
	if(trigger.mood === 1)
	{
		$("#day").hide();
		game.state.start('littlegame');
	}
	//game.physics.arcade.collide(rat_player, layer);
	if(game.physics.arcade.collide(rat_player, layer)&& rat_player.body.onWall())
		collide_num = 1;
	if(rat_player.input.isDragged)
	{
		rat_player.body.velocity.x = 0;
		rat_player.body.velocity.y = 0;
		if (rat_player.facing === 'left') 
			rat_player.frame = 5;
        if (rat_player.facing === 'right') 
			rat_player.frame = 0;
	}
	else if(move_num < 6)
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
	else if(move_num >= 6 && move_num < 11)
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
	else if(move_num >= 11)
	{
		rat_player.body.velocity.x = 0;
		rat_player.body.velocity.y = 0;
		if (rat_player.facing === 'left') 
			rat_player.frame = 5;
        if (rat_player.facing === 'right') 
			rat_player.frame = 0;
	}	
	if(rat_mood > 0)
		button_mood.frame = 0;
	else if(rat_mood < 0)
		button_mood.frame = 1;
	else
		button_mood.frame = 2;
	//方向控制
	/*
    if (cursors.left.isDown) {
        rat_player.body.velocity.x = -100;
        rat_player.play('left');
        if (rat_player.facing !== 'left')
		    rat_player.facing = 'left';
    }

    else if (cursors.right.isDown ) {	
        rat_player.body.velocity.x = 100;
        rat_player.play('right');
        if (rat_player.facing !== 'right') 
            rat_player.facing = 'right';
	}
	else if (cursors.up.isDown ) {	
        rat_player.body.velocity.y = -50;
	}
	else if (cursors.down.isDown ) {	
        rat_player.body.velocity.y = 50;
	}
	*/
	},
	render:()=>{
		//game.debug.text("Time until event: " + game.time.events.duration.toFixed(0), 32, 32);
		//game.debug.spriteInfo(rat_player,32,32);
	},
};

function updateMoveNum(){
	move_num = game.rnd.integerInRange(1, 15);
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
			$("#setting").hide();
			$("#return").hide();
		}
	});
};
$(document).ready(function(){	
	$("#cover").hide();
	$("#setting").hide();
	$("#achieve").hide();
	$("#return").hide();
	as_return();
	$('#day').text("DAY "+day);
	deviceType();
});
