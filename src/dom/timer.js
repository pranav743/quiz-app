const timerDisplay = document.createElement("p");
document.body.appendChild(timerDisplay);

export const createTimer = (cb) => {
    const duration = 15;
    let remaining = duration;

    const formatTime = (seconds) => {
        const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        return `${hrs}::${mins}::${secs}`;
    };

    timerDisplay.textContent = formatTime(remaining);

    const ticking = setInterval(() => {
        remaining--;
        timerDisplay.textContent = formatTime(remaining);

        if (remaining <= 0) {
            clearInterval(ticking);
        }
    }, 1000);

    const timer = setTimeout(() => {
        clearInterval(ticking);
        cb();
    }, duration * 1000);

    return { ticking, timer };
};
