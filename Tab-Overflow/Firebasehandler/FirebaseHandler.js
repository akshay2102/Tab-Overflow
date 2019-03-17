/*
var ref=database.ref("players/A");
//emailid/activity/taskname/task1

ref.push ({
John1: {
number: 1,
age: 30
},

Amanda1: {
number: 2,
age: 20
}
});
*/

var database;
var emailid = "jaineel.ns@somaiya.edu";
database = initialize();
addemailid(database,emailid);

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

/*
function addemailid(database,emailId) {
	var ref=database.ref(getvalidkey(emailId));
	ref.push({emailid:emailId});
}
*/


function addemailid(database,emailId) {
	var ref = database.ref();
		
	console.log("11111111 "+emailId);
	emailId=getvalidkey(emailId);
	ref.once('value').then(function(snapshot){
			console.log("22222211111111 "+emailId);
			if(!snapshot.hasChild(emailId)) {
				console.log(emailId+" Added");
				var ref1=database.ref(getvalidkey(emailId));
				ref1.push({emailid:emailId});
				addactivity(database,emailId,"default_activity_123");
			}
			else {
				console.log("Emailid exists");
			}
			
    });
	
}


function getemailids(database,id) {
	var ref = firebase.database().ref();
	
	var keys=[];
	var values=[];
	
	ref.once('value').then(function(snapshot){
		var i=1;
			snapshot.forEach(function(childSnapshot){
			k = childSnapshot.key;
			document.getElementById(id).innerHTML = k;
			i++;
		});
    });
}


/*
function addactivity(database,emailid,activity) {
	var ref=database.ref(getvalidkey(emailid+"/"+activity));
	ref.push({activity:activity});
}
*/


function addactivity(database,emailId,activity) {
	var ref = database.ref(getvalidkey(emailId));
		
	activity=getvalidkey(activity);
	console.log("11111111 "+activity);
	ref.once('value').then(function(snapshot){
			console.log("222222211111111 "+activity);
			if(!snapshot.hasChild(activity)) {
				console.log(activity+" Added");
				var ref1=database.ref(getvalidkey(emailId+"/"+activity));
				ref1.push({activity:activity});
				addtask(database,emailId,activity,"default_task_123");
			}
			else {
				console.log("Activity exists");
			}
			
    });
	
}


function getactivities(database,emailid,id) {
	var ref = firebase.database().ref(emailid);
	
	var keys=[];
	var values=[];
	
	ref.once('value').then(function(snapshot){
		var i=1;
			snapshot.forEach(function(childSnapshot){
			k = childSnapshot.key;
			document.getElementById(id).innerHTML = k;
			i++;
		});
    });
}


function removeactivity(database,emailid,activity) {
	var ref=database.ref(getvalidkey(emailid));
	ref.child(activity).remove();
}


function renameactivity(database,emailid,oldactivity,newactivity) {
	console.log("11111111115555 "+JSON.stringify(globaldatabase[newactivity]));
	//console.log("11111111115555 "+JSON.stringify(globaldatabase[emailid]));
	addactivity(database,emailid,newactivity);
	for(var task in globaldatabase[newactivity]) {
		console.log("121212 "+key+" "+globaldatabase[newactivity][key]);
		addtask(database,emailid,newactivity,task);
		for(var id in globaldatabase[newactivity][task]) {
			for(var url in globaldatabase[newactivity][task][id]) {
				addURL(database,emailid,newactivity,task,id,globaldatabase[newactivity][task][id]);
			}
		}
		
	} 	
	removeactivity(database,emailid,oldactivity);
}


function renametask(database,emailid,activity,oldtask,newtask) {
	console.log("11111111115555 "+JSON.stringify(globaldatabase[activity]));
	//console.log("11111111115555 "+JSON.stringify(globaldatabase[emailid]));
	addtask(database,emailid,activity,newtask);
	for(var id in globaldatabase[activity][newtask]) {
		console.log("121212 "+key+" "+globaldatabase[activity][newtask][id]);
		for(var url in globaldatabase[activity][newtask][id]) {
				addURL(database,emailid,activity,newtask,id,globaldatabase[activity][newtask][id]);
			}
	} 	
	removetask(database,emailid,activity,oldtask);
}



