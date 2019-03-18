// chrome.runtime.onMessage.addListener(
// 	function(request, sender, sendResponse){

// 	});

var tabs = [];
var tab_ids = [];
var tab_titles = [];
var current_taskname="";
current_task = ""; //by amit

document.addEventListener("DOMContentLoaded", function(){
	chrome.windows.getAll({populate:true}, getAllOpenWindows);
	// populateList();

	document.getElementById("body_tag").onload = function() {
		load_activities();
	}

	document.getElementById("select_activity").onchange = function() {
		get_activity_name();
	}

	document.getElementById("add_new_task").onclick = function() {
		add_new_task(this);
	}

	document.getElementById('s-b-1').addEventListener("click", function() {
		sortNN();
	});
	document.getElementById('s-b-2').addEventListener("click", function(){
		sort();
		// console.log("aaaaaaaaaaaaaaaaaaaaaaaaa"+globaldatabase);
		//shareactivity(database,emailid,"akshay.kotak@somaiya.edu","Study");
		// sharetask(database,emailid,"akshay.kotak@somaiya.edu","Study","Stackoverflow1");
	});

	document.getElementById("off").addEventListener('click', function() {
		var bodybg = document.getElementById("demo");
		bodybg.setAttribute('style', 'background-color : #b7b7b7;');
		var bor = document.getElementsByClassName("major")[0];
		bor.setAttribute('style', 'border: 5px solid black;');
		// bodybg.setAttribute('style', 'border : 5px solid black;')
	});

	document.getElementById("on").addEventListener('click', function() {
		var bodybg = document.getElementById("demo");
		bodybg.setAttribute('style', 'background-color : black;');
		var bor = document.getElementsByClassName("major")[0];
		bor.setAttribute('style', 'border: 5px solid white;')

	});

	document.getElementById("modal_btn_share").onclick = function() {
		var to_email = document.getElementById("modal_text_input").value;
		var from_email = emailid;
		task = current_task;
		activity = document.getElementById("select_activity").value;
		to_email = getvalidkey(to_email);
		from_email = getvalidkey(from_email);
		sharetask(database,from_email,to_email,activity,task);
		 // alert(to_email + " " + from_email + " " + task + " " + activity);
	};

	document.getElementById("a_modal_btn_share").onclick = function() {
		var to_email = document.getElementById("a_modal_text_input").value;
		var from_email = emailid;
		//task = current_task;
		to_email = getvalidkey(to_email);
		from_email = getvalidkey(from_email);
		activity = document.getElementById("select_activity").value;
		shareactivity(database,from_email,to_email,activity);
		 // alert(to_email + " " + from_email + " " + activity);
	};


	document.getElementById("modal_text_input").onkeyup = function() {
		var input = document.getElementById("modal_text_input").value;
		document.getElementById("show_email_ids").style.display = "block";
		//document.getElementById("show_email_ids").style.display = "none";
		var lis = document.getElementById("show_email_ids").getElementsByTagName("li");
		for(var i=0;i<lis.length;i++)
		{
			lis[i].style.display = "block";
		}
		arr = get_all_email_ids();
		//arr = ["amit.mahajan@somaiya.edu", "akshay.kotak@somaiya.edu", "atharva.gole@somaiya.edu", "harshal.ad@somaiya.edu", "jaineel.ns@somaiya.edu"];
		for (i=0; i<lis.length; i++) 
		{
	        //a = li[i].getElementsByTagName("a")[0];
	        txtValue = lis[i].textContent || lis[i].innerText;
	        if (txtValue.indexOf(input) > -1) 
	        {
	        	//alert("inside if");
	            lis[i].style.display = "block";
	        } 
	        else 
	        {
	            lis[i].style.display = "none";
	        }
	    }
	};


	document.getElementById("search").onkeyup = function() {
		var search_term = document.getElementById("search").value;
		//document.getElementById("show_email_ids").style.display = "block";
		//document.getElementById("show_email_ids").style.display = "none";
		var div = document.getElementById("task").getElementsByTagName("div");
		for(var i=0;i<div.length;i++)
		{
			div[i].style.display = "block";
		}
		//arr = get_all_email_ids();
		//arr = ["amit.mahajan@somaiya.edu", "akshay.kotak@somaiya.edu", "atharva.gole@somaiya.edu", "harshal.ad@somaiya.edu", "jaineel.ns@somaiya.edu"];
		for (i=0; i<div.length; i++) 
		{
	        //a = li[i].getElementsByTagName("a")[0];
	        txtValue = div[i].getElementsByTagName("li")[0].textContent || div[i].getElementsByTagName("li")[0].innerText;
	        if (txtValue.indexOf(search_term) > -1) 
	        {
	        	//alert("inside if");
	            div[i].style.display = "block";
	        } 
	        else 
	        {
	            div[i].style.display = "none";
	        }
	    }
	};


	document.getElementById("a_modal_text_input").onkeyup = function() {
		var input = document.getElementById("a_modal_text_input").value;
		document.getElementById("a_show_email_ids").style.display = "block";
		//document.getElementById("show_email_ids").style.display = "none";
		var lis = document.getElementById("a_show_email_ids").getElementsByTagName("li");
		for(var i=0;i<lis.length;i++)
		{
			lis[i].style.display = "block";
		}
		arr = get_all_email_ids();
		//arr = ["amit.mahajan@somaiya.edu", "akshay.kotak@somaiya.edu", "atharva.gole@somaiya.edu", "harshal.ad@somaiya.edu", "jaineel.ns@somaiya.edu"];
		for (i=0; i<lis.length; i++) 
		{
	        //a = li[i].getElementsByTagName("a")[0];
	        txtValue = lis[i].textContent || lis[i].innerText;
	        if (txtValue.indexOf(input) > -1) 
	        {
	        	//alert("inside if");
	            lis[i].style.display = "block";
	        } 
	        else 
	        {
	            lis[i].style.display = "none";
	        }
	    }
	};
	document.getElementById("share_activity").onclick = function() {
		var activity = document.getElementById("select_activity").value;
		document.getElementById("a_modal_title").innerHTML = "Share activity : " + activity;
	};
	document.getElementById("modal_btn_close").onclick = hide_all_email_ids();
	document.getElementById("a_modal_btn_close").onclick = hide_all_email_ids();
	populate_email_ids_in_ul_for_searching();

});

