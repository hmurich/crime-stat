function readParams() {
    var params = {};
    var _url = window.location.search.substring(1);
    var vars = _url.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (typeof params[pair[0]] === "undefined") {
            params[pair[0]] = decodeURIComponent(pair[1]);
        } else if (typeof params[pair[0]] === "string") {
            var arr = [ params[pair[0]], decodeURIComponent(pair[1]) ];
            params[pair[0]] = arr;
        } else {
            params[pair[0]].push(decodeURIComponent(pair[1]));
        }
    }
    return params;
}
