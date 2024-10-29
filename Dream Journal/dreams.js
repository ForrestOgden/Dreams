document.addEventListener('DOMContentLoaded', () => {
    const dreamsList = document.getElementById('dreamsList');
    displayDreams(); // Call this function to populate the dreams

    function displayDreams() {
        const dreams = JSON.parse(localStorage.getItem('dreams')) || [];
        dreamsList.innerHTML = ''; // Clear existing list

        dreams.forEach(entry => {
            const li = document.createElement('li');
            li.textContent = `Date: ${entry.date}, Mood: ${entry.mood}, Dream: ${entry.dream}`;
            dreamsList.appendChild(li);
        });
    }
});