function shareactivity(database,emailid1,emailid2,activity) {
	//console.log("11111111115555 "+JSON.stringify(globaldatabase[newactivity]));
	//console.log("11111111115555 "+JSON.stringify(globaldatabase[emailid]));
	emailid1=getvalidkey(emailid1);
	emailid2=getvalidkey(emailid2);
	addactivity(database,emailid2,activity);
	for(var task in globaldatabase[activity]) {
		//console.log("121212 "+key+" "+globaldatabase[newactivity][key]);
		addtask(database,emailid2,activity,task);
		for(var id in globaldatabase[activity][task]) {
			for(var url in globaldatabase[activity][task][id]) {
				addURL(database,emailid2,activity,task,id,globaldatabase[activity][task][id]);
			}
		}
		
	} 	
}


function sharetask(database,emailid1,emailid2,activity,task) {
	//console.log("11111111115555 "+JSON.stringify(globaldatabase[newactivity]));
	//console.log("11111111115555 "+JSON.stringify(globaldatabase[emailid]));
	emailid1=getvalidkey(emailid1);
	emailid2=getvalidkey(emailid2);
	var shared_activity=task;
	alert(emailid1+"  " + emailid2);
	addactivity(database,emailid2,shared_activity);
	addtask(database,emailid2,shared_activity,task);
		for(var id in globaldatabase[activity][task]) {
			for(var url in globaldatabase[activity][task][id]) {
				addURL(database,emailid2,shared_activity,task,id,globaldatabase[activity][task][id]);
			}
		}	
	 	
}





/*
function addtask(database,emailid,activity,task) {
	var ref=database.ref(getvalidkey(emailid+"/"+activity+"/"+task));
	ref.push({task:task});
}
*/

function addtask(database,emailId,activity,task) {
	var ref = database.ref(getvalidkey(emailId+"/"+activity));
		
	task=getvalidkey(task);
	ref.once('value').then(function(snapshot){
			if(!snapshot.hasChild(task)) {
				console.log(task+" Added");
				var ref1=database.ref(getvalidkey(emailId+"/"+activity+"/"+task));
				ref1.push({task:task});
				addURL(database,emailId,activity,task,"default_id_123","1");
			}
			else {
				console.log("Task exists");
			}
			
    });
	
}



function gettasks(database,emailid,activity,id) {
	var ref = firebase.database().ref(emailid+"/"+activity);
	
	var keys=[];
	var values=[];
	
	ref.once('value').then(function(snapshot){
		var i=1;
			snapshot.forEach(function(childSnapshot){
			k = childSnapshot.key;
			document.getElementById(id).innerHTML = k;
			i++;
		});
    });
}
      

function removetask(database,emailid,activity,task) {
	var ref=database.ref(getvalidkey(emailid+"/"+activity));
	ref.child(task).remove();
}



/*
function addURL(database,emailid,activity,task,URL) {
	var ref=database.ref(getvalidkey(emailid+"/"+activity+"/"+task+"/"+URL));
	ref.set({URL:URL});
}
*/


function addURL(database,emailId,activity,task,id,url) {
	var ref=database.ref(getvalidkey(emailId+"/"+activity+"/"+task));
		
	id=getvalidkey(id);
	console.log(id+" "+getvalidkey(emailId+"/"+activity+"/"+task))
	ref.once('value').then(function(snapshot){
			if(!snapshot.hasChild(id)) {
				console.log(id+" Added");
				console.log(id+" "+url);
				var ref1=database.ref(getvalidkey(emailId+"/"+activity+"/"+task+"/"+id));
				console.log(ref1);
				ref1.set({URL:url});
			}
			else {
				console.log("URL exists");
			}
			
    });

}



function getURLS(database,emailid,activity,task,id) {
	var ref = firebase.database().ref(emailid+"/"+activity+"/"+"task");
	
	var keys=[];
	var values=[];
	
	ref.once('value').then(function(snapshot){
		var i=1;
			snapshot.forEach(function(childSnapshot){
			k = childSnapshot.key;
			document.getElementById(id).innerHTML = k;
			i++;
		});
    });
}


function removeURL(database,emailid,activity,task,URL) {
	var ref=database.ref(getvalidkey(emailid+"/"+activity+"/"+task));
	ref.child(URL).remove();
}


function getAllData(database,emailid) {
	var ref = firebase.database().ref(emailid);
	
	var keys=[];
	var values=[];
	
	ref.once('value').then(function(snapshot){
		var i=1;
		snapshot.forEach(function(childSnapshot){
			k = childSnapshot.key;
			console.log(k);
			var j=1;
			childSnapshot.forEach(function(childchildSnapshot){
				k = childchildSnapshot.key;
				console.log(k);
				j++;
			});
			
			i++;
		});
    });
}

