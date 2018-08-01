// register service worker
function j_get(url, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", url, true); // true for asynchronous 
    xmlHttp.send(null);
}

if ('serviceWorker' in navigator) {
	console.log('TEST08');
  navigator.serviceWorker.register('/TEST_RD/sw.js', { scope: '/TEST_RD/' }).then(function(reg) {

    if(reg.installing) {
      console.log('# Service worker installing #');
	  document.getElementById("myTitle").innerHTML = "Service worker installing";
    } else if(reg.waiting) {
      console.log('# Service worker installed #');
	  document.getElementById("myTitle").innerHTML = "Service worker installed";
    } else if(reg.active) {
      console.log('# Service worker active #');
	  document.getElementById("myTitle").innerHTML = "Service worker active";
    }
  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}



window.onload = function() {
	document.getElementById("myTitle").innerHTML += " v1.15";
	var imgSection = document.querySelector('#section');
	var myImage = document.createElement('img');
	var myFigure = document.createElement('figure');
	var imageURL = '/TEST_RD/gallery/test.jpg';
	myImage.src = imageURL;
	imgSection.appendChild(myFigure);
	myFigure.appendChild(myImage);
};
