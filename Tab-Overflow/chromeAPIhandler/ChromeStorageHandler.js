function addtostorage(data){
	chrome.storage.sync.set({'database': JSON.stringify(data)}, function(){
        console.log('Value' + ' is set to ' + data);
     });
}

function getfromstorage(){
	chrome.storage.sync.get('database', function(result){
		var obj = result.database;
		console.log('Value is ' + obj);
		obj=JSON.parse(obj);
	});
}

// function removefromstorage(key){
// 	chrome.storage.sync.remove(key, function(){

// 	});
// }

function addActivity(activity){
	chrome.storage.sync.get('database', function(result){
		var obj=JSON.parse(result.database);
		obj[activity] = {};
		addtostorage(obj);
		// console.log('Value is ' + obj["activities"]["tasks"]);
	});
}

function getActivities(){
	chrome.storage.sync.get('database', function(result){
		var obj=JSON.parse(result.database);
		// console.log('Value is ' + obj["activities"]["tasks"]);
		var names = [];
		for(var key in obj){
			// console.log(obj[key]);
			names.push(obj[key]);
		}
		console.log(names);
	});
}

function addTask(activity, task){
	chrome.storage.sync.get('database', function(result){
		var obj=JSON.parse(result.database);
		obj[activity][task] = {};
		addtostorage(obj);
		// console.log('Value is ' + obj["activities"]["tasks"]);
	});
}

function addURI(activity, task, id, url){
	chrome.storage.sync.get('database', function(result){
		var obj=JSON.parse(result.database);
		obj[activity][task][id] = url;
		addtostorage(obj);
		// console.log('Value is ' + obj["activities"]["tasks"]);
	});
}