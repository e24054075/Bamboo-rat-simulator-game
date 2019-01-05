var running_username='fd';
$("#start_menu img[id='start_button']").click(function(e){
  e.preventDefault()
  document.getElementById("start_menu").style.display="none";
  document.getElementById("login").style.display="block";
})
  //login and get data from sql
  $("#user img[id='user_summit']").click(function(e){
    e.preventDefault()
    
    $.ajax({
      method: "get",
      url: "./certify",
      data:{
        username: $("#user input[id='username_input']").val(),
        password: $("#user input[id='password_input']").val()
      },
      success: function(data){
        $("#user_output").html(data.word)
        if(data.word=="ok")
        {
          document.getElementById("login").style.display="none";
          four_bar_conrtrol(data.health1-50,data.force1-50,data.charm1-50,data.mood1-50);
          day=data.day1;
          ach_status=data.ach_status1;
          $("#day").text("day "+day);
          running_username=data.running_username1;
          ach_data_ready();
        }
      }
    })
  })

$("#save_img")
.bind('touchstart',function(){
  document.getElementById("save_img").style.height="33%";
    document.getElementById("save_img").style.width="82%";
    document.getElementById("save_img").style.top="27vh";
    document.getElementById("save_img").style.left="6.5vw";
})
.bind('touchend',function(){
  document.getElementById("save_img").style.height="30%";
  document.getElementById("save_img").style.width="80%";
  document.getElementById("save_img").style.top="28vh";
  document.getElementById("save_img").style.left="6.9vw"; 
  $.ajax({
  method: "get",
  url: "./save",
  data:{
    health1: bar_value[0],
    force1: bar_value[1],
    charm1: bar_value[2],
    mood1: bar_value[3],
    ach_status1: ach_status,
    day1:day,
    Username:running_username
  },
  success: function(data){
    
  
  }
})
});


$("#user img[id='register']").click(function(e){
  e.preventDefault()
  document.getElementById("login").style.display="none";
  document.getElementById("enroll").style.display="block";

})

$("#enroll img[id='register_return']").click(function(e){
  e.preventDefault()
  document.getElementById("login").style.display="block";
  document.getElementById("enroll").style.display="none";

})


 $("#enroll img[id='new_register']").click(function(e){
    e.preventDefault()
    
    $.ajax({
      method: "get",
      url: "./enroll",
      data:{
        Username: $("#enroll input[id='new_username_input']").val(),
        Password: $("#enroll input[id='new_password_input']").val()
      },
      success: function(data){
        $("#new_user_output").html(data)
        if(data=="OK")
        {
          document.getElementById("enroll").style.display="none";
          document.getElementById("login").style.display="block";
        }
      }
    })
  })

