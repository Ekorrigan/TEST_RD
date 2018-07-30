// register service worker

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(function(reg) {

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

// function for loading each image via XHR

function imgLoad(url) {
  // return a promise for an image loading
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'blob';

    request.onload = function() {
      if (request.status == 200) {
        resolve(request.response);
      } else {
        reject(Error('Image didn\'t load successfully; error code:' + request.statusText));
      }
    };

    request.onerror = function() {
      reject(Error('There was a network error.'));
    };

    // Send the request
    request.send();
  });
}

var imgSection = document.querySelector('section');

window.onload = function() {

    imgLoad('/gallery/test.jpg').then(function(imgResponse) {

      var myImage = document.createElement('img');
      var myFigure = document.createElement('figure');
      var imageURL = window.URL.createObjectURL(imgResponse);

      myImage.src = imageURL;
      imgSection.appendChild(myFigure);
      myFigure.appendChild(myImage);
    }, function(Error) {
      console.log(Error);
    });
  }
};
