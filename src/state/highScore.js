const getHighScore = () => {
    if (localStorage.getItem("highScore")) return localStorage.getItem("highScore");
    return 0;
}

export default getHighScore;
