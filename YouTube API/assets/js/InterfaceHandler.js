function initInterface() {
    searchButton.addEventListener('click', searchVideoAction);
    queryField.addEventListener('keyup', function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            searchVideoAction();
        }
    });
}

function searchVideoAction() {
    if (queryField.value.length !== 0) {
        search(queryField.value);
    } else {
        drawMessage('error', 'Enter the search query');
    }
}