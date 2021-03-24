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
    requestUrl.searchParams.append("stateCode", "CA");
    requestUrl.searchParams.append("limit", "20");
    requestUrl.searchParams.append("api_key", "6SDR47MbfpKKDCjjWmITe9DOzwm3YU790sDLbeQZ" );

    console.log(requestUrl);

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });
}

function callCampsiteAPI() {
    var link = "https://ridb.recreation.gov/api/v1/campsites";
    const requestUrl = new URL(link);

    //requestUrl.append( format.val() );
    requestUrl.searchParams.append("limit", "20");
    requestUrl.searchParams.append("offset", "0");
    //requestUrl.searchParams.append("api_key", "830595a4-7200-403c-8877-66d4e954ce03")

    console.log(requestUrl);

    fetch(requestUrl, {
        headers: {
            'x-api-key': '830595a4-7200-403c-8877-66d4e954ce03',
            'Accept': 'application/json'
        }
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });
}

callNpAPI();
callCampsiteAPI();
//callCampAPI();