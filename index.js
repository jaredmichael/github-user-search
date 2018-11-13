'use strict';

const searchUrl = 'https://api.github.com/users/'
const token = 'token ea9c0eb177a2fc93305f4b6e0e18e9c7640f28e9'

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();

    for (let i=0; i < responseJson.length; i++) {
        $('#results-list').append(
            `<li><h2>${responseJson[i].name}</h2>
            <h3><a href="${responseJson[i].html_url}">
            ${responseJson[i].html_url}</a><h3>`
        )
        
    }
    $('#results').show();
}

function getRepos(userSearch) {
    const url = searchUrl + userSearch + '/repos'
    console.log(url);

    // const options = {
    //    headers: new Headers({
    //      "Authorization": token})
    //};

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson)
        )
        .catch(err => {
            $('#js-error-message').text(`Oops! Something went wrong: ${err.message}`);
        });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const userSearch = $('#js-user-search').val();
        getRepos(userSearch);
    });
}

$(watchForm);