var volume_slider = document.getElementById("volume_slider");
var bamboorat1_voice = document.getElementById("bamboorat1");
var bamboorat2_voice = document.getElementById("bamboorat2");
bamboorat2_voice.preload="auto";
bamboorat1_voice.load();
bamboorat2_voice.load();

bamboorat2_voice.autoplay=true;
bamboorat2_voice.loop = true;


volume_slider.oninput = function() {
	//bamboorat1_voice.load();
	bamboorat1_voice.volume = volume_slider.value/100;
	bamboorat2_voice.volume = volume_slider.value/100;
	bamboorat1_voice.play();
}

