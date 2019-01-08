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

function preloadGIF(){
	var image1 = new Image();
	image1.src = "https://media.giphy.com/media/l0Ex63LkzqLu8aTF6/giphy.gif";
	var image2 = new Image();
	image2.src = "https://media.giphy.com/media/LNDBTeQl8lhTO/giphy.gif";
	var image3 = new Image();
	image3.src = "https://media.giphy.com/media/3osxYzIQRqN4DOEddC/giphy.gif";
	var image4 = new Image();
	image4.src = "https://media.giphy.com/media/3oz8xsX51J7VCWOzTi/giphy.gif";
	var image5 = new Image();
	image5.src = "https://media.giphy.com/media/xT0wlvGLHmojbeu5vq/giphy.gif";
	var image6 = new Image();
	image6.src = "https://media.giphy.com/media/GPmndydM1WXHG/giphy.gif";
	var image7 = new Image();
	image7.src = "https://media.giphy.com/media/OWS35u8VQdccM/giphy.gif";
	var image8 = new Image();
	image8.src = "https://media.giphy.com/media/xT8qBhrlNooHBYR9f2/giphy.gif";
}