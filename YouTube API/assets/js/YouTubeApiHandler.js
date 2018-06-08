const API_KEY = 'AIzaSyCBzgSiGIiMib35Ud0uY2YAAGJR5Cl3iJY';
const ITEMS_COUNT = 40;

var apiResponse;
var apiResponseData;
var videosData = {};

function getRequestUri(query) {
    return 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + query + '&type=video&maxResults=' + ITEMS_COUNT + '&key=' + API_KEY;
}

function apiSearchRequest(query) {
    var requestUri = getRequestUri(query);
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            apiResponse = this.responseText;
        }
    };

    xhttp.open("GET", requestUri, false);
    xhttp.send();

}

function validateResponse() {
    if (isset(apiResponse)) {
        apiResponseData = JSON.parse(apiResponse);

        return isset(apiResponseData);
    }

    return false;
}

function getVideosData() {
    apiResponseData = JSON.parse(apiResponse);
    videosData = isset(apiResponseData['items']) ? apiResponseData['items'] : [];

    var videoIndex;
    var videoInfoArray = [];

    for (videoIndex in videosData) {
        var videoData = videosData[videoIndex];
        var videoId = null;
        var videoAuthor = null;
        var videoTitle = null;
        var videoThumb = null;
        var videoDesc = null;

        if (isset(videoData)) {
            if (isset(videoData['id']) && isset(videoData['id']['videoId'])) {
                videoId = videoData['id']['videoId'];
            }

            if (isset(videoData['snippet']) && isset(videoData['snippet']['channelTitle'])) {
                videoAuthor = videoData['snippet']['channelTitle'];
            }

            if (isset(videoData['snippet']) && isset(videoData['snippet']['title'])) {
                videoTitle = videoData['snippet']['title'];
            }

            if (isset(videoData['snippet']) && isset(videoData['snippet']['thumbnails'])) {
                videoThumb = videoData['snippet']['thumbnails']['high']['url'];
            }

            if (isset(videoData['snippet']) && isset(videoData['snippet']['description'])) {
                videoDesc = videoData['snippet']['description'];
            }
        }

        var videoInfo = {
            'id' : videoId,
            'title' : videoTitle,
            'author' : videoAuthor,
            'thumbnail' : videoThumb,
            'description' : videoDesc
        };

        videoInfoArray.push(videoInfo);
    }

    return videoInfoArray;
}

function search(query) {
    if (isset(query)) {
        apiSearchRequest(query);

        if (validateResponse) {
            var videosData = getVideosData();

            if (isset(videosData) && videosData.length !== 0) {
                drawSearchResults(videosData);
            } else {
                drawMessage('error', 'Nothing found');
            }
        } else {
            drawMessage('error', 'Invalid API response');
        }

    } else {
        drawMessage('error', 'No search query specified');
    }
}