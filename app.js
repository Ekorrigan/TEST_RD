// register service worker

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/TEST_RD/sw.js', { scope: '/TEST_RD/' }).then(function(reg) {

    if(reg.installing) {
      console.log('Service worker installing');
	  document.getElementById("myTitle").innerHTML = "Service worker installing";
    } else if(reg.waiting) {
      console.log('Service worker installed');
	  document.getElementById("myTitle").innerHTML = "Service worker installed";
    } else if(reg.active) {
      console.log('Service worker active');
	  document.getElementById("myTitle").innerHTML = "Service worker active";
    }

  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}


var imgSection = document.querySelector('#section');

window.onload = function() {
	console.log('before imgLoad');
	var myImage = document.createElement('img');
	var myFigure = document.createElement('figure');
	var imageURL = '/TEST_RD/gallery/snowTroopers.jpg';
	console.log(imageURL);
	myImage.src = imageURL;
	imgSection.appendChild(myFigure);
	myFigure.appendChild(myImage);
	console.log(imgSection.innerHtml);
};
