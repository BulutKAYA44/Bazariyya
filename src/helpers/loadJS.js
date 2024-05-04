export default function loadJS (url, implementationCode, location, uniqueId){
    //url is URL of external file, implementationCode is the code
    //to be called from the file, location is the location to 
    //insert the <script> element
    if(typeof uniqueId !== 'undefined'){
      if(document.getElementById(uniqueId) !== null){
        console.warn(uniqueId, " has already injected.");
        return;
      }
    }
  
    var scriptTag = document.createElement('script');
    scriptTag.src = url;
    scriptTag.id = uniqueId;
    scriptTag.onload = implementationCode;
    scriptTag.onreadystatechange = implementationCode;
    var elem = document.getElementsByTagName(location)[0];
    elem.appendChild(scriptTag);
  }