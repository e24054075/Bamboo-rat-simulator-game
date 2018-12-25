var volume_slider = document.getElementById("volume_slider");
var bamboorat1_voice = document.getElementById("bamboorat1");

volume_slider.oninput = function() {
	bamboorat1_voice.load();
	bamboorat1_voice.volume = volume_slider.value/100;
	bamboorat1_voice.play();
}




/*data saving !*/
$("#save_img").click(function(){

})
