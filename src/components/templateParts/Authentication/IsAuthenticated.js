const IsAuthenticated = () => {
    const appState = localStorage.getItem("appState");
    if (appState) {
        const appCredentials = JSON.parse(appState);
        if (appCredentials.jwt) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
};

export default IsAuthenticated;