var ach_data = [
	[1, "呱呱墜地"     ,"誕生第一隻竹署",1],
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
	[12,"我盡力了"     ,"死亡前生存十天以上",0],
	[13,"Gold Class"  ,"死亡前生存三十天以上",0],
	[14,"超載"         ,"我太胖了",0],
	[15,"烤肉派對2"    ,"參加烤鄰居竹鼠的派對",0],
	[16,"一代宗師"     ,"武力百分百",0],
	[17,"全場焦點"     ,"注目度百分百",0]
	];
	
	/*load achieve content*/
	$("#achieve").ready(function(){
		var achieve_num = ach_data.length;
		var i;
		var css_grid_row = "";
		for(i = 0 ; i < achieve_num ; i++){
			/*create achieve icon container*/
			var ach_div_icon = document.createElement("div");
			ach_div_icon.className = "achieve_icon";
	
			/*create achieve icon element*/
			var ach_img = document.createElement("IMG");
			ach_img.className = "achieve_icon_img";
			ach_img.src = "./assets/img/ach/ach"+ach_data[i][0]+".png";
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
			if(ach_data[i][3] == 1) ach_content_text = document.createTextNode(ach_data[i][2]);
			else 					ach_content_text = document.createTextNode("LOCKED");
			
			
			ach_content_text_container.appendChild(ach_content_text)
			ach_div_content.appendChild(ach_content_text_container);
	
			$("#achieve").append(ach_div_icon,ach_div_title,ach_div_content);
			css_grid_row = css_grid_row + "12%";
		}
		$(".achieve_container").css("grid-template-rows",css_grid_row);
	})
	function check_ach_bar(){
		if(bar_value[0] == 100){
			Unlock_ach(1);
		}
		if(bar_value[1] == 100){
			Unlock_ach(15);
		}
		if(bar_value[3] == 100){
			Unlock_ach(16);
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
	function Unlock_ach(index) {/*start from 0*/
		ach_data[index][3] = 1;
		$("#achieve div:nth-child("+(index+1)*3+") p").text(ach_data[index][2]);/*select ach content p element*/ 
	}