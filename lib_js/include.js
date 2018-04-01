
function includeHtml(file, parent_elem){
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        parent_elem.innerHTML += this.responseText;
      }
    }
    xhttp.open("GET", file, false);
    xhttp.send();
}