//For getting Open Tabs in Real Time
chrome.storage.onChanged.addListener(function(changes, area){
	for (var key in changes){
		if (key == "tabs"){
			tabs = changes[key].newValue;
			console.log("tabs  "+tabs);
			display_open_tabs();
			break;
		}
		else if (key == "tab_ids"){
			tab_ids = changes[key].newValue;
			console.log("tab_ids  "+tab_ids);
			break;
		}
		else if (key == "tab_titles"){
			tab_titles = changes[key].newValue;
			console.log("tab_titles "+tab_titles);
			display_open_tabs();
			break;
		}
	}
	// populateList();
});


//For getting Tabs Url
function getAllOpenWindows(winData) {

     // var tabs = [];
     for (var i in winData) {
       if (winData[i].focused === true) {
           var winTabs = winData[i].tabs;
           var totTabs = winTabs.length;
           for (var j=0; j<totTabs;j++) {
             tabs.push(winTabs[j].url);
			 tab_ids.push(winTabs[j].id)
			 tab_titles.push(winTabs[j].title);
           }
       }
     }
	 for (var i in tab_titles){
		tab_titles[i] = tab_titles[i].replace('-','');
	 }
	 console.log(tab_titles);
     // populateList();
     // console.log(tabs);
}

//Sorting
function sort() {
	//tabs.sort();
	//console.log(tab_ids);
	d={};
	
	for(var i=0;i<tab_ids.length;i++) {
		d[tabs[i]]=tab_ids[i]
	}
	
	for(var i=0;i<tab_ids.length;i++) {
		var minn=tabs[i];
		var index=i;
		var temp;
		console.log(tabs);
		console.log(tab_ids);
		for(var j=i+1;j<tab_ids.length;j++) {
			if(minn>tabs[j]) {
				minn=tabs[j];
				index=j;
			}
			
		}
		
		chrome.tabs.move(d[tabs[index]], {index:i}, function(tab){
				
			
			});
			
			
			
			temp=tabs[index];
			tabs[index]=tabs[i];
			tabs[i]=temp;
			
			temp=tab_ids[index];
			tab_ids[index]=tab_ids[i];
			tab_ids[i]=temp;
			
			console.log(index+" placed at "+i);
			console.log(minn+" "+index);
			console.log("aaaaaa "+d[tabs[index]]+" "+d[tabs[i]]);
			console.log(tabs);
			console.log(tab_ids);
			console.log("");
			console.log("");
			console.log("");
			console.log("");
			console.log("");
		
	}
	
	/*
	chrome.tabs.move(tab_ids[0], {index:-1}, function(tab){
			
	});
	*/
	console.log(tab_ids);
	
}

function sortNN() {
    
    idtotitle={};
    
    for(var i=0;i<tab_ids.length;i++) {
        idtotitle[tab_ids[i]]=tab_titles[i]
    }
    
    console.log(idtotitle);
    
    group=getgroups(idtotitle);
    
    console.log(group);
    
    var order=[];
    
    for(key in group) {
        for(var i=0;i<group[key].length;i++) {
            order.push(group[key][i]);
        }
    }
    
    console.log(order);
    
    console.log(tab_ids);
    
    for(var i=0;i<tab_ids.length;i++) {
        
        chrome.tabs.move(parseInt(order[i]), {index:i}, function(tab){
                
            
            });
    }
    
}
//Functions for UI
function removeTask(ctx)
		{
			ctx.parentNode.parentNode.removeChild(ctx.parentNode);
		}
		function lang1(event) 
		{
			//alert("inside event()");
			//var goFurthur = false;
			var target = event.target || event.srcElement;
			//var c = event.target.childNodes;
			//alert(event);

			// for(var i=0; i<c.length; i++)
			// {
			// 	alert(c[i].nodeName.toLowerCase());
			// 	if(c[i].nodeName.toLowerCase() == "li")
			// 	{
			// 		alert("li found");
			// 		goFurthur = true;
			// 		break;
			// 	}
			// }

			//alert(event.target.innerHTML);
			//if(goFurthur)
			{
				//alert("goFurthur = true");
				document.getElementById("outermost_openDiv").style.display = "block";
				document.getElementById("outermost_savedDiv").style.display = "block";
				display_open_tabs();
				display_saved_tabs_of_given_task(event.target.innerHTML);
			}
		}


