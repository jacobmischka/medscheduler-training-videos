var videos = [];
var state = { video: 0 };

if(window.location.hash != "" && window.location.hash != "#")
	state.video = parseInt(window.location.hash.substring(1));

function main(){
	var groups = this.response;

	var videoList = document.getElementById("video-list");
	var group, subgroup, video, index;
	var div, h2, h3, ul, li, a, text;
	for(var i in groups){
		group = groups[i];
		div = document.createElement("div");
		div.className = "video-group";
		h2 = document.createElement("h2");
		text = document.createTextNode(group.title);
		h2.appendChild(text);
		div.appendChild(h2);

		for(var j in group.items){
			h3 = document.createElement("h3");
			text = document.createTextNode(j.charAt(0).toUpperCase() + j.substring(1));
			h3.appendChild(text);
			div.appendChild(h3);
			ul = document.createElement("ul");
			subgroup = group.items[j];
			for(var k in subgroup){
				video = subgroup[k];
				videos.push(video);
				index = videos.indexOf(video);
				li = document.createElement("li");
				a = document.createElement("a");
				a.href = "#" + index;
				a.className = "video-link";
				text = document.createTextNode(video.title);
				a.appendChild(text);
				li.appendChild(a);
				ul.appendChild(li);
			}
			div.appendChild(ul);
		}
		videoList.appendChild(div);
	}

	document.getElementById("prev-button").addEventListener("click", previousVideo);
	document.getElementById("next-button").addEventListener("click", nextVideo);

	function loadVideo(index){
		var iframe = document.getElementById("video-frame");
		var video = videos[index];
		iframe.contentWindow.location.replace(video.url);
	}

	function nextVideo(){
		if(state.video + 1 < videos.length){
			state.video++;
			history.pushState(state, videos[state.video].title, "#" + state.video);
			loadVideo(state.video);
		}
		else
			alert("No more videos");
	}

	function previousVideo(){
		if(state.video - 1 >= 0){
			state.video--;
			history.pushState(state, videos[state.video].title, "#" + state.video);
			loadVideo(state.video);
		}
		else
			alert("No more videos");
	}

	loadVideo(state.video);

	window.onpopstate = function(event){
		var startVideo = state.video;
		if(event.state != undefined && event.state.video != undefined)
			state = event.state
		else if(window.location.hash != "" && window.location.hash != "#")
			state.video = parseInt(window.location.hash.substring(1));
		if(state.video != startVideo)
			loadVideo(state.video);
	}
}

var req = new XMLHttpRequest();
req.open("GET", "videos.json");
req.onload = main;
req.responseType = "json";
req.send();
