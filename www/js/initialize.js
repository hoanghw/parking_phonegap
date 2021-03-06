var app = {
	
	findLoggedInUser: function() {
		console.log("app.findLoggedInUser() called");
		this.store.findLoggedInUser(function (result) {
			console.log("findLoggedInUser result: " + result);
			if (result != null) {
				window.location.href= "profile.html";
			} else {
				$(".main").css("visibility","visible");
				$("#spinning").hide();
			}
		});
	},

    initialize: function() {
        this.store = new WebSqlStore();
        this.findLoggedInUser();
    }
};

if (window.openDatabase){
	//app.initialize();
}else{
	//$(".main").css("visibility","visible");
	//$("#spinning").hide();
}

var storage = window.localStorage;
if (storage.getItem("isLoggedIn") != null) {
	window.location.href= "profile.html";
} else {
	$(".main").css("visibility","visible");
	$("#spinning").hide();
}

$("#signIn").submit(function(e) {
    e.preventDefault();
	//window.location.href= "profile.html";
	handleLogin();
});

function handleLogin() {
    var form = $("#signIn");    
    //disable the button so we can't resubmit while we wait
    $("#submitBtn",form).attr("disabled","disabled");
    var u = $("#inputUsername", form).val();
    var p = $("#inputPassword", form).val();
    console.log("click");
    if(u != '' || p != '') {
        $.get(SERVER_URL+"usignin/", {username:u,password:p}, function(data, textStatus, jqXHR) {
            if(data.user) {
                window.localStorage["username"] = u;
                window.localStorage["password"] = p;
				window.localStorage["isLoggedIn"] = true;            
                window.location.href="profile.html";
            } else {
            	$("#loginMessages").text("Please enter correct username and password"); 
            }
         $("#submitBtn").removeAttr("disabled");
        },"json");
    } else {
        $("#loginMessages").text("Please enter username and password");
        $("#submitBtn").removeAttr("disabled");
    }
}




