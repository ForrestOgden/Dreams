document.addEventListener('DOMContentLoaded', () => {
    const dreamsList = document.getElementById('dreamsList');
    displayDreams(); // Call this function to populate the dreams

    function displayDreams() {
        const dreams = JSON.parse(localStorage.getItem('dreams')) || [];
        dreamsList.innerHTML = ''; // Clear existing list

        dreams.forEach((entry, index) => { // Include index to identify each dream
            const li = document.createElement('li');
            li.textContent = `Date: ${entry.date}, Mood: ${entry.mood}, Dream: ${entry.dream}`;
            
            // Create delete button
            const deleteButton = document.createElement('button');
	    deleteButton.classList.add('delete');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deleteDream(index); // Pass index to delete function

            li.appendChild(deleteButton); // Append delete button to the list item
            dreamsList.appendChild(li); // Append list item to the list
        });
    }

    function deleteDream(index) {
        const dreams = JSON.parse(localStorage.getItem('dreams')) || [];
        dreams.splice(index, 1); // Remove the dream at the specified index
        localStorage.setItem('dreams', JSON.stringify(dreams)); // Save updated dreams to localStorage
        displayDreams(); // Refresh the display
    }
});
