var user_ach_data = "";/*User achieve data used in this js file (BIN format)*/
var loaded = 0;			/*For debug*/ 
var ach_data = [
	[1, "呱呱墜地"     ,"誕生第一隻竹署",2],
	[2, "頭好壯壯"     ,"健康百分百",0],
	[3, "風起雲湧"     ,"打贏其他竹鼠",0],
	[4, "安然無恙"     ,"平安度過第一個夜晚",0],
	[5, "有毒食品"     ,"誤食核廢料",0],
	[6, "成為網紅"     ,"被主人放上網路",0],
	[7, "馬鈴鼠燉肉"   ,"變成主人的晚餐",0],
	[8, "烤肉派對"     ,"(被)參加烤肉派對",0],
	[9, "鼠生好難"     ,"第一次死亡",0],
	[10,"我想活下去"   ,"第五次死亡",0],
	[11,"國父革命"     ,"第十次死亡",0],
	[12,"我盡力了"     ,"生存十天以上",0],
	[13,"Gold Class"  ,"生存三十天以上",0],
	[14,"福氣"         ,"我太胖了",0],
	[15,"烤肉派對2"    ,"參加烤鄰居竹鼠的派對",0],
	[16,"黑道老大"     ,"武力百分百",0],
	[17,"全場焦點"     ,"注目度百分百",0],
	[18,"笑容滿面"	   ,"嗨過頭 是不是嗑太多了",0],
	[19,"鬱鬱寡歡"     ,"我沒有憂鬱!!!!",0],
	[20,"杜絕鼠瘟"	   ,"我沒有得病!!!!",0],
	[21,"東亞病鼠"	   ,"弱肉強食",0],
	[22,"臭邊緣"       ,"沒有人在乎我",0]
	];
	
	/*uncomment below if no database*/
	$("#achieve").ready(function(){
		ach_data_ready();
	})

	/*load achieve content and user data*/
	function ach_data_ready(){
		if(loaded)	$("#achieve div").remove();
		else 		loaded = 1;
		/*Prepare User data first */
		user_ach_data = parseInt(ach_status,16).toString(2);		/*Parse user achieve data from HEX to BIN format*/
		user_ach_data = paddingRight(user_ach_data,ach_data.length);/*Status: [low index]1000000000[high index] */
		/*Load Achieve Content */
		var i;
		var css_grid_row = "";
		for(i = 0 ; i < ach_data.length ; i++){
			/*Load DB data to local*/
			if(user_ach_data[i] == 1){
				ach_data[i][3] = 2;
			}

			/*create achieve icon container*/
			var ach_div_icon = document.createElement("div");
			ach_div_icon.className = "achieve_icon";
	
			/*create achieve icon element*/
			var ach_img = document.createElement("img");
			ach_img.className = "achieve_icon_img";
			if(user_ach_data[i] == 1)	ach_img.src = "./assets/img/ach/ach"+ach_data[i][0]+".png";
			else						ach_img.src = "./assets/img/ach/ach00.png";
			ach_div_icon.appendChild(ach_img);

			/*create achieve title container*/
			var ach_div_title = document.createElement("div");
			ach_div_title.className = "achieve_title";
				var ach_title_text_container = document.createElement("p");
				var ach_title_text = document.createTextNode(ach_data[i][1]);
				ach_title_text_container.appendChild(ach_title_text);
			ach_div_title.appendChild(ach_title_text_container);
	
			/*create achieve content container*/
			var ach_div_content = document.createElement("div");
			ach_div_content.className = "achieve_content";
				var ach_content_text_container = document.createElement("p");
				var ach_content_text;
				if(user_ach_data[i] == 1) ach_content_text = document.createTextNode(ach_data[i][2]);
				else 					ach_content_text = document.createTextNode("LOCKED");
				ach_content_text_container.appendChild(ach_content_text)
			ach_div_content.appendChild(ach_content_text_container);
	
			$("#achieve").append(ach_div_icon,ach_div_title,ach_div_content);
			css_grid_row = css_grid_row + "12%";
		}
		$(".achieve_container").css("grid-template-rows",css_grid_row);
		/*register icon onclick event*/
		$(".achieve_icon").click(function(){
			User_click($(this).index());/*Parse achieve index*/
		})
	}

	/**********************************************************************************/
	/***********************Below Are Achieve Handler Functions************************/
	/**********************************************************************************/
	function check_ach_bar(){
		if(bar_value[0] == 100){
			Unlock_ach(1);
		}
		if(bar_value[1] == 100){
			Unlock_ach(15);
		}
		if(bar_value[2] == 100){
			Unlock_ach(7);
			Unlock_ach(17);
    	}
		if(bar_value[3] == 100){
     		 Unlock_ach(16);
		}
		if(bar_value[0] == 0){

		}
		if(bar_value[1] == 0){

		}
		if(bar_value[2] == 0){
			Unlock_ach(18);
		}
		if(bar_value[3] == 0){

		}
	}
	function check_ach_day(){
		switch(day){
			case 2:
				Unlock_ach(3);
				break;
			case 10:
				Unlock_ach(11);
				break;
			case 30:
				Unlock_ach(12);
				break;
			default:
				break;
		}
	}
	function check_ach_size(){
		if(rat_scale >1){
			Unlock_ach(13);
		}
	}
	function check_ach_dietimes(){
		switch(die_times){
			case 1:
				Unlock_ach(8);
				break;
			case 5:
				Unlock_ach(9);
				break;
			case 10:
				Unlock_ach(10);
				break;
		}
	}
	function Unlock_ach(index) {/*start from 0*/
		if(ach_data[index][3] != 0){
			return;
		}
		ach_data[index][3] = 1;
		user_ach_data = Str_ReplaceAt(user_ach_data,index,'1');/*Modify user achieve data(binary format)*/
		ach_status = parseInt(user_ach_data,2).toString(16);   /*Writeback to var defined in main js(hex format)*/
		$("#achieve div:nth-child("+((index)*3+1)+") img").attr('src', './assets/img/ach/ach01.png');
		$("#achieve div:nth-child("+(index+1)*3+") p").text(ach_data[index][2]);/*select ach content p element and open it*/ 
		$('#ach_button img').attr('src', './assets/img/history_new.png');
	}

	/**********************************************************************************/
	/***********************Below Are user interact Functions**************************/
	/**********************************************************************************/
	function User_click(index){
		var i = index/3;
		var selector = $("#achieve div:nth-child("+(index+1)+") img");
		if(ach_data[i][3] != 1){
			return;
		}
		ach_data[i][3] = 2;
		selector.slideUp("fast",function(){
			selector.attr('src', "./assets/img/ach/ach"+ach_data[i][0]+".png");
			selector.slideToggle("fast");
		});
	}

	/**********************************************************************************/
	/***********************Below Are String Operation Functions***********************/
	/**********************************************************************************/
	function paddingRight(str,lenght){/*Make 0x1000 to 0x10000000*/
		if(str.length >= lenght)
		return str;
		else
		return paddingRight(str+"0",lenght);
	}
	function Str_ReplaceAt(str,index,replacement){
		return str.substr(0, index) + replacement+ str.substr(index + replacement.length);
	}
