var baseUrl = "https://www.new-innov.com"
var links = $(".link[target='_blank']");
var attr = "RedirectTo=";
var videos = [];
var video, href;
for(var i in links){
	video = {};
	video.title = links[i].title;
	href = links[i].href;
	if(href == undefined)
		continue;
	video.url = baseUrl + href.substring(href.indexOf(attr)+attr.length);
	videos.push(video);
}

console.log(videos);
