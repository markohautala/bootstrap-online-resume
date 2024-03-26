function userInformationHTML(user) {
    return `<h2>${user.name}
                <span class="small-name">
                    (@<a href="${user.html_url}" target="_blank">${user.login}
                    </a>)
                </span>
            </h2>
            <div class="gh-content">
                <div class="gh-avatar">
                    <a href="${user.html_url}" target="_blank">
                        <img src="${user.avatar_url}" width="80px" height="80px" alt="${user.login}" />
                    </a>
                </div>
                <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
            </div>`;
}

function repoInformationHTML(repos) {
    if (repos.lenght == 0) {
        return `<div class="clearfix repo-list" >No repos found!</div>`;
    }

    var listItemsHTML = repos.map(function(repo) {
        return `<li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`;
    })

    return `<div class="clearfix repo-list" >
                <p>
                    <strong>Repo List:</strong>
                </p>
                <ul>
                    ${listItemsHTML.join("\n")}
                </ul>
            </div>`;
}

function fetchGitHubInformation(event) {
    var username = $("#gh-username").val();
    if (!username) { // if the username is empty, display a message
        $("#gh-user-data").html("<p>Please enter a GitHub username</p>");
        return;
    }

    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/images/loader.gif" alt="loading..." />
        </div>`);

    $.when(
        $.getJSON(`https://api.github.com/users/${username}`),
        $.getJSON(`https://api.github.com/users/${username}/repos`)
    ).then(
        function (firstResponse, secondResponse) {
            var userData = firstResponse[0]; // firstResponse is an array, so we need to get the first element
            var repoData = secondResponse[0];  // secondResponse is an array, so we need to get the first element
            $("#gh-user-data").html(userInformationHTML(userData));
            $("#gh-repo-data").html(userInformationHTML(repoData));
        }, function (errorResponse) {
            if (errorResponse.status === 404) {
                $("gh-user-data").html(`<p>No info found for user ${username}</p>`);
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(`<p>Error: ${errorResponse.responseJSON.message}</p>`);
            }
        });
}