function add_new_task(thisCtx)
{
	//alert("Inside add_new_task()");
	thisCtx.setAttribute("style", "visibility: hidden;");
	var div = document.getElementById("task_entry");
	var add_button = document.createElement("button");
	add_button.innerHTML="Add Task";
	add_button.setAttribute("class", "btn btn-primary btn-circle add_new_task_button");
	add_button.setAttribute("name", "add_new_task_button"); //I dont think this will be of any use, not sure.
	add_button.onclick = function() {
		//alert("inside click listener of button");
		var ul = document.getElementById("task");

		var div = document.createElement("div");
		div.setAttribute("style", "height: 60px;");

		var share_btn = document.createElement("button");
		share_btn.setAttribute("class", "btn btn-warning btn-circle btn-share");
		share_btn.setAttribute("style", "float: right;");
		var it_share = document.createElement("i");
		it_share.setAttribute("class", "glyphicon glyphicon-share");
		share_btn.appendChild(it_share);
		//data-toggle="modal" data-target="#myModal"
		share_btn.setAttribute("data-toggle", "modal");
		share_btn.setAttribute("data-target", "#myModal");
		share_btn.onclick = function() {
			document.getElementById("modal_text_input").value = "";
			current_task = this.parentNode.getElementsByTagName("li")[0].innerHTML;
			document.getElementById("modal_title").innerHTML = "Share task " + current_task;
			//alert(current_task);
		}

		var btn2 = document.createElement("button");
		btn2.setAttribute("class", "btn btn-warning btn-circle btn-delete");
		btn2.setAttribute("style", "float: right;");
		btn2.setAttribute("id", "del");
		//btn1.setAttribute("style", "background-color : white;");
		btn2.onclick = function() {
			var l = this.parentNode.getElementsByTagName('li');
			dremoveTask(document.getElementById("select_activity").value,l[0].innerHTML);
			removetask(database,emailid,document.getElementById("select_activity").value,l[0].innerHTML);
			console.log("337 "+JSON.stringify(globaldatabase)+" "+l[0].innerHTML);
			if(current_taskname==l[0].innerHTML) {
				var divs=document.getElementById("saved_tabs").getElementsByTagName("div");
				var l=divs.length;
				for(var i=0;i<l;i++) {
					divs[0].remove();
				}
				document.getElementById("outermost_savedDiv").style.display="none";
				document.getElementById("outermost_openDiv").style.display="none";
			}
			this.parentNode.parentNode.removeChild(this.parentNode);
		};
		var it2 = document.createElement("i");
		it2.setAttribute("class", "glyphicon glyphicon-remove");
		btn2.appendChild(it2);

		var btn1 = document.createElement("button");
		btn1.setAttribute("class", "btn btn-primary btn-circle btn-edit");
		btn1.setAttribute("style", "float: right;");
		//btn1.setAttribute("style", "background-color : white;");
		btn1.onclick = function() {
			renameTask(this);
		};
		var it1 = document.createElement("i");
		it1.setAttribute("class", "glyphicon glyphicon-pencil");
		btn1.appendChild(it1);

		var li = document.createElement("li");
		li.setAttribute("style", "text-align: left; margin-left: 5px;");
		li.onclick = function(event) {
			var target = event.target || event.srcElement;
			current_taskname=event.target.innerHTML;
			//alert("Current task value is "+current_taskname);
			display_open_tabs();
			display_saved_tabs_of_given_task(event.target.innerHTML);
			var outerDivs = this.parentNode.parentNode.getElementsByTagName("div");
			for(var i=0; i<outerDivs.length; i++)
				outerDivs[i].style.backgroundColor = "#ffffff";
			this.parentNode.setAttribute("style", "background-color: #ededed;");
		}
		var newTask = document.getElementById("new_task").value;
		
		daddTask(document.getElementById("select_activity").value,document.getElementById("new_task").value);
		addtask(database,emailid,document.getElementById("select_activity").value,document.getElementById("new_task").value);
		
		console.log("335 "+JSON.stringify(globaldatabase));
		li.appendChild(document.createTextNode(newTask));

		div.appendChild(share_btn);
		div.appendChild(btn2);
		div.appendChild(btn1);
		
		div.appendChild(li);
		//div.setAttribute("style", "margin-right: 5%;");
		div.onmouseover = function() {
			//this.setAttribute("style", "background-color: #aaaaaa;");
		};
		div.onmouseout = function () {
			//this.setAttribute("style", "background-color: #ffffff;");
		};

		ul.appendChild(div);
		text_input.remove();
		thisCtx.setAttribute("style", "visibility: visible;");
		this.remove();
	};
	var text_input = document.createElement("input");
		text_input.setAttribute("type", "text");
	text_input.setAttribute("name", "new_task");
	text_input.setAttribute("id", "new_task");
	text_input.setAttribute("class", "form-control");
	div.appendChild(text_input);
	div.appendChild(add_button);
	// div.onmouseover = function() {
	// 	this.setAttribute("style", "box-shadow: 2px 2px grey;");
	// };
	// div.onmouseout = function () {
	// 	this.setAttribute("style", "box-shadow: 0px 0px white;");
	// };
}

