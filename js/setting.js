var volume_slider = document.getElementById("volume_slider");
var bamboorat1_voice = document.getElementById("bamboorat1");
var bamboorat2_voice = document.getElementById("bamboorat1");
bamboorat2_voice.autoplay();
volume_slider.oninput = function() {
	//bamboorat1_voice.load();
	bamboorat1_voice.volume = volume_slider.value/100;
	bamboorat2_voice.volume = volume_slider.value/100;
	bamboorat1_voice.play();
}

