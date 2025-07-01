function parseAndStoreToken() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");

    if (accessToken) {
        sessionStorage.setItem("access_token", accessToken);
        window.location.hash = "";
    }
}

function getAccessToken() {
    return sessionStorage.getItem("access_token");
}

function getUserInfo() {
    const token = getAccessToken();
    if (!token) return null;
    try {
        return jwt_decode(token);
    } catch {
        return null;
    }
}

function initAuth() {
    parseAndStoreToken();
    const user = getUserInfo();
    const username = document.getElementById("username");
    if (user) {
        username.textContent = `Welcome, ${user.email || user.username}`;
    } else {
        username.textContent = "Not logged in";
    }
}

window.onload = initAuth;