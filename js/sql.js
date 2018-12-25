
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
        Username: $("#user input[id='username_input']").val(),
        Password: $("#user input[id='password_input']").val()
      },
      success: function(data){
        $("#user_output").html(data)
        if(data=="OK")
        {
          document.getElementById("login").style.display="none";
        }
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