/*
function firebasetolocalstorage() {
	var ref=firebase.database().ref(getvalidkey(emailid));
		
	ref.on('value',function(snapshot){
		console.log(snapshot.numChildren());
		snapshot.forEach(function(snapshot_activities){
			// console.log(snapshot.numChildren());
			var activity=snapshot_activities.key;
			if(activity[0]!="-") {
				console.log(activity);
				snapshot_activities.forEach(function(snapshot_tasks){
					var task=snapshot_tasks.key;
					if(task[0]!="-") {
						console.log(task);
						snapshot_tasks.forEach(function(snapshot_urlids){
							var urlid=snapshot_urlids.key;
							if(urlid[0]!="-") {
								console.log(urlid);
								snapshot_urlids.forEach(function(snapshot_urls){
									var urlid=snapshot_urls.key;
									var v=snapshot_urls.val();
										console.log(urlid+" "+v);
								});
							}
						});
					}
				});
			}
		});
    });	
}
*/


function firebasetolocalstorage() {
	var ref=firebase.database().ref(getvalidkey(emailid));
		
	ref.once('value').then(function(snapshot){
		console.log(snapshot.numChildren());
		var i=0;
		//var total_activities=snapshot.numChildren();
		snapshot.forEach(function(snapshot_activities){
			// console.log(snapshot.numChildren());
			var activity=snapshot_activities.key;
			if(activity[0]!="-") {
				if(activity!="default_activity_123") {
					globaldatabase[activity]={};
				}
				console.log(activity);
				var j=0;
				snapshot_activities.forEach(function(snapshot_tasks){
					var task=snapshot_tasks.key;
					if(task[0]!="-") {
						if(task!="default_task_123") {
							globaldatabase[activity][task]={};
						}
						console.log(task);
						var k=0;
						snapshot_tasks.forEach(function(snapshot_urlids){
							var urlid=snapshot_urlids.key;
							console.log("aaaa "+k+" "+urlid);
							if(urlid[0]!="-") {
								console.log(urlid);
								var l=0;
								snapshot_urlids.forEach(function(snapshot_urls){
									var url=snapshot_urls.key;
									var v=snapshot_urls.val();
									if(urlid!="default_id_123") {
										globaldatabase[activity][task][urlid]=v;
									}
									console.log(url+" "+v);
									console.log(i,j,k,l);
									console.log(snapshot.numChildren()+" "+snapshot_activities.numChildren()+" "+snapshot_tasks.numChildren()+" "+snapshot_urlids.numChildren());
									console.log(i==snapshot.numChildren()-2 && j==snapshot_activities.numChildren()-2 && k==snapshot_tasks.numChildren()-2);
									if(i==snapshot.numChildren()-2 && j==snapshot_activities.numChildren()-2 && k==snapshot_tasks.numChildren()-2) {
										console.log(i,j,k,l);
										load_activities();
										console.log("");
										console.log("");
										console.log("");
										console.log("");
										console.log("");
									}
									l++;
								});
							k++;
							}
						});
					j++;
					}
				});
			
			i++;
			}
			
			/*
			if(i==total_activities) {
				
			}
			*/
			
		});
    });	
}

/*
function addtoanotheraccount(database,emailid1,emailid2) {
	var ref1=database.ref(emailid1);
	var ref2=database.ref(emailid2);
	
	
	ref1.on('value',function(snapshot){
		ref2.push(snapshot.val());
    });
	
}
*/


function removeempty() {}

// initialize();
console.log(8888881111111);
firebasetolocalstorage();

document.addEventListener("DOMContentLoaded", function(){
	//initialize();
	//addemailid(database,emailid);
	//addactivity(database,emailid,"Study");
	//addemailid(database,emailid);
	//addtask(database,emailid,"Study","Stackoverflow");
	//addURL(database,emailid,"Study","Stackoverflow","1","https://stackoverflow.com/");
	//addURL(database,emailid,"Study","Stackoverflow","2","https://stackoverflow.com/questions/55189704/nodejs-crypto-fails-to-verify-signature-created-by-web-crypto-api");
	//addURL(database,emailid,"Study","Stackoverflow","3","https://stackoverflow.com/questions/55180829/python-if-else-code-style-for-reduced-code");
	//firebasetolocalstorage();
	
	// addtostorage(d);
	// getfromstorage();
	
	// getfromstorage();
});