function renameTask(ctx)
{
	var dard = ctx.parentNode;
	var li;
	var temp_btn;
	var lis = ctx.parentNode.getElementsByTagName("li");
	for(var i=0; i<lis.length; i++)
		li = lis[i];
	li.remove();
	var text_input = document.createElement("input");
	text_input.setAttribute("type", "text");
	text_input.setAttribute("name", "rename_task");
	text_input.setAttribute("id", "rename_task");
	text_input.setAttribute("style", "width: auto");
	text_input.setAttribute("class", "form-control col-md-8");

	var oldTask=li.innerHTML;
	text_input.value = li.innerHTML;
	ctx.parentNode.appendChild(text_input);

	var btns = dard.getElementsByTagName("button");
	console.log(btns);
	btns[0].remove();
	btns[0].remove();
	btns[0].remove();
	
	var btn1 = document.createElement("button");
	btn1.setAttribute("class", "btn btn-primary btn-circle btn-save");
	btn1.setAttribute("style", "float: right;");
	var it1 = document.createElement("i");
	// <i class="glyphicon glyphicon-floppy-save"></i>
	it1.setAttribute("class", "glyphicon glyphicon-floppy-save");
	btn1.appendChild(it1);
	dard.appendChild(btn1);
	btn1.onclick = function() {
		var new_text = text_input.value;
		
		drenameTask(document.getElementById("select_activity").value,oldTask,new_text);
		renametask(database,emailid,document.getElementById("select_activity").value,oldTask,new_text);
		console.log("336 "+JSON.stringify(globaldatabase));
		
		var liAdd = document.createElement("li");
		liAdd.onclick = function(event) {
			var target = event.target || event.srcElement;
			display_open_tabs();
			//alert("inside liAdd ..."+ JSON.stringify(globaldatabase));
			//alert(event.target.innerHTML);
			current_taskname=event.target.innerHTML;
			display_saved_tabs_of_given_task(event.target.innerHTML);
			var outerDivs = this.parentNode.parentNode.getElementsByTagName("div");
			for(var i=0; i<outerDivs.length; i++)
			{
				outerDivs[i].style.backgroundColor = "#ffffff";
			}
			this.parentNode.setAttribute("style", "background-color: #ededed;");
		}
		var newTaskAdd = text_input.value;
		liAdd.appendChild(document.createTextNode(newTaskAdd));
		liAdd.setAttribute("style", "text-align: left");
		text_input.remove();
		
		
		var btn1Add = document.createElement("button");
		btn1Add.setAttribute("class", "btn btn-primary btn-circle btn-edit");
		btn1Add.setAttribute("style", "float: right");
		btn1Add.onclick = function() {
			renameTask(this);
		};
	var it1 = document.createElement("i");
	it1.setAttribute("class", "glyphicon glyphicon-pencil");
	btn1Add.appendChild(it1);

	var btn2Add = document.createElement("button");
	btn2Add.setAttribute("class", "btn btn-warning btn-circle btn-delete");
	btn2Add.setAttribute("style", "float: right;");
	btn2Add.onclick = function() {
		var l = this.parentNode.getElementsByTagName('li');
		dremoveTask(document.getElementById("select_activity").value,l[0].innerHTML);
		removetask(database,emailid,document.getElementById("select_activity").value,l[0].innerHTML);
		console.log("338 "+JSON.stringify(globaldatabase));
		this.parentNode.parentNode.removeChild(this.parentNode);
	};
	var it2 = document.createElement("i");
	it2.setAttribute("class", "glyphicon glyphicon-remove");
	btn2Add.appendChild(it2);

	var share_btn = document.createElement("button");
	share_btn.setAttribute("class", "btn btn-warning btn-circle btn-share");
	share_btn.setAttribute("style", "float: right;");
	var it_share = document.createElement("i");
	it_share.setAttribute("class", "glyphicon glyphicon-share");
	share_btn.appendChild(it_share);
	//data-toggle="modal" data-target="#myModal"
	share_btn.setAttribute("data-toggle", "modal");
	share_btn.setAttribute("data-target", "#myModal");
	share_btn.onclick = function() {
		document.getElementById("modal_text_input").innerHTML = "";
		current_task = this.parentNode.getElementsByTagName("li")[0].innerHTML;
		document.getElementById("modal_title").innerHTML = "Share task " + current_task;
		//alert(current_task);
	}
	dard.appendChild(share_btn);

	dard.appendChild(btn2Add);
	dard.appendChild(btn1Add);
	
	dard.appendChild(liAdd);
	btn1.remove();
	};	
}

function display_saved_tabs_of_given_task(task_name)
{
	document.getElementById("saved_tabs_div").style.display = "block";
	document.getElementById("outermost_openDiv").style.display = "block";
	document.getElementById("outermost_savedDiv").style.display = "block";
	
	var divs=document.getElementById("saved_tabs").getElementsByTagName("div");
	var l=divs.length;
	for(var i=0;i<l;i++) {
		divs[0].remove();
	}
	
	//alert("inside display saved tabs : " + task_name);
	/*
	add_to_saved_tabs("1","dard");
	add_to_saved_tabs("2","is");
	add_to_saved_tabs("3","real");
	add_to_saved_tabs("4","my");
	add_to_saved_tabs("5","friend");
	*/
	//var urls=dgetURLs(document.getElementById("select_activity").value,current_taskname);
	//var urlids=dgetURLIds(document.getElementById("select_activity").value,current_taskname);
	console.log(current_taskname);
	var urlsandids=dgetURLandIds(document.getElementById("select_activity").value,current_taskname);
	console.log(urlsandids);
	for(key in urlsandids) {
			//console.log(urlsandids[key]+" "+urlsandids[key][0]+" "+urslandids[key][1]);
			// alert(urlsandids[key][0]+ " " + urlsandids[key][1]);
			add_to_saved_tabs(urlsandids[key][0],urlsandids[key][1]);
			//console.log(key);
			console.log(urlsandids[key][1]);
	}
	

}

function add_to_saved_tabs(id,add_to_saved)
{
	var url123;
	var flag = true;
	for(var i=0;i<tab_titles.length;i++)
	{
		if(add_to_saved == tab_titles[i])
		{
			flag = false;
			url123 = tabs[i];
			break;
		}
	}
	var outer_div = document.getElementById("saved_tabs_div");
	var ul = document.createElement("ul");
	ul.setAttribute("id", "saved_tabs");
	outer_div.appendChild(ul);

	var tabName = add_to_saved;
	var ul = document.getElementById("saved_tabs");

	var div = document.createElement("div");
	div.setAttribute("style", "height: 40px;");
	div.setAttribute("style", "overflow: auto;");
	div.setAttribute("id",id);
	var btn = document.createElement("button");
	btn.setAttribute("type", "button");
	btn.setAttribute("class", "btn btn-warning btn-circle btn-trash");
	btn.setAttribute("style", "float: right; ");
	var it = document.createElement("i");
	it.setAttribute("class", "glyphicon glyphicon-trash");
	btn.appendChild(it);

	var li = document.createElement("li");
	// li.appendChild(document.createTextNode(tabName));
	li.setAttribute("style", "text-align: left; margin-left: 5px;  overflow-x: auto; white-space: nowrap;");
	var a = document.createElement("a");
	if(flag == false)
		a.setAttribute('href',url123);
	else
		a.setAttribute("href", add_to_saved);
	a.setAttribute('target','_blank');
	a.appendChild(document.createTextNode(add_to_saved));
	li.appendChild(a);

	div.appendChild(btn);
	div.appendChild(li);
	div.onmouseover = function() {
		this.setAttribute("style", "background-color: #aaaaaa; overflow: auto;");
	};
	div.onmouseout = function () {
		this.setAttribute("style", "background-color: #ffffff");
	};

	ul.appendChild(div);
	btn.onclick = function() {
		dremoveURL(document.getElementById("select_activity").value,current_taskname,this.parentNode.id);
		removeURL(database,emailid,document.getElementById("select_activity").value,current_taskname,this.parentNode.id)
		console.log("339 "+JSON.stringify(globaldatabase));
		this.parentNode.remove();
	};
}


function generateId() {
	var urlids=dgetURLIds(document.getElementById("select_activity").value,current_taskname);
	var maxx=0;
	var index=0;
	for(var i=0;i<urlids.length;i++) {
		if(parseInt(urlids[i])>maxx) {
			maxx=parseInt(urlids[i]);
			index=i;
		}
	}
	return (maxx+1).toString();
}


function display_open_tabs()
{
	document.getElementById("open_tabs").remove();
	var div = document.getElementById("open_tabs_div");
	var ul = document.createElement("ul");
	ul.setAttribute("id", "open_tabs");
	div.appendChild(ul);
	// var open_tabs = ["https://docs.google.com/presentation/d/1k3A2cWFBRKbp86sdbr2e8OehI8dVfQPshcghyyftuAqAuoeq0U/edit", "https://www.sih.gov.in/", "https://www.uwatchfree.sx/", "www.yahoo.com"];
	open_tabs = tab_titles;
	document.getElementById("open_tabs_div").style.display = "block";
	for(var i=0; i<open_tabs.length; i++)
	{
		var tab_name = open_tabs[i];
		var ul = document.getElementById("open_tabs");
		
		var div = document.createElement("div");
		div.setAttribute("style", "height: 40px; overflow: auto;");
		div.setAttribute("class", "overflow_div");
		var btn = document.createElement("button");
		btn.setAttribute("type", "button");
		btn.setAttribute("class", "btn btn-warning btn-circle btn_open_tabs");
		btn.setAttribute("style", "float: right; height: 48px;");
		var it = document.createElement("i");
		it.setAttribute("class", "glyphicon glyphicon-copy");
		btn.appendChild(it);

		var li = document.createElement("li");
		li.setAttribute("style", "text-align: left; margin-left: 5px; overflow-x: auto; white-space: nowrap;");
		// li.appendChild(document.createTextNode(tab_name));
		var a = document.createElement("a");
		a.setAttribute('href',tabs[i]);
		a.setAttribute('target','_blank');
		a.appendChild(document.createTextNode(tab_name));
		li.appendChild(a);

		div.appendChild(btn);
		div.appendChild(li);
		//div.onmouseover = function() {
			//this.setAttribute("style", "background-color: #dedede");
		//};
		div.onmouseout = function () {
			this.setAttribute("style", "background-color: #ffffff");
		};

		ul.appendChild(div);
		btn.onclick = function() {
			var li = this.parentNode.getElementsByTagName("li");
			
			var urls=dgetURLs(document.getElementById("select_activity").value,current_taskname);
			var flag=0;
			for(var i=0;i<urls.length;i++) {
				if(urls[i]==li[0].textContent) {
					flag=1;
				}
			}
			
			console.log("flag "+flag);
			console.log("urls "+urls);
			console.log("value "+li[0].textContent);
			
			
			
			if(flag==0) {
				var id=generateId();
				console.log("340 "+id);
				
				// alert(li[0].textContent);
				var a = li[0].getElementsByTagName("a")[0].href;
				daddURL(document.getElementById("select_activity").value,current_taskname,id,a);
				addURL(database,emailid,document.getElementById("select_activity").value,current_taskname,id,a)
				console.log("341 "+JSON.stringify(globaldatabase));
				add_to_saved_tabs(id,li[0].textContent);
			}
		};
	}
}
/*
function load_activities()
{
	alert("Inside load_activities()");
	var div = document.getElementById("select_shit");
	//alert("inside load_activities()");
	//var activities = ['Activity1','Activity2','Activity3','Activity4','Activity5'];
	//var activities=dgetActivity();
	console.log(activities);
	var select_tag_of_activities = document.getElementById("select_activity");
	for(var i=0; i<activities.length; i++)
	{
		var option = document.createElement("option");
		option.setAttribute("value", activities[i]);
		option.innerHTML = activities[i];
		select_tag_of_activities.appendChild(option);
	}
	var add_activity = document.createElement("button");
	add_activity.setAttribute("type", "button");
	add_activity.setAttribute("class", "btn btn-default btn-lg");
	add_activity.setAttribute("id", "add_activity_btn");
	add_activity.setAttribute("style", "float: right;");
	var span = document.createElement("span");
	span.setAttribute("class", "glyphicon glyphicon-plus");
	add_activity.appendChild(span);
	document.getElementById("select_shit").appendChild(add_activity);
	add_activity.onclick = function() {
		var text_input = document.createElement("input");
		text_input.setAttribute("type", "text");
		text_input.setAttribute("class", "form-control");
		text_input.setAttribute("style", "width: 70%;");
		var btn = document.createElement("button");
		btn.setAttribute("type", "button");
		btn.setAttribute("class", "btn btn-default btn-lg");
		btn.setAttribute("id", "add_activity_btn");
		var span = document.createElement("span");
		span.setAttribute("class", "glyphicon glyphicon-ok");
		btn.setAttribute("style", "float: right; width: 20%;");
		btn.appendChild(span);
		document.getElementById("rename_activity_elements_div").appendChild(btn);
		document.getElementById("rename_activity_elements_div").appendChild(text_input);
		btn.onclick = function() {
			var select_tag = document.getElementById("select_activity");
			var option = document.createElement("option");
			option.setAttribute("value", text_input.value);
			option.innerHTML = text_input.value;
			select_tag.appendChild(option);
			text_input.remove();
			this.remove();
		};
	};

}
*/

function get_activity_name()
{	
	var activity_name = document.getElementById("select_activity").value;
	//alert(activity_name + " is selected");
	//document.getElementById("add_activity_btn").style.visibility = "hidden";
	document.getElementById("rename_activity").style.visibility = "visible";
	document.getElementById("delete_activity").style.visibility = "visible";
	document.getElementById("share_activity").style.visibility = "visible";

	document.getElementById("tasks").style.display = "block";

	var delete_btn = document.getElementById("delete_activity");
	delete_btn.onclick = function() {
		//alert("delete_btn is clicked");
		var outer_div = this.parentNode;
		var optns = outer_div.getElementsByTagName("option");
		var index=0;
		for(var i=0; i<optns.length; i++)
		{
			if(optns[i].innerHTML == document.getElementById("select_activity").value) {
				console.log(optns[i].innerHTML,document.getElementById("select_activity").value);
				index=i;
				//optns[i].remove();
				dremoveActivity(document.getElementById("select_activity").value);
				removeactivity(database,emailid,document.getElementById("select_activity").value);
				console.log("333 "+JSON.stringify(globaldatabase));
				//call a functn here
				break;
			}
		}
		optns[index].remove();
		var div1 = document.getElementById("task").getElementsByTagName("div");
		var div2 = document.getElementById("open_tabs").getElementsByTagName("div");
		var div3 = document.getElementById("saved_tabs").getElementsByTagName("div");
		var l = div1.length;
		for(var i=0;i<l;i++)
		{
			//console.log(div[0]);
			//var del_btn = div[0].getElementsByTagName("button")[0];
			//del_btn.click();
			div1[0].remove();
			
		}
		var l = div2.length;
		for(var i=0;i<l;i++)
		{
			//console.log(div[0]);
			//var del_btn = div[0].getElementsByTagName("button")[0];
			//del_btn.click();
			div2[0].remove();
			
		}
		var l = div3.length;
		for(var i=0;i<l;i++)
		{
			//console.log(div[0]);
			//var del_btn = div[0].getElementsByTagName("button")[0];
			//del_btn.click();
			div3[0].remove();
			
		}
		document.getElementById("outermost_openDiv").style.display = "none";
		document.getElementById("outermost_savedDiv").style.display = "none";
		
		//var l=optns.length;
		//for(var i=0)
		
		//optns[0].style.selected="true";
		document.getElementById("select_activity").selectedIndex=-1;
	};

	var rename_btn = document.getElementById("rename_activity");
	rename_btn.onclick = function() {
		//alert("rename_btn is clicked");
		this.style.visibility = "hidden";
		delete_btn.style.visibility = "hidden";
		document.getElementById("share_activity").style.visibility = "hidden";
		document.getElementById("add_activity_btn").style.visibility = "visible";
		var div = document.getElementById("rename_activity_elements_div");
		var text_input = document.createElement("input");
		text_input.setAttribute("type", "text");
		text_input.setAttribute("value", document.getElementById("select_activity").value);
		text_input.setAttribute("class", "form-control");
		var btn = document.createElement("button");
		btn.setAttribute("type", "button");
		btn.setAttribute("class", "btn btn-default btn-lg");
		btn.setAttribute("id", "add_activity_btn");
		btn.setAttribute("style", "float: right;");
		var span = document.createElement("span");
		span.setAttribute("class", "glyphicon glyphicon-edit");
		btn.appendChild(span);
		div.appendChild(text_input);
		div.appendChild(btn);

		btn.onclick = function() {
			//alert("edit button is clicked");
			var select_tag = document.getElementById("select_activity");
			var optns = select_tag.getElementsByTagName("option");
			for(var i=0; i<optns.length; i++)
			{
				if(document.getElementById("select_activity").value == optns[i].innerHTML)
				{	
					drenameActivity(document.getElementById("select_activity").value,text_input.value);
					renameactivity(database,emailid,document.getElementById("select_activity").value,text_input.value);
					console.log("334 "+JSON.stringify(globaldatabase));
					optns[i].value = text_input.value;
					optns[i].innerHTML = text_input.value;
					//optns[i].selected = true;
					//call a fucn
					break;
				}
			}

			this.remove();
			text_input.remove();
			rename_btn.style.visibility = "visible";
			delete_btn.style.visibility = "visible";
			document.getElementById("share_activity").style.visibility = "visible";
			//document.getElementById("add_activity_btn").style.visi
		};
	};
	var task_ul = document.getElementById("task");
	var all_div_of_task = task_ul.getElementsByTagName("div");
	var l=all_div_of_task.length;
	console.log(l);
	for(var i=0;i<l;i++)
	{
		all_div_of_task[0].remove();
	}
	var tasks_of_this_activity = dgetTask(document.getElementById("select_activity").value);
	for(var i=0; i<tasks_of_this_activity.length;i++)
	{
		view_tasks_of_activity(tasks_of_this_activity[i]);
	}

	//display_tasks(activity_name);
	
}

