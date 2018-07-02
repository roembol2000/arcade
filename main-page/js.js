const obj = JSON.parse('{"items":[ \
	{"id":"pacman",\
	"title":"Pac-Man",\
	"created":"1980",\
	"format":"png",\
    "desc_short":"Wie kent het niet? Verzamel alle bolletjes!"},\
    {"id":"asteroids",\
	"title":"Asteroids",\
	"created":"1979",\
	"format":"png",\
    "desc_short":"Lorem ipsum sit dolar."}\
]\
    }\
')

var head = document.getElementsByTagName("main")[0];


var l = obj.items.length;


for (i = 0; i < l; i++) {
    var id = obj.items[i].id;
    var desc = obj.items[i].desc_short;

    var article = document.createElement("article");
    article.id = "ar" + i;

    var im = document.createElement("img");
    im.setAttribute("src", "media/" + id + "." + obj.items[i].format);
    im.setAttribute("alt", desc);
    im.classList = "front";

    var h2 = document.createElement("h2");
    h2.innerHTML = obj.items[i].title;

    var d = document.createElement("p");
    d.innerHTML = obj.items[i].created;
    d.classList = "date";

    var p = document.createElement("p");
    p.innerHTML = desc;

    var b = document.createElement("section");
    b.classList = "textbox"
    b.appendChild(h2);
    b.appendChild(d);
    b.appendChild(p);
    b.setAttribute("onclick", "location.href='/" + id + "/'");
    article.appendChild(im);
    article.appendChild(b);
    head.appendChild(article);
}
var current_item = 0;

if(location.href.split("#ar")[1] != undefined){
    current_item = location.href.split("#ar")[1];
}


document.addEventListener("keyup", function (event) {   
    event.preventDefault();
    if (event.keyCode === 37) {
        if(current_item > 0)        current_item = current_item - 1;

    }
    if (event.keyCode === 39) {
        if(current_item < l-1)        current_item = current_item + 1;

    }
    if (event.keyCode === 65){
        location.href = obj.items[current_item].id;

    }
    target = document.getElementById("ar" + current_item);
    target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
})