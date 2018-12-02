var likes = { 
    update : function (postid) {
        var request = createCORSRequest("GET", "http://localhost:3000/like/" + postid);
        var likes = document.getElementById(postid);
        var string = likes.innerHTML; 
        var increment = string.split(' ');
        likes.innerHTML = "Likes: " + (Number(increment[1]) + 1);
        var likeButton = document.getElementsByName(postid);
        likeButton[0].style.visibility = "hidden";
        request.send();
    }
};

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
  
      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      xhr.open(method, url, true);
  
    } else if (typeof XDomainRequest != "undefined") {
  
      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      xhr = new XDomainRequest();
      xhr.open(method, url);
  
    } else {
  
      // Otherwise, CORS is not supported by the browser.
      xhr = null;
  
    }
    return xhr;
}

var setLikes = {
  onload : function () {

  }
}

window.onload = setLikes.onload.bind(likes);
