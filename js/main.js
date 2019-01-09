var phaserwidth = window.innerWidth;
var phaserheight = window.innerHeight;

var ach_status = "0x1";/*User achieve data (HEX format) [low index]1000000000[high index]*/
var day = 1;
var trigger = {end:0,eat:0};
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
var die_times=0;

var rat_scale = 0.7;
var bar_input = 20;
var bar_type = 1;
var bar_value = [50,50,50,50];
var event_id = 17;
var event_time = 0;
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
["貪吃鬼","吃完了今天份的食物，可是還是覺得好餓，我應該?","趁隔壁竹鼠在睡覺，偷吃他的食物","當作減肥吧，睡個覺就不會餓了","偷到一半主人突然走過來盯著我看，嚇死我了","夢裡我到了竹子王國，吃了三天三夜…",[-15,0,-15,15],[10,0,20,0]],
["地球暖化","最近天氣變化好劇烈，可能是因為地球暖化的關係，我該?","向竹鼠神祈求世界和平","要訓練自己的身體更能適應可怕的天氣","竹鼠神出現在我的夢裡，不過她被主人提著…","天天運動健身，規律飲食，我要活下去!!!",[-0,0,-15,0],[20,5,15,5]],
["森林之王","好想帶著竹鼠面具去參加唱歌比賽，可惜我出不去這裡…","唱大聲一點，說不定主人會發現我是歌神","可是那邊動物好多，我會不會被吃掉","主人走了過來，盯著我看，說到這隻竹鼠很愛亂叫，可能是發情了!","放棄成為歌手的夢，開始嘗試用竹子打節奏，想成為鼓手",[0,0,0,20],[0,5,-10,10]],
["雞脖子","主人手裡拿著雞脖子從我身邊走過，我該怎麼辦?","可憐的雞，該不會哪天我的竹鼠脖子也…","吃胖一點主人就找不到我的脖子了","陷入在悲傷的情感之中","食慾大增，開始大吃大喝",[0,0,-15,0],[-10,5,15,10]],
["霸凌","大之是隻愛欺負人的竹鼠，大家都對他言聽計從，今天來跟我要竹子","都給他，保住小命比較重要","假裝配合他，偷偷掏出小竹刀刺向他","看來以後要一直活在陰影之下了，少吃點竹子而已","大之痛苦的叫，大家像我投向英雄式的目光，我贏了!我是新的竹鼠之王!",[0,-10,-10,0],[0,20,10,15]],
["豬瘟","中國的豬開始流行起了傳染病，我該怎麼辦","好險竹鼠不吃廚餘","怕爆，希望不會傳染給我","以後應該廢除廚餘養豬，但是用上等竹子餵竹鼠","想到竹鼠和豬應該不會互相傳染，鬆了一口氣",[0,0,10,0],[0,0,5,0]],
["撞鬼","半夜聽見低喃聲，轉身一看是半透明的竹鼠，該怎麼辦?","嘗試跟它交談","無視它","它告訴我我是第1代竹鼠，要好好活下去","它似乎消失了，有點毛毛的",[0,0,10,0],[0,0,-10,0]],
["鼠翹翹","最近主人似乎沉迷手遊，一直說這遊戲怎麼一直死、根本活不過十天，該怎麼辦?","發出叫聲嘲諷他","發出叫聲安慰他","他打了我一頓","他打了我一頓",[-20,-10,-10,10],[-20,-10,-10,10]],
["鼠來保","不知道主人看了什麼，一直命令我叫，該怎麼辦?","努力配合他","不甩他","他把影片拍下來後很高興，給我更多食物","他毒打了我一頓",[10,0,10,10],[-10,-5,-10,-10]],
];
var die_content_data=[
["這隻竹鼠養得真好，看起來很營養，做成藥燉竹鼠火鍋，養生又好吃"],
["這隻竹鼠生病了，怕傳染給其他人，只好抓來殺了，做成三杯竹鼠應該不錯"],
["這隻竹鼠性格兇殘，會把其他竹鼠咬傷，只好料理料理了，做成香煎竹鼠"],
["永遠被欺負的傢伙，因為自尊心太低發瘋了，看來是活不成了，不如我們把它做成叫花鼠"],
["這隻竹鼠看起來太開心了，這樣不行，會打擾其他竹鼠進食，不如把它做成快樂火烤竹鼠"],
["這隻竹鼠太憂鬱了，看來得了憂鬱症，每天都悶悶不樂的，活不久的，不如我們做成悶竹鼠"],
["這隻竹鼠真漂亮，做成炒竹鼠一定很美味"],
["今天想吃竹鼠肉，想不到理由了，隨便抓一隻來做成炸竹鼠，很香地喔"],
];
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
	game.load.image("pin", "./assets/img/spin3.png");     
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
	//載入地圖
	map = game.add.tilemap('map');
	map.addTilesetImage('background_box','background_box');
	map.addTilesetImage('wall','wall');
	layer = map.createLayer('layer1');
	map.createLayer('layer2');
	map.setCollision(1,true,layer);
	//加入竹鼠
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
	/*hat = game.add.sprite(158,442,'hat');
	game.physics.enable(hat,Phaser.Physics.ARCADE);
	hat.scale.set(rat_scale);
	hat.body.allowGravity = false;
	hat.body.immovable = true;
  */
	game.time.events.loop(Phaser.Timer.SECOND*2,updateMoveNum, this);
	game.time.events.loop(Phaser.Timer.SECOND*2,updowm, this);
	//加入轉盤
  	wheel = game.add.sprite(game.width / 2, 500, "wheel");
	wheel.scale.set(0.5);
    wheel.anchor.set(0.5);
	wheel.visible = false;
    pin = game.add.sprite(209, 475, "pin");
    pin.anchor.set(0.5);
	pin.scale.set(1.3);
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
	event_time = 0;
	document.getElementById("event_img").src="./assets/img/gogo"+event_time+".png";
	prize = -1;
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
			var spinTween = game.add.tween(wheel).to({
				angle: 360 * rounds + degrees
			}, 1000, Phaser.Easing.Quadratic.Out, true);
			$("#cover").show();
			$("#cover").css({"opacity":"0"});
			spinTween.onComplete.add(function(){
				switch(prize)
				{
					case 0:
						document.getElementById("warning_text").innerHTML= "今天的食物是:<br/>新鮮嫩竹子";
						event_time = 3;
						bamboo.visible = true;
						break;
					case 1:
						document.getElementById("warning_text").innerHTML= "今天的食物是:<br/>玉米";
						event_time = 2;
						corn.visible = true;
						break;
					case 2:
						document.getElementById("warning_text").innerHTML= "今天的食物是:<br/>米糠拌飯";
						event_time = 3;
						rice.visible = true;
						break;
					case 3:
						document.getElementById("warning_text").innerHTML= "今天的食物是:<br/>芒草";
						event_time = 1;
						grass.visible = true;
						break;
					default:
					break;
				}
				document.getElementById("event_img").src="./assets/img/gogo"+event_time+".png";
				$(".warning").show();
				$("#board").show();
				$("#cover").css({"opacity":"0.3"});
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
			$('#day').text("DAY "+day);
			if(day%10 === 0 && rat_scale <= 1.6)
			{
				rat_player.body.x = 160;
				rat_player.body.y = 525;
				rat_scale += 0.09;
				rat_player.scale.set(rat_scale);
				//hat.scale.set(rat_scale);
			}
			gameTimer = game.time.now + 750;
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
			$("#cover").show();
			setTimeout(function(){
				$("#board").show("slow");
			},1600)
			setTimeout(function(){$(".warning").show();}, 2200);
			$("#day_cover").show("slow",function(){
			setTimeout(function(){
				$("#day_cover").hide("slow");
			},1000)
		});

		check_ach_day();/*define in ach js*/ 
		check_ach_size();/*define in ach js*/ 
		if(check_dying()) /*define if die*/
		{
			game.state.start('mainpage');
		}
	}
	if(trigger.eat === 1&& game.time.now > gameTimer)
	{
		trigger.eat = 0;
		wheel.visible = false;
		pin.visible = false;
		game.time.desiredFps = 30;
	}
	if(game.physics.arcade.collide(rat_player, layer)&& rat_player.body.onWall())
	{
		collide_num = 1;
		//hat.body.velocity.x = 0;
	}
	rat_player.angle = 0;
	if(rat_player.input.isDragged)
	{
		rat_player.body.velocity.x = 0;
		rat_player.body.velocity.y = 0;
		rat_player.angle = 90;
		rat_player.play('catch');
		bamboorat1_voice.play();
		/*hat.frame = 0;
		hat.body.x = rat_player.body.x + 42;
		hat.body.y = rat_player.body.y - 42;*/
	}
	else
	{
		switch(move_num)
		{
			case 1:
			{
				/*hat.frame = 1;
				hat.body.x = rat_player.body.x + 10;
				hat.body.y = rat_player.body.y - 20;*/
				if(collide_num === 1&& rat_player.facing === 'left')
				{
					rat_player.frame = 5;
					rat_player.body.velocity.y = 0;
					//hat.body.velocity.y = 0;
				}
				else
				{
					rat_player.body.velocity.y = 50*up_num;
					collide_num = 0;
					rat_player.body.velocity.x = -100;
					/*hat.body.velocity.x = -100;
					hat.body.velocity.y = 50*up_num;
					*/
					rat_player.play('left');
					if (rat_player.facing !== 'left')
						rat_player.facing = 'left';
				}
			}
			break;
			case 2:
			{
				/*
				hat.frame = 0;
				hat.body.x = rat_player.body.x + 77;
				hat.body.y = rat_player.body.y - 20;*/
				if(collide_num === 1&& rat_player.facing === 'right' )
				{
					rat_player.frame = 0;
					rat_player.body.velocity.y = 0;
					//hat.body.velocity.y = 0;
					
				}
				else
				{
					rat_player.body.velocity.y = 50*up_num;
					collide_num = 0;
					rat_player.body.velocity.x = 100;
					/*hat.body.velocity.x = 100;
					hat.body.velocity.y = 50*up_num;*/
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
				/*hat.body.velocity.x = 0;
				hat.body.velocity.y = 0;*/
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
		obstacle = game.add.sprite(1000,385,'obstacle');
		game.physics.enable(obstacle,Phaser.Physics.ARCADE);
		obstacle.scale.set(0.6);
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
		$("#setting").hide("slow");
		$("#return").hide();
	});
function getRandom(min,max){
    return Math.floor(Math.random()*(max-min+1))+min;
};
$(".optionA_text").click(function(){
	four_bar_conrtrol(content_data[event_id][6][0],content_data[event_id][6][1],content_data[event_id][6][2],content_data[event_id][6][3]);
	$("#optionA").slideToggle();
	$("#optionB").slideToggle();
	$(".optionA_text").slideToggle();
	$(".optionB_text").slideToggle();
	document.getElementById("T1-1").innerHTML="結果";
	if(event_id == 18)
		document.getElementById("C1-1").innerHTML="它告訴我我是第"+(die_times+2)+"代竹鼠，要好好活下去"	;
	else
		document.getElementById("C1-1").innerHTML=content_data[event_id][4];
	event_end(1);
});

$(".optionB_text").click(function(){
	four_bar_conrtrol(content_data[event_id][7][0],content_data[event_id][7][1],content_data[event_id][7][2],content_data[event_id][7][3]);
	$("#optionA").slideToggle();
	$("#optionB").slideToggle();
	$(".optionA_text").slideToggle();
	$(".optionB_text").slideToggle();
	document.getElementById("T1-1").innerHTML="結果";
	document.getElementById("C1-1").innerHTML=content_data[event_id][5];
	event_end(1);
});
function set_weather(){
	weather = getRandom(0,7);
	switch(weather)
	{
		case 0:
			document.getElementById("sky").src ="./assets/img/sky.jpg";
			document.getElementById("sky").src ="https://media.giphy.com/media/l0Ex63LkzqLu8aTF6/giphy.gif";
			four_bar_conrtrol(0,0,5,0);
			document.getElementById("warning_text").innerHTML= "今天天氣真好<br/>很開心";
			break;
		case 1:
			document.getElementById("sky").src ="./assets/img/sky_cloudy.jpg";
			document.getElementById("sky").src ="https://media.giphy.com/media/LNDBTeQl8lhTO/giphy.gif";
			document.getElementById("warning_text").innerHTML= "今天雲好多";
			break;
		case 2:
			document.getElementById("sky").src ="./assets/img/sky_rainy.jpg";
			document.getElementById("sky").src ="https://media.giphy.com/media/3osxYzIQRqN4DOEddC/giphy.gif";
			four_bar_conrtrol(0,0,-5,0);
			document.getElementById("warning_text").innerHTML= "下大雨<br/>有點憂鬱";
			break;
		case 3:
			document.getElementById("sky").src ="https://media.giphy.com/media/3oz8xsX51J7VCWOzTi/giphy.gif";
			four_bar_conrtrol(-20,-20,-20,-20);
			document.getElementById("warning_text").innerHTML= "核...核彈!";
			break;
		case 4:
			document.getElementById("sky").src ="https://media.giphy.com/media/xT0wlvGLHmojbeu5vq/giphy.gif";
			four_bar_conrtrol(0,-5,-5,5);
			document.getElementById("warning_text").innerHTML= "好熱...<br/>不太想動";
			break;
		case 5:
			document.getElementById("sky").src ="https://media.giphy.com/media/GPmndydM1WXHG/giphy.gif";
			four_bar_conrtrol(-5,-5,5,0);
			document.getElementById("warning_text").innerHTML= "下大雪很冷<br/>不過精神不錯";
			break;
		case 6:
			document.getElementById("sky").src ="https://media.giphy.com/media/OWS35u8VQdccM/giphy.gif";
			four_bar_conrtrol(0,0,-5,0);
			document.getElementById("warning_text").innerHTML= "起風，落葉好多<br/>";
			break;
		case 7:
			document.getElementById("sky").src ="https://media.giphy.com/media/xT8qBhrlNooHBYR9f2/giphy.gif";
			four_bar_conrtrol(5,5,5,5);
			document.getElementById("warning_text").innerHTML= "外面有點奇怪<br/>感覺好興奮";
			break;
			
	}
};
function event_end(a){
	$("#paper").click(function(){
		if(a == 1){
		if(check_dying()) /*define if die*/
		{
			game.state.start('mainpage');
		}
		$("#cover").hide();
	    $("#paper").slideToggle();
	    $(".event_title").hide();
	    $(".event_content").hide();
		event_id = getRandom(0,content_data.length-1);
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
$("#board").click(function(){
		$(".warning").hide();
		$("#cover").hide();
		trigger.eat = 1;
		setTimeout(function(){$("#board").hide("slow");}, 100);
});
$(".warning").click(function(){
		$(".warning").hide();
		$("#cover").hide();
		trigger.eat = 1;
		setTimeout(function(){$("#board").hide("slow");}, 100);

});
$("#task_button")
.bind('touchstart',function(){
	document.getElementById("task_button").style.height="10vh";
    document.getElementById("task_button").style.width="10vw";
    document.getElementById("task_button").style.top="90vh";
    document.getElementById("task_button").style.left="66vw";
})
.bind('touchend',function(){
	document.getElementById("task_button").style.height="8vh";
    document.getElementById("task_button").style.width="8vw";
    document.getElementById("task_button").style.top="92vh";
    document.getElementById("task_button").style.left="68vw";
	if(event_time > 0)
	{
		event_time--;
		document.getElementById("event_img").src="./assets/img/gogo"+event_time+".png";
		$("#paper").slideDown();
		$("#optionA").slideDown();
		$("#optionB").slideDown();
		$("#cover").show();
		$(".event_title").slideDown();
		$(".event_content").slideDown();
		$(".optionA_text").slideDown();
		$(".optionB_text").slideDown();
	}
	else if(prize == -1)
	{
		$("#cover").show();
		$("#board").show("slow");
		setTimeout(function(){$(".warning").show();}, 600);
		document.getElementById("warning_text").innerHTML="請點擊碗<br/>用轉盤選擇食物餵食竹鼠";
	}
	else
	{
		$("#cover").show();
		$("#board").show("slow");
		setTimeout(function(){$(".warning").show();}, 600);
		document.getElementById("warning_text").innerHTML="今天事件已完成<br/>請點擊睡覺結束";
	}
});
$("#ach_button")
.bind('touchstart',function(){
  document.getElementById("ach_button").style.height="10vh";
    document.getElementById("ach_button").style.width="10vw";
    document.getElementById("ach_button").style.top="90vh";
    document.getElementById("ach_button").style.left="17.5vw";
})
.bind('touchend',function(){
  document.getElementById("ach_button").style.height="8vh";
    document.getElementById("ach_button").style.width="8vw";
    document.getElementById("ach_button").style.top="92vh";
    document.getElementById("ach_button").style.left="18vw";
  $("#cover").show();
	//$("#setting").show();
	$("#return").show();
	$("#achieve").show(); 
	$('#ach_button img').attr('src', './assets/img/history.png');/*Change achieve icon to original one (no notification bell)*/
});
$("#set_button")
.bind('touchstart',function(){
  document.getElementById("set_button").style.height="10vh";
    document.getElementById("set_button").style.width="10vw";
    document.getElementById("set_button").style.top="90vh";
    document.getElementById("set_button").style.left="1.7vw";
})
.bind('touchend',function(){
  document.getElementById("set_button").style.height="8vh";
    document.getElementById("set_button").style.width="8vw";
    document.getElementById("set_button").style.top="92vh";
    document.getElementById("set_button").style.left="2vw";
   $("#cover").show();
	$("#setting").show( "slow" );
	$("#return").show("slow");
 
});
$("#end_button")
.bind('touchstart',function(){
  document.getElementById("end_button").style.height="10vh";
    document.getElementById("end_button").style.width="10vw";
    document.getElementById("end_button").style.top="90vh";
    document.getElementById("end_button").style.left="82vw";
})
.bind('touchend',function(){
	document.getElementById("end_button").style.height="8vh";
    document.getElementById("end_button").style.width="8vw";
    document.getElementById("end_button").style.top="92vh";
    document.getElementById("end_button").style.left="84vw";
	if(event_time == 0 && prize!= -1)
		trigger.end = 1;
	else
	{
		$("#cover").show();
		$("#board").show("slow");
		setTimeout(function(){$(".warning").show();}, 600);
		document.getElementById("warning_text").innerHTML="請先完成<br/>今天的事件";
	}
 
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
	$(".warning").hide();
	$("#board").hide();
	$("#frame").hide();
	$("#die_img").hide();
	$("#die_paper").hide();
  $("#die_text").hide();	
	deviceType();
});

$("#frame").click(function(){
		$("#cover").hide();
	    $("#frame").hide();
	    $("#die_paper").hide();
	    $("#die_img").hide();
	    $("#die_text").hide();
		$("#die_time").hide();
	    bar_value[0]=0;bar_value[1]=0;bar_value[2]=0;bar_value[3]=0;
	    bar_control(50,1);
	    bar_control(50,2);
	    bar_control(50,3);
	    bar_control(50,4);
		day=1;
		document.getElementById("day").innerHTML="Day 1";
});
