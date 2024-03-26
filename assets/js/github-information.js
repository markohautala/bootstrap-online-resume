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
        $.getJSON(`https://api.github.com/users/${username}`)
    ).then(
        function (response) {
            var userData = response;
            $("#gh-user-data").html(userInformationHTML(userData));
        }, function (errorResponse) {
            if (errorResponse.status === 404) {
                $("gh-user-data").html(`<p>No info found for user ${username}</p>`);
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(`<p>Error: ${errorResponse.responseJSON.message}</p>`);
            }

            });
        }
