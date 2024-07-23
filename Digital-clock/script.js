function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const date = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const clockElement = document.getElementById('clock');
    const dateElement = document.getElementById('date');
    
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    dateElement.textContent = date;
}

// Update the clock immediately and then every second
updateClock();
setInterval(updateClock, 1000);
