var running_username='fd';
$("#start_menu img[id='start_button']").click(function(e){
  e.preventDefault()
  document.getElementById("start_menu").style.display="none";
  document.getElementById("login").style.display="block";
})

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
          $("#day").text("day "+day);
          running_username=data.running_username1;
        }
      }
    })
  })

$("#save_img").click(function(e){
e.preventDefault()
document.getElementById("save_img").style.height="13%";
    document.getElementById("save_img").style.width="18%";
    document.getElementById("save_img").style.top="37vh";
    document.getElementById("save_img").style.left="24.3vw";
    setTimeout(function(){  document.getElementById("save_img").style.height="10%";
    document.getElementById("save_img").style.width="15%";
    document.getElementById("save_img").style.top="38vh";
    document.getElementById("save_img").style.left="25vw"; }, 200);
$.ajax({
  method: "get",
  url: "./save",
  data:{
    health1: bar_value[0],
    force1: bar_value[1],
    charm1: bar_value[2],
    mood1: bar_value[3],
    day1:day,
    Username:running_username
  },
  success: function(data){
    
  
  }
})
})


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

