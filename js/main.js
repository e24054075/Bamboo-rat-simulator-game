var phaserwidth = window.innerWidth;
var phaserheight = window.innerHeight;

var day = 1;
var trigger = {ach:0,end:0,set:0,mood:0,eat:0};
var gameTimer = 0;
var gameTimer2 = 0;
var gameTimer3 = 0;
var collide_num = 0;
var rat_life;
var rat_mood = 0;
var rat_jump = 0;
var move_num;
var up_num;
var device_type;
var i;
var weather;
var prize = -1;


var rat_scale = 0.7;
var bar_input = 20;
var bar_type = 1;
var bar_value = [50,50,50,50];
var event_id = 0;
var content_data=[
["有朋自遠方來","今天主人的朋友來參觀農場，快要經過我的籠子了，我該怎麼辦?","開始大聲嚶嚶嚶的叫","安靜的在角落磨牙","主人和朋友注意到我把我抓起來把玩一番","他們好像沒什麼注意我",[0,0,5,15],[0,5,-5,-10]],
["竹鼠聖誕交換禮物","聖誕節快到了，竹鼠們辦了交換禮物大會，面前剩下兩個禮物，你要選哪個?","紅色大禮物","綠色小禮物","裡面是個等身竹鼠玩偶","一根磨牙棒",[0,0,20,10],[10,10,10,0]],
["蜈蚣入侵","有隻蜈蚣鑽進籠子了，我該怎麼辦?","咬死它，看誰還敢闖進我的地盤","豪可怕喔，縮到一旁嚶嚶嚶","嘴巴有點麻麻的，該不會是中毒了吧?","好險!他繞了兩圈就爬出去了",[-10,15,0,0],[0,-10,0,0]],
["家中流水水","牆壁似乎有一處一直漏水，我口有點渴我應該?","用來洗臉","全部喝光光","神清氣爽，好舒服呀","這水真好喝呀，清涼解渴",[10,0,10,10],[5,0,10,0]],
["8+9竹鼠的嗆聲","隔壁的竹鼠前來挑釁，說我好肥，我要怎麼辦?","跟他拚了，你才肥，你全家都肥!","不理他，肥就肥嘛!我就是喜歡當肥宅鼠","打贏了!我是竹鼠之王，不過好像腿被抓傷了","他覺得跟我吵沒意思，去煩別人了",[-10,10,10,10],[5,-10,0,-10]],
["窈窕鼠女君子好逑","主人放了一隻母竹鼠進我的籠子，面容姣好，是我的菜，我該怎麼做? ","害羞地躲在一旁，等她來跟我說話","跟她說:小姐妳好漂亮，想跟妳生孩子!","等了一個禮拜，她還是沒來跟我說話","她賞了我一巴掌，說以後再也不理我了…",[0,0,-10,0],[-10,0,-15,5]],
["朋友的邀請","朋友問我要不要和他們一起玩啃竹子的遊戲，我該?","多無聊啊，不理他們自己唱歌","好啊!最喜歡啃竹子了","唱到沙啞，覺得自己好孤單…","交了一群鼠友，以後可以一起啃竹子了",[-10,-5,-10,10],[5,0,10,5]],
["再見了，竹鼠","鄰居阿強被主人抓走了，不知道會有什麼下場?","一定是被抓去煮了，好傷心…","主人幫他做健康檢查，馬上就會回來的","廚房裡傳來陣陣撲鼻的香味","檢查了一個禮拜了還沒回來，是不是生大病了?",[-5,0,-10,5],[5,0,0,-5]],
["鼠來飽","今天有點吃太多了，肚子不太舒服，我應該?","繞籠子10圈，運動一下","睡個覺醒來應該就好了吧","運動促進腸胃蠕動，上完廁所好多了","肚子好痛，睡不太著…",[15,5,10,10],[-15,0,-10,0]],
["主人視察","主人今天來整理環境，發現我的食物沒吃完，我應該?","趕快衝去吃，能吃多快吃多快","收掉我的廚餘吧!老子吃不完!","主人說:「恩…這隻竹鼠很愛吃喔，小心吃太多變太肥喔…」","主人說:「這隻竹鼠好像沒什麼食慾，不如我們把他…按摩一下好了」",[-10,0,0,15],[10,0,-10,5]],
["老鼠屎","有人拉屎在我的食物上，真是討厭，我該怎麼辦?","把屎拿走，丟給隔壁籠子的阿肥","都是纖維質，毫不在意","隔壁阿肥生氣的把屎丟回來，展開一場大戰","不小心吃到屎，肚子好像怪怪的",[0,15,0,15],[-10,0,-10,-10]],
["悶竹鼠","前幾天下雨，整個環境悶悶的，今天終於出太陽，我該怎麼辦?","躲到陰暗的角落","大字型躺在地上，悠閒地曬太陽","好涼快的角落，可以舒服的啃竹子了","頭好像暈暈的，會不會是中暑了?",[15,0,15,-10],[-15,0,-10,15]],
];
function dowm() {
    switch (this.key) {
        case "end":
            trigger.end =1;
            break;
		case "eat":
			trigger.eat = 1;
        default:
            break;
    }
};
function up() {
    switch (this.key) {
		case "ach":
			$("#cover").show();
			$("#setting").show();
			$("#return").show();
			$("#achieve").show();
			break;
        case "end":
            trigger.end = 0;
            break;
        case "set":
			$("#cover").show();
			$("#setting").show();
			$("#return").show();
            break;
		case "eat":
			wheel.visible = true;
			trigger.eat = 0;
			/*$("#main").hide();
			game.state.start('spin');*/
			break;
        default:
            break;
    }       
};
function deviceType() {
	if(navigator.userAgent.match(/mobile/i)) {
		device_type = 0;
		document.getElementById("game").style.marginTop = phaserheight-(720*phaserwidth/420)+"px";
	} else {
		device_type = 1;
		$("#status").css({"width":"420px","height":"160px"});
		$("#day").css({"top":"90px","left":"300px","font-size":"1.8em"});
	}
};

