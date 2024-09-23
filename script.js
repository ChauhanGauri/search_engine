       
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchHistory = document.getElementById('searchHistory');
const clearHistoryButton = document.getElementById('clearHistoryButton');

// Load search history from localStorage
let history = JSON.parse(localStorage.getItem('searchHistory')) || [];

// Function to update search history display
function updateHistoryDisplay() {
    searchHistory.innerHTML = '';
    history.forEach((term, index) => {
        const li = document.createElement('li');
        
        const termSpan = document.createElement('span');
        termSpan.textContent = term;
        termSpan.classList.add('history-item-text');
        termSpan.addEventListener('click', () => {
            searchInput.value = term;
            searchInput.focus();
        });
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => deleteHistoryItem(index));
        
        li.appendChild(termSpan);
        li.appendChild(deleteButton);
        searchHistory.appendChild(li);
    });
    
    // Show/hide clear history button based on history length
    clearHistoryButton.style.display = history.length ? 'block' : 'none';
}

// Function to add search term to history
function addToHistory(term) {
    // Remove the term if it already exists to avoid duplicates
    history = history.filter(item => item.toLowerCase() !== term.toLowerCase());
    
    // Add the new term at the beginning of the array
    history.unshift(term);
    
    // Keep only the last 10 searches
    history = history.slice(0, 10);
    
    // Save to localStorage
    localStorage.setItem('searchHistory', JSON.stringify(history));
    
    // Update the display
    updateHistoryDisplay();
}

// Function to delete individual history item
function deleteHistoryItem(index) {
    history.splice(index, 1);
    localStorage.setItem('searchHistory', JSON.stringify(history));
    updateHistoryDisplay();
}

// Function to perform search
function performSearch(term) {
    console.log('Searching for:', term);
    // Here you would typically send the search term to a backend API
    // For this example, we'll just log it to the console
}

// Event listener for search button
searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        addToHistory(searchTerm);
        performSearch(searchTerm);
        searchInput.value = ''; // Clear the input field
    }
});

// Event listener for search input (allow search on Enter key)
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchButton.click();
    }
});

// Event listener for clear history button
clearHistoryButton.addEventListener('click', () => {
    history = [];
    localStorage.removeItem('searchHistory');
    updateHistoryDisplay();
});

// Initial display of search history
updateHistoryDisplay();