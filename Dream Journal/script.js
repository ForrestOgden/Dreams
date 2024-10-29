document.addEventListener('DOMContentLoaded', () => {
    const logForm = document.getElementById('logForm');
    const moodChartCanvas = document.getElementById('moodChart').getContext('2d');
    
    // Mood and Dream logging
    logForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const dreamInput = document.getElementById('dream').value;
        const moodInput = document.getElementById('mood').value;

        // Create a mood entry with the current date
        const moodData = {
            mood: moodInput,
            date: new Date().toLocaleDateString(),
            dream: dreamInput,
        };

        // Save to localStorage
        const dreams = JSON.parse(localStorage.getItem('dreams')) || [];
        dreams.push(moodData);
        localStorage.setItem('dreams', JSON.stringify(dreams));

        // Reset form
        logForm.reset();
        updateChart(); // Update mood chart after logging
    });

    // Charting moods
    const moodChart = new Chart(moodChartCanvas, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Mood Over Time',
                data: [],
                borderColor: '#124672',
                borderWidth: 2,
                fill: false,
            }],
        },
        options: {
            scales: {
                y: {
                    min: 0,
                    max: 10,
                    beginAtZero: true,
                },
            },
        },
    });

    function updateChart() {
        const dreams = JSON.parse(localStorage.getItem('dreams')) || [];
        const moodLabels = [];
        const moodValues = [];

        dreams.forEach(entry => {
            moodLabels.push(entry.date);
            moodValues.push(moodScale(entry.mood)); // Map mood to numerical scale
        });

        // Clear previous data
        moodChart.data.labels = moodLabels;
        moodChart.data.datasets[0].data = moodValues;

        moodChart.update(); // Update the chart
    }

    function moodScale(mood) {
        switch (mood) {
            case 'joyful': return 10;
            case 'happy': return 8;
            case 'neutral': return 5;
            case 'sad': return 2;
            case 'frustrated': return 1;
            case 'angry': return 0;
            case 'anxious': return 3;
            case 'excited': return 9;
            case 'relaxed': return 7;
            case 'inspired': return 6;
            default: return 5;
        }
    }

    updateChart(); // Initial chart update
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then((registration) => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch((error) => {
                console.error('Service Worker registration failed:', error);
            });
    });
}