var game = new Phaser.Game(420,720, Phaser.AUTO, 'game');

var mainpage ={
  preload:()=>{
	game.load.tilemap('map', 'assets/json/b_map.json', null,Phaser.Tilemap.TILED_JSON);
	game.load.image('background_box','assets/img/background_box.png');				
	game.load.image('wall','assets/img/wall.png');
	game.load.image('bowl','assets/img/newbowl.png');
	game.load.image('bamboo','assets/img/bamboo2.png');
	game.load.image('corn','assets/img/corn.png');
	game.load.image('rice','assets/img/rice.png');
	game.load.image('grass','assets/img/grass.png');
	game.load.spritesheet('rat_player','assets/img/rat4.png', 210, 114);
	game.load.spritesheet('hat','assets/img/hat.png', 84, 84);
	game.load.image("wheel", "./assets/img/plat.png");
	game.load.image("pin", "./assets/img/spin.png");     
	},
  create:()=>{	
    $('#day').text("DAY "+day);
    //物理引擎
    game.physics.startSystem(Phaser.Physics.ARCADE);
	game.physics.arcade.gravity.y = 0;
	game.time.desiredFps = 60;
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
	map.addTilesetImage('background_box','background_box');
	map.addTilesetImage('wall','wall');
	layer = map.createLayer('layer1');
	map.createLayer('layer2');
	map.setCollision(1,true,layer);
	
	//竹鼠
	rat_player = game.add.sprite(150,500, 'rat_player');
	game.physics.enable(rat_player,Phaser.Physics.ARCADE);
	rat_player.scale.set(rat_scale);
	rat_player.facing = 'right';
	rat_player.animations.add('left', [6,7,8,9], 7, true);
    rat_player.animations.add('right', [1,2,3,4], 7, true);
	rat_player.animations.add('catch', [10,11],12, true);
	rat_player.anchor.setTo(0.5,0.5);
	rat_player.body.collideWorldBounds = true;
	rat_player.inputEnabled = true;
	rat_player.input.enableDrag(true);
	bounds = new Phaser.Rectangle(30, 450, 360, 200);
	rat_player.input.boundsRect = bounds;
	//帽子
	hat = game.add.sprite(158,442,'hat');
	game.physics.enable(hat,Phaser.Physics.ARCADE);
	hat.scale.set(rat_scale);
	hat.body.allowGravity = false;
	hat.body.immovable = true;
  
	game.time.events.loop(Phaser.Timer.SECOND*2,updateMoveNum, this);
	game.time.events.loop(Phaser.Timer.SECOND*2,updowm, this);
	
	
  	wheel = game.add.sprite(game.width / 2, 500, "wheel");
	wheel.scale.set(0.5);
    wheel.anchor.set(0.5);
	wheel.visible = false;
    pin = game.add.sprite(game.width / 2, 500, "pin");
    pin.anchor.set(0.5);
	pin.scale.set(1);
	pin.visible = false;
	//按鈕設定
	this.button_eat = game.add.button(150, 640, 'bowl');
	this.button_eat.scale.set(0.8);
	//食物設定
	bamboo = game.add.sprite(166,630,'bamboo');
	bamboo.scale.set(0.6);
	bamboo.visible = false;
	corn = game.add.sprite(175,608,'corn');
	corn.scale.set(0.7);
	corn.visible = false;
	rice = game.add.sprite(170,619,'rice');
	rice.scale.set(0.8);
	rice.visible = false;
	grass = game.add.sprite(170,615,'grass');
	grass.scale.set(0.6);
	grass.visible = false;
	$("#food_text").hide();
    this.button_eat.onInputUp.add(function(){
		if(prize == -1)
		{
			game.time.desiredFps = 60;
			wheel.visible = true;
			pin.visible = true;
			var slices = 4;
			var rounds = game.rnd.between(20, 60);
			var degrees = game.rnd.between(0, 360);
			prize = slices - 1 - Math.floor(degrees / (360 / slices));
			canSpin = false;
			var spinTween = game.add.tween(wheel).to({
				angle: 360 * rounds + degrees
			}, 1000, Phaser.Easing.Quadratic.Out, true);
			spinTween.onComplete.add(function(){
				switch(prize)
				{
					case 0:
						document.getElementById("food_text").innerHTML= "新鮮嫩竹子";
						break;
					case 1:
						document.getElementById("food_text").innerHTML= "玉米";
						break;
					case 2:
						document.getElementById("food_text").innerHTML= "米糠拌飯";
						break;
					case 3:
						document.getElementById("food_text").innerHTML= "芒草";
						break;
					default:
					break;
				}
				$("#food_text").show();
				game.input.onDown.add(function(){
					wheel.visible = false;
					pin.visible = false;
					$("#food_text").hide();
					game.time.desiredFps = 30;
					switch(prize)
					{
						case 0:
							bamboo.visible = true;
							break;
						case 1:
							corn.visible = true;
							break;
						case 2:
							rice.visible = true;
							break;
						case 3:
							grass.visible = true;
							break;
						default:
						break;
					}
					game.input.onDown.removeAll();
				});	
			});
		}
	});
	},
  update:()=>{
	//按鍵觸發
	if(trigger.end === 1&& game.time.now > gameTimer)
	{
		trigger.end = 0;
		day++;
		check_ach_day();/*define in ach js*/ 
		$('#day').text("DAY "+day);
		if(day%10 === 0 && rat_scale <= 1.6)
		{
			rat_player.body.x = 160;
			rat_player.body.y = 525;
			rat_scale += 0.09;
			rat_player.scale.set(rat_scale);
			hat.scale.set(rat_scale);
		}
		gameTimer = game.time.now + 750;
		$("#paper").show();
		$("#optionA").show();
		$("#optionB").show();
		$("#cover").show();
		$(".event_title").show();
		$(".event_content").show();
		$(".optionA_text").show();
		$(".optionB_text").show();
		switch(prize)
		{
			case 0:
				bamboo.visible = false;
				break;
			case 1:
				corn.visible = false;
				break;
			case 2:
				rice.visible = false;
				break;
			case 3:
				grass.visible = false;
				break;
			default:
			break;
		}
		prize = -1;
		set_weather();
	}
	if(game.physics.arcade.collide(rat_player, layer)&& rat_player.body.onWall())
	{
		collide_num = 1;
		hat.body.velocity.x = 0;
	}
	rat_player.angle = 0;
	if(rat_player.input.isDragged)
	{
		rat_player.body.velocity.x = 0;
		rat_player.body.velocity.y = 0;
		rat_player.angle = 90;
		rat_player.play('catch');
		hat.frame = 0;
		hat.body.x = rat_player.body.x + 42;
		hat.body.y = rat_player.body.y - 42;
	}
	else
	{
		switch(move_num)
		{
			case 1:
			{
				hat.frame = 1;
				hat.body.x = rat_player.body.x + 10;
				hat.body.y = rat_player.body.y - 20;
				if(collide_num === 1&& rat_player.facing === 'left')
				{
					rat_player.frame = 5;
					rat_player.body.velocity.y = 0;
					hat.body.velocity.y = 0;
				}
				else
				{
					rat_player.body.velocity.y = 50*up_num;
					collide_num = 0;
					rat_player.body.velocity.x = -100;
					hat.body.velocity.x = -100;
					hat.body.velocity.y = 50*up_num;
					rat_player.play('left');
					if (rat_player.facing !== 'left')
						rat_player.facing = 'left';
				}
			}
			break;
			case 2:
			{
				hat.frame = 0;
				hat.body.x = rat_player.body.x + 77;
				hat.body.y = rat_player.body.y - 20;
				if(collide_num === 1&& rat_player.facing === 'right' )
				{
					rat_player.frame = 0;
					rat_player.body.velocity.y = 0;
					hat.body.velocity.y = 0;
					
				}
				else
				{
					rat_player.body.velocity.y = 50*up_num;
					collide_num = 0;
					rat_player.body.velocity.x = 100;
					hat.body.velocity.x = 100;
					hat.body.velocity.y = 50*up_num;
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
				hat.body.velocity.x = 0;
				hat.body.velocity.y = 0;
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
		//game.debug.spriteInfo(rat_player,32,400);
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
	game.load.image('obstacle','assets/img/fire2.png');	
	game.load.image('obstacle2','assets/img/rock.png');		
	//game.load.physics('physics_data','assets/json/physics_data.json')
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
		$("#main").show();
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
$("#return").click(function(){
		$("#cover").hide();		
		$("#achieve").hide();
		$("#setting").hide();
		$("#return").hide();
	});
function getRandom(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
};
$(".optionA_text").click(function(){
	four_bar_conrtrol(content_data[event_id][6][0],content_data[event_id][6][1],content_data[event_id][6][2],content_data[event_id][6][3]);
	$("#optionA").hide();
	$("#optionB").hide();
	$(".optionA_text").hide();
	$(".optionB_text").hide();
	document.getElementById("T1-1").innerHTML="結果";
	document.getElementById("C1-1").innerHTML=content_data[event_id][4];
	event_end(1);
});

$(".optionB_text").click(function(){
	four_bar_conrtrol(content_data[event_id][7][0],content_data[event_id][7][1],content_data[event_id][7][2],content_data[event_id][7][3]);
	$("#optionA").hide();
	$("#optionB").hide();
	$(".optionA_text").hide();
	$(".optionB_text").hide();
	document.getElementById("T1-1").innerHTML="結果";
	document.getElementById("C1-1").innerHTML=content_data[event_id][5];
	event_end(1);
});
function set_weather(){
	weather = getRandom(0,2);
	switch(weather)
	{
		case 0:
			document.getElementById("sky").src ="./assets/img/sky.jpg";
			break;
		case 1:
			document.getElementById("sky").src ="./assets/img/sky_cloudy.jpg";
			break;
		case 2:
			document.getElementById("sky").src ="./assets/img/sky_rainy.jpg";
			break;
	}
};
function event_end(a){
	$("#paper").click(function(){
		if(a == 1){
		$("#cover").hide();
	    $("#paper").hide();
	    $(".event_title").hide();
	    $(".event_content").hide();
		event_id = getRandom(0,11);
		document.getElementById("T1-1").innerHTML=content_data[event_id][0];
		document.getElementById("C1-1").innerHTML=content_data[event_id][1];
		document.getElementById("A1-1").innerHTML=content_data[event_id][2];
		document.getElementById("B1-1").innerHTML=content_data[event_id][3];
		a = 0;
		}});
};
function four_bar_conrtrol(a,b,c,d){
	if(a != 0)
		bar_control(a,1);
	if(b != 0)
		bar_control(b,2);
	if(c != 0)
		bar_control(c,3);
	if(d != 0)
		bar_control(d,4);
	check_ach_bar();/*define in ach js*/ 
};
function bar_control(b_input,b_type){
	bar_value[b_type-1] += b_input;
	if(bar_value[b_type-1] > 100)
		bar_value[b_type-1] = 100;
	else if(bar_value[b_type-1] < 0)
		bar_value[b_type-1] = 0;
	$("#bar"+b_type).animate({width: bar_value[b_type-1]/100*59+'vw'},1000);
};
$("#weather").click(function(){
		$("#main").hide();
		game.state.start('littlegame')
});
$("#ach_button").click(function(){
	$("#cover").show();
	$("#setting").show();
	$("#return").show();
	$("#achieve").show();
	document.getElementById("ach_button").style.height="10vh";
    document.getElementById("ach_button").style.width="10vw";
    document.getElementById("ach_button").style.top="90vh";
    document.getElementById("ach_button").style.left="17.5vw";
    setTimeout(function(){  document.getElementById("ach_button").style.height="8vh";
    document.getElementById("ach_button").style.width="8vw";
    document.getElementById("ach_button").style.top="92vh";
    document.getElementById("ach_button").style.left="18vw"; },200);
});
$("#set_button").click(function(){
	$("#cover").show();
	$("#setting").show();
	$("#return").show();
	document.getElementById("set_button").style.height="10vh";
    document.getElementById("set_button").style.width="10vw";
    document.getElementById("set_button").style.top="90vh";
    document.getElementById("set_button").style.left="1.7vw";
    setTimeout(function(){  document.getElementById("set_button").style.height="8vh";
    document.getElementById("set_button").style.width="8vw";
    document.getElementById("set_button").style.top="92vh";
    document.getElementById("set_button").style.left="2vw"; },200);
});
$("#end_button").click(function(){
	trigger.end = 1;
	document.getElementById("end_button").style.height="10vh";
    document.getElementById("end_button").style.width="10vw";
    document.getElementById("end_button").style.top="90vh";
    document.getElementById("end_button").style.left="79.5vw";
    setTimeout(function(){  document.getElementById("end_button").style.height="8vh";
    document.getElementById("end_button").style.width="8vw";
    document.getElementById("end_button").style.top="92vh";
    document.getElementById("end_button").style.left="80vw"; },200);
});
$(document).ready(function(){	
	$("#cover").hide();
	$("#setting").hide();
	$("#achieve").hide();
	$("#return").hide();
    $("#paper").hide();
    $("#optionA").hide();
    $("#optionB").hide();
    $(".event_title").hide();
    $(".event_content").hide();
    $(".optionA_text").hide();
    $(".optionB_text").hide();
	deviceType();
});
