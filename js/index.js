document.addEventListener("DOMContentLoaded", function() {
    const githubForm = document.getElementById("github-form");
    const search = document.getElementById("search");
    const userList = document.getElementById("user-list");
    const reposList = document.getElementById("repos-list");

    githubForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const userNames = search.value;
  
    searchUser(userNames)
        .then(users => {
            userNameList(users);
            userList.addEventListener("click", function(e) {
                if (e.target.tagName === "LI") {
                const username = e.target.dataset.username;
                getNames(username)
                .then(repos => {
                    repoList(repos);
                })
                .catch(error => console.error(error));
            }
            });
        })
        .catch(error => console.error(error));
    });

    function searchUser(query) {
      const apiUrl = `https://api.github.com/search/users?q=${query}`;
      return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => data.items)
        .catch(error => {
            console.error(`Error searching users: ${error.message}`);
            throw error;
        });
    }

    function userNameList(users) {
        userList.innerHTML = "";
        users.forEach(user => {
            const listItem = document.createElement("li");
            listItem.textContent = user.login;
            listItem.dataset.username = user.login;
            userList.appendChild(listItem);
        });
    }

    function getNames(username) {
        const apiUrl = `https://api.github.com/users/${username}/repos`;
        return fetch(apiUrl)
            .then(response => {
            if (!response.ok) {
            throw new Error(`GitHub API error: ${response.statusText}`);
        }
            return response.json();
        })
        .catch(error => {
            console.error(`Error fetching user repos: ${error.message}`);
            throw error;
        });
    }

    function repoList(repos) {
        reposList.innerHTML = "";
        repos.forEach(repo => {
            const listItem = document.createElement("li");
            listItem.textContent = repo.name;
            reposList.appendChild(listItem);
        });
    }
});