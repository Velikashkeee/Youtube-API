const MESSAGE_CLASSES = {
    'info' : '',
    '' : '',
    'error' : 'error'
};

var contentElement;

function getMessageElement(messageType, messageText) {
    var messageElement = document.createElement('div');

    messageElement.classList.add('message');
    MESSAGE_CLASSES[messageType] !== '' ? messageElement.classList.add(MESSAGE_CLASSES[messageType]) : null;
    messageElement.innerText = messageText;

    return messageElement;
}

function clearContentElement() {
    contentElement = document.getElementsByClassName('content').item(0);
    while (contentElement.firstChild) {
        contentElement.removeChild(contentElement.firstChild);
    }
}

function draw(element, overwrite) {
    contentElement = document.getElementsByClassName('content').item(0);
    
    if (overwrite) {
        clearContentElement();
    }
    contentElement.appendChild(element);
}

function getVideoUrlById(id) {
    return 'https://www.youtube.com/watch?v=' + id;
}

function getResultElement(resultData) {
    var resultElement = document.createElement('a');
    var resultElementContent = document.createElement('div');

    resultElement.setAttribute('href', getVideoUrlById(resultData['id']));
    resultElement.setAttribute('target', '_blank');
    resultElementContent.classList.add('item');

    var resultElementThumbnail = document.createElement('div');

    resultElementThumbnail.classList.add('thumbnail');
    resultElementThumbnail.setAttribute("style", 'background-image: url(' + resultData['thumbnail'] + ')');

    var resultElementInfo = document.createElement('div');

    resultElementInfo.classList.add('info');

    var resultElementTitle = document.createElement('span');

    resultElementTitle.classList.add('title');
    resultElementTitle.innerText = resultData['title'];

    var resultElementAuthor = document.createElement('span');

    resultElementAuthor.classList.add('title');
    resultElementAuthor.classList.add('author');
    resultElementAuthor.innerText = resultData['author'];

    var resultElementDescription = document.createElement('span');

    if (isset(resultData['description']) && resultData['description'] !== '') {
        resultElementDescription.classList.add('title');
        resultElementDescription.classList.add('description');
        resultElementDescription.innerText = resultData['description'];
    }

    resultElementInfo.appendChild(resultElementTitle);
    resultElementInfo.appendChild(resultElementAuthor);
    resultElementInfo.appendChild(resultElementDescription);
    resultElementContent.appendChild(resultElementThumbnail);
    resultElementContent.appendChild(resultElementInfo);
    resultElement.appendChild(resultElementContent);


    return resultElement;
}

function getResultsHolderElement() {
    var resultsHolderElement = document.createElement('div');

    resultsHolderElement.classList.add('results-holder');

    return resultsHolderElement;

}

function drawSearchResults(resultsData) {
    var resultIndex;
    var resultElements = [];

    for (resultIndex in resultsData) {
        var resultData = resultsData[resultIndex];

        resultElements.push(getResultElement(resultData))
    }

    if (resultElements.length !== 0) {
        clearContentElement();

        var resultsHolder = getResultsHolderElement();

        var elementIndex;

        for (elementIndex in resultElements) {
            resultsHolder.appendChild(resultElements[elementIndex]);
        }

        contentElement.appendChild(resultsHolder);
    } else {
        drawMessage('error', 'Nothing found');
    }
}

function isValidMessageType(messageType) {
    return isset(messageType) && Object.keys(MESSAGE_CLASSES).indexOf(messageType) !== -1;
}

function drawMessage(messageType, messageText) {
    if (isValidMessageType(messageType) && isset(messageText)) {
        var messageElement = getMessageElement(messageType, messageText);

        draw(messageElement, true);
    }
}