console.log("test");

function callCampAPI() {
    var link = `http://api.amp.active.com/camping/campgrounds`;
    const requestUrl = new URL(link);

    //requestUrl.append( format.val() );
    requestUrl.searchParams.append("pstate", "MN");
    requestUrl.searchParams.append("api_key", "qvcnk87rmp9txeyryqxjpwrb" );

    console.log(requestUrl);

    const url = "http://api.amp.active.com/camping/campgrounds/?pstate=MN&siteType=10001&api_key=qvcnk87rmp9txeyryqxjpwrb"

    fetch(url, { mode: 'cors', method: "GET"})
    .then(function (response) {
        return response;
    })
    .then(function (data) {
        console.log(data);
    });
    // const Http = new XMLHttpRequest();
    // Http.open("GET", url);
    // Http.send();

    // Http.onreadystatechange = (e) => {
    // console.log(Http.responseText)}


    // var xhr = new XMLHttpRequest();
    // xhr.onreadystatechange = function () {
    // if (xhr.readyState === XMLHttpRequest.DONE) {
    //     console.log('XMLHttpRequest Response \n-------------');
    //     console.log(xhr.response);
    // }
    // };
    // xhr.open('GET', url);
    // xhr.send();
}

function callNpAPI() {
    var link = "https://developer.nps.gov/api/v1/campgrounds";
    const requestUrl = new URL(link);

    //requestUrl.append( format.val() );
    requestUrl.searchParams.append("stateCode", "MN");
    requestUrl.searchParams.append("limit", "5");
    requestUrl.searchParams.append("api_key", "6SDR47MbfpKKDCjjWmITe9DOzwm3YU790sDLbeQZ" );

    console.log(requestUrl);

    const url = "http://api.amp.active.com/camping/campgrounds/?pstate=MN&siteType=10001&api_key=qvcnk87rmp9txeyryqxjpwrb"

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });
}

callNpAPI();
//callCampAPI();