function view_tasks_of_activity(activityName) 
{
	var ul = document.getElementById("task");
	var div = document.createElement("div");
	div.setAttribute("style", "height: 60px;");

	var share_btn = document.createElement("button");
	share_btn.setAttribute("class", "btn btn-warning btn-circle btn-share");
	share_btn.setAttribute("style", "float: right;");
	var it_share = document.createElement("i");
	it_share.setAttribute("class", "glyphicon glyphicon-share");
	share_btn.appendChild(it_share);
	//data-toggle="modal" data-target="#myModal"
	share_btn.setAttribute("data-toggle", "modal");
	share_btn.setAttribute("data-target", "#myModal");
	share_btn.onclick = function() {
		document.getElementById("modal_text_input").value = "";
		current_task = this.parentNode.getElementsByTagName("li")[0].innerHTML;
		document.getElementById("modal_title").innerHTML = "Share task " + current_task;

		//alert(current_task);
	}

	var btn2 = document.createElement("button");
	btn2.setAttribute("class", "btn btn-warning btn-circle btn-delete");
	btn2.setAttribute("style", "float: right;");
	//btn1.setAttribute("style", "background-color : white;");
	btn2.onclick = function() {
		var l = this.parentNode.getElementsByTagName('li');
		dremoveTask(document.getElementById("select_activity").value,l[0].innerHTML);
		removetask(database,emailid,document.getElementById("select_activity").value,l[0].innerHTML);
		console.log("337 "+JSON.stringify(globaldatabase)+" "+l[0].innerHTML);
		if(l[0].innerHTML==current_taskname) {
			var ul=document.getElementById("saved_tabs");
			var divs=ul.getElementsByTagName("div");
			var l=divs.length;
			for(var i=0;i<l;i++) {
				divs[0].remove();
			}
		}
		this.parentNode.parentNode.removeChild(this.parentNode);
	};
	var it2 = document.createElement("i");
	it2.setAttribute("class", "glyphicon glyphicon-remove");
	btn2.appendChild(it2);

	var btn1 = document.createElement("button");
	btn1.setAttribute("class", "btn btn-primary btn-circle btn-edit");
	btn1.setAttribute("style", "float: right;");
	//btn1.setAttribute("style", "background-color : white;");
	btn1.onclick = function() {
		renameTask(this);
	};
	var it1 = document.createElement("i");
	it1.setAttribute("class", "glyphicon glyphicon-pencil");
	btn1.appendChild(it1);

	var li = document.createElement("li");
	li.setAttribute("style", "text-align: left; margin-left: 5px;");
	li.onclick = function(event) {
		var target = event.target || event.srcElement;
		current_taskname=event.target.innerHTML;
		console.log(current_taskname);
		//alert("Current task value is "+current_taskname);
		display_open_tabs();
		//current_taskname=event.target.innerHTML;
		display_saved_tabs_of_given_task(event.target.innerHTML);
		var outerDivs = this.parentNode.parentNode.getElementsByTagName("div");
		for(var i=0; i<outerDivs.length; i++)
			outerDivs[i].style.backgroundColor = "#ffffff";
		this.parentNode.setAttribute("style", "background-color: #ededed;");
	}
	var newTask = activityName;	
	//daddTask(document.getElementById("select_activity").value,document.getElementById("new_task").value);
	console.log("335 "+JSON.stringify(globaldatabase));
	li.appendChild(document.createTextNode(newTask));

	div.appendChild(share_btn);
	div.appendChild(btn2);
	div.appendChild(btn1);
	
	div.appendChild(li);
	//div.setAttribute("style", "margin-right: 5%;");
	div.onmouseover = function() {
		//this.setAttribute("style", "background-color: #aaaaaa;");
	};
	div.onmouseout = function () {
		//this.setAttribute("style", "background-color: #ffffff;");
	};

	ul.appendChild(div);
}

function populate_email_ids_in_ul_for_searching()
{
	getemailidstask(database);
	//getemailidsactivity(database);
	// ul = document.getElementById("show_email_ids");
	// var arr = get_all_email_ids();
	// for(var i=0;i<arr.length;i++)
	// {
	// 	var li = document.createElement("li");
	// 	li.appendChild(document.createTextNode(arr[i]));
	// 	li.setAttribute("value", arr[i]);
	// 	li.setAttribute("display", "none");
	// 	li.setAttribute("class", "list-group-item");
	// 	li.setAttribute("style", "width: 100%;");
	// 	li.onclick = function() {
	// 		document.getElementById("modal_text_input").value = this.innerHTML;
	// 		this.parentNode.style.display = "none";
	// 		//alert(document.getElementById("modal_text_input").value);
	// 	};
	// 	ul.appendChild(li);
	// }
	// ul.style.display = "none";

	// ul = document.getElementById("a_show_email_ids");
	// var arr = get_all_email_ids();
	// for(var i=0;i<arr.length;i++)
	// {
	// 	var li = document.createElement("li");
	// 	li.appendChild(document.createTextNode(arr[i]));
	// 	li.setAttribute("value", arr[i]);
	// 	li.setAttribute("display", "none");
	// 	li.setAttribute("class", "list-group-item");
	// 	li.setAttribute("style", "width: 100%;");
	// 	li.onclick = function() {
	// 		document.getElementById("a_modal_text_input").value = this.innerHTML;
	// 		this.parentNode.style.display = "none";
	// 		//alert(document.getElementById("modal_text_input").value);
	// 	};
	// 	ul.appendChild(li);
	// }
	// ul.style.display = "none";
}


function hide_all_email_ids()
{

	var ul = document.getElementById("show_email_ids");
	//ul.style.display = "block";
	var lis = ul.getElementsByTagName("li");
	for(var i=0; i<lis.length; i++)
	{
		lis[i].style.display = "none";
	}
	ul.style.display = "none";
}


function get_all_email_ids()
{

	//funtcn to get all email ids from database
	// arr = ["amit.mahajan@somaiya.edu", "akshay.kotak@somaiya.edu", "atharva.gole@somaiya.edu", "harshal.ad@somaiya.edu", "jaineel.ns@somaiya.edu"];
	//return arr;
}

