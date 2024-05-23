function getUrls(url, names) {
    if (typeof url === "string") {
        url = new URL(url);
    }
    return names.map(function (name) {
        url.searchParams.set("name", name);
        //  ~~~~~~~~~~~~
        // error!
        // Property 'searchParams' does not exist on type 'string | URL'.
        return url.toString();
    });
}
var array = getUrls("http://local.net", ["me", "you", "us"]);
console.log(array);
