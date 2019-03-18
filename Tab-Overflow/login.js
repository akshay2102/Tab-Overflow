var database;
var emailid = "jaineel.ns@somaiya.edu";
database = initialize();
// addemailid(database,emailid);

function initialize() {
	
	// Initialize Firebase
	
	var config = {
		apiKey: "AIzaSyDaNbzEFqZipyNCwPtpw0DvaE2JfRyVibg",
		authDomain: "myawesomeproject-6f21b.firebaseapp.com",
		databaseURL: "https://myawesomeproject-6f21b.firebaseio.com",
		projectId: "myawesomeproject-6f21b",
		storageBucket: "myawesomeproject-6f21b.appspot.com",
		messagingSenderId: "246510264117"
	};
	firebase.initializeApp(config);
  
	console.log(firebase);
  
	database = firebase.database();
	
	return database;
}

function getvalidkey(key) {
	
	//Getting valid key by removing ".", "#", "$", "[", or "]" from the key
	
	var validkey="";
	
	for(var i=0;i<key.length;i++) {
		if(key[i]!="." && key[i]!="#" && key[i]!="$" && key[i]!="[" && key[i]!="]") {
			validkey=validkey.concat(key[i]);
		}
	}
	
	return validkey;
	
}

//changes
function checkValidity(username, password){
	var ref = database.ref();
	var key = getvalidkey(username);
	ref.once('value').then(function(snapshot){
		//alert(key);
		//console.log(key);

		if(snapshot.hasChild(key)) {
			chrome.storage.sync.set({"loggedinuser":key}, function() {
				document.getElementById("yet_to_login").style.display = "none";
				document.getElementById("loggedin").style.display = "block";
				var url = "chrome-extension://"+chrome.runtime.id+"/home.html";
				chrome.tabs.create({url: url});
				// document.getElementById("yet_to_login").style.display = "none";
				// document.getElementById("loggedin").style.display = "block";
				//alert('valid user');
			});
		}
		else {
			alert("Invalid username or password");
		}
		
	});
}