var arch_data = [
[1,"呱呱墜地","誕生第一隻竹署",0],
[2,"頭好壯壯","健康百分百",0],
[3,"風起雲湧","打贏其他竹鼠",0],
[4,"安然無恙","平安度過第一個夜晚",0],
[5,"有毒食品","誤食核廢料",0]
];

/*load achieve content*/
$("#achieve").ready(function(){
    var achieve_num = arch_data.length;
	var i;
	var css_grid_row = "";
	for(i = 0 ; i < achieve_num ; i++){
		/*create achieve icon container*/
		var ach_div_icon = document.createElement("div");
		ach_div_icon.className = "achieve_icon";

		/*create achieve icon element*/
		var ach_img = document.createElement("IMG");
		ach_img.className = "achieve_icon_img";
		ach_img.src = "./assets/img/arch/arch"+arch_data[i][0]+".png";
		ach_div_icon.appendChild(ach_img);

		/*create achieve title container*/
		var ach_div_title = document.createElement("div");
        ach_div_title.className = "achieve_title";
        
        var ach_title_text_container = document.createElement("p");
        var ach_title_text = document.createTextNode(arch_data[i][1]);
        ach_title_text_container.appendChild(ach_title_text);
        ach_div_title.appendChild(ach_title_text_container);

		/*create achieve content container*/
		var ach_div_content = document.createElement("div");
        ach_div_content.className = "achieve_content";
        
        var ach_content_text_container = document.createElement("p");
        var ach_content_text = document.createTextNode(arch_data[i][2]);
        ach_content_text_container.appendChild(ach_content_text)
        ach_div_content.appendChild(ach_content_text_container);

		$("#achieve").append(ach_div_icon,ach_div_title,ach_div_content);
		css_grid_row = css_grid_row + "12%";
	}
	$(".achieve_container").css("grid-template-rows",css_grid_row);
})

/*show achieve page*/ 
$("#achieve_btn").click(function(){
	$("#achieve").show();
})