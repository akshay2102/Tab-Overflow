document.addEventListener("DOMContentLoaded", function(){
	var btn = document.getElementById('btn');
	btn.addEventListener("click", function(){
		var url = "chrome-extension://"+chrome.runtime.id+"/home.html";
		chrome.tabs.create({url: url});
	});
});