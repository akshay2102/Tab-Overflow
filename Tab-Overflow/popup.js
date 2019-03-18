// document.addEventListener("DOMContentLoaded", function(){
// 	var btn = document.getElementById('btn');
// 	btn.addEventListener("click", function(){
// 		var url = "chrome-extension://"+chrome.runtime.id+"/home.html";
// 		chrome.tabs.create({url: url});
// 	});
// });

document.addEventListener("DOMContentLoaded", function(){
	// var btn = document.getElementById('btn');
	/*
	btn.addEventListener("click", function(){
		var url = "chrome-extension://"+chrome.runtime.id+"/home.html";
		chrome.tabs.create({url: url});
	});
	*/
	//console.log("dom content listener");
	//alert("dom content");

	document.getElementById("login_button").onclick = function() {
		document.getElementById("login_form_div").style.display = "block";
		document.getElementById("signup_form_div").style.display = "none";
	};

	document.getElementById("signup_button").onclick = function() {
		document.getElementById("signup_form_div").style.display = "block";
		document.getElementById("login_form_div").style.display = "none";
	};

	document.getElementById("login_submit").onclick = function() {
		//alert("inside btn click");
		//console.log("inside btn click");
		var uname = document.getElementById('login_emailId').value;
		// var pass = document.getElementById('login_password').value;
		//alert(uname+" "+pass);
		checkValidity(uname,"");

	};

	document.getElementById("signup_submit").onclick = function() {
		//alert("inside btn click");
		//console.log("inside btn click");
		var uname = document.getElementById('signup_emailId').value;
		var pass = document.getElementById('signup_password').value;
		//alert(uname+" "+pass);
		//checkValidity(uname,pass);
		// document.getElementById("yet_to_login").style.display = "none";
		// document.getElementById("loggedin").style.display = "block";
		// var url = "chrome-extension://"+chrome.runtime.id+"/home.html";
		// chrome.tabs.create({url: url});
		var key = getvalidkey(uname);
		chrome.storage.sync.set({"loggedinuser":key}, function() {
				document.getElementById("yet_to_login").style.display = "none";
				document.getElementById("loggedin").style.display = "block";
				var url = "chrome-extension://"+chrome.runtime.id+"/home.html";
				chrome.tabs.create({url: url});
				// document.getElementById("yet_to_login").style.display = "none";
				// document.getElementById("loggedin").style.display = "block";
				//alert('valid user');
			});


	};



	// var login_btn = document.getElementById('login_submit');
	// login_btn.addEventListener("click", function(){
	// 	console.log("aasadada");
	// 	var uname = document.getElementById('login_emailId');
	// 	var pass = document.getElementById('login_password');
	// 	checkValidity(uname,pass);
	// });
});