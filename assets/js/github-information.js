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
}