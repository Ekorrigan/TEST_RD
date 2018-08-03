
var curVer;
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

function displayNotification() {
	document.querySelector("#notification").style.display = "block";
}


function hideNotification() {
	document.querySelector("#notification").style.display = "none";
}


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistration().then(registration => {
    registration.addEventListener("updatefound",() => {
		// On récupère le Service
		// Worker en cours
		// d'installation
		const newWorker =	registration.installing;

        // On se branche à ses mises
        // à jour pour savoir quand
        // il a fini de s'installer
        newWorker.addEventListener("statechange",() => {
            if (newWorker.state === "installed") {
              // Un nouveau Service
              // Worker est prêt.
              // Donc on affiche la
              // notification
              displayNotification();
            }
          }
        );
      }
    );
  });
  navigator.serviceWorker.register('/TEST_RD/sw.js').then(function(reg) {

    if(reg.installing) {
      console.log('# Service worker installing #');
	  document.getElementById("myTitle").innerHTML = "Service worker installing";
    } else if(reg.waiting) {
      console.log('# Service worker installed #');
	  document.getElementById("myTitle").innerHTML = "Service worker installed";
    } else if(reg.active) {
	j_get("/TEST_RD/version/",function(text){ 
      		console.log('# Service worker active #',text);
	  	document.getElementById("myTitle").innerHTML = "Service worker active";
		localStorage.setItem("curVer", text);
	});
    }
  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}

window.onload = function() {
	j_get("/TEST_RD/version/",function(text){ 
		document.getElementById("myTitle").innerHTML += " #"+text;
		curVer = localStorage.getItem("curVer");
		if(!curVer){
			localStorage.setItem("curVer", text);
		}
		else if(curVer!=text){
              		displayNotification();
		}
		else{
			hideNotification();
		}
		console.log(curVer+"/"+text);
	});

	// Au clic du bouton de notification
	document.querySelector("#on-activation-request")
	  .addEventListener("click", () => {
		j_get("/TEST_RD/version/",function(text){ 
			console.log("ok pour mise à jour");
			localStorage.setItem("curVer", text);
			console.log("nouvelle version : "+text);
		});
			  setTimeout(function(){ 
				console.log("reload");
				hideNotification();
				location.reload();  
			  }, 500);	
	    // On récupère le Service Worker
	    // qui a fini de s'installer
	    // (waiting)
	    navigator.serviceWorker
	      .getRegistration()
	      .then(registration => {
		// Et on lui envoie le
		// message d'activation
		  var sw = registration.waiting;
		  if(sw){
		  	sw.postMessage("skipWaiting");
		  }	  
	      });
	  });	
	
	var imgSection = document.querySelector('#section');
	var myImage = document.createElement('img');
	var myFigure = document.createElement('figure');
	var imageURL = '/TEST_RD/gallery/wallpaper.jpg';
	myImage.src = imageURL;
	imgSection.appendChild(myFigure);
	myFigure.appendChild(myImage);
};
