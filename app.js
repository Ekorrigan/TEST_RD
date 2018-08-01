// register service worker

if ('serviceWorker' in navigator) {
	console.log('TEST');
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
	var curVer = reg.getVersion();
	var v1 = reg.Version;
	  var v2 = reg.fncVersion();
	  console.log("v1 : " + v1 + " - v2 : "+ v2);
	console.log("Version actuelle : v"+curVer);
	document.getElementById("myTitle").innerHTML += curVer;
  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}



window.onload = function() {
	var imgSection = document.querySelector('#section');
	var myImage = document.createElement('img');
	var myFigure = document.createElement('figure');
	var imageURL = '/TEST_RD/gallery/test.jpg';
	myImage.src = imageURL;
	imgSection.appendChild(myFigure);
	myFigure.appendChild(myImage);
};
