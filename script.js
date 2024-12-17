// Select all buttons and dropdowns
const buttons = [
    { button: "watchButton", dropdown: "watchDropdown" },
    { button: "resourcesButton", dropdown: "resourcesDropdown" },
    { button: "classroomButton", dropdown: "classroomDropdown" },
    { button: "aboutButton", dropdown: "aboutDropdown" },

];

// Toggle dropdown visibility
buttons.forEach(({ button, dropdown }) => {
    const btn = document.getElementById(button);
    const dd = document.getElementById(dropdown);

    btn.addEventListener("click", () => {
        // Close other dropdowns
        buttons.forEach(({ dropdown: otherDropdown }) => {
            if (otherDropdown !== dropdown) {
                document.getElementById(otherDropdown).style.display = "none";
            }
        });

        // Toggle current dropdown
        if (dd.style.display === "block") {
            dd.style.display = "none";
        } else {
            dd.style.display = "block";
        }
    });
});

// Close dropdowns if the user clicks outside
window.addEventListener("click", (event) => {
    buttons.forEach(({ button, dropdown }) => {
        if (
            !document.getElementById(button).contains(event.target) &&
            !document.getElementById(dropdown).contains(event.target)
        ) {
            document.getElementById(dropdown).style.display = "none";
        }
    });
});







































// Search function to highlight only the typed portion and scroll to the first result
function searchFunction() {
    const searchQuery = document.getElementById('search-bar').value.toLowerCase();
    const content = document.getElementById('content');
    const allElements = content.querySelectorAll('*');
    let found = false;

    // Show the stop button when user starts typing
    const stopButton = document.getElementById('stop-button');
    if (searchQuery) {
        stopButton.classList.add('show'); // Show the stop button
    } else {
        stopButton.classList.remove('show'); // Hide the stop button when search is cleared
    }

    // Remove any previous highlights
    removeHighlights();

    // If the search query is empty, return early
    if (!searchQuery) return;

    // Loop through all elements inside #content to search for matches
    allElements.forEach(element => {
        if (element.children.length === 0) { // Only process elements without child elements
            const text = element.textContent;
            const lowerText = text.toLowerCase();

            if (lowerText.includes(searchQuery)) {
                // Replace the matching text with a span containing the highlight class
                const regex = new RegExp(`(${searchQuery})`, 'gi');
                const highlightedText = text.replace(regex, '<span class="highlight">$1</span>');
                element.innerHTML = highlightedText;

                if (!found) {
                    // Scroll to the first matching element
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    found = true;
                }
            }
        }
    });

    // Fix the search bar at the top and increase its width when searching
    const searchBar = document.getElementById('search-bar');
    const searchContainer = document.getElementById('search-container');
    if (searchQuery) {
        searchBar.classList.add('fixed-search-bar');
        searchBar.style.width = '1560px';  // Increase width while searching
        searchContainer.classList.add('fixed-search-container'); // Adjust container width
        stopButton.classList.add('fixed-stop-button');  // Make stop button fixed
    } else {
        searchBar.classList.remove('fixed-search-bar');
        searchBar.style.width = '300px';  // Reset width when not searching
        searchContainer.classList.remove('fixed-search-container'); // Reset container width
        stopButton.classList.remove('fixed-stop-button');  // Reset stop button position
    }
}

// Function to remove highlights
function removeHighlights() {
    const highlightedElements = document.querySelectorAll('.highlight');
    highlightedElements.forEach(span => {
        const parent = span.parentNode;
        parent.replaceChild(document.createTextNode(span.textContent), span);
        parent.normalize(); // Merge adjacent text nodes
    });
}

// Function to stop the search, reset the search bar, and remove highlights
function stopSearch() {
    const searchBar = document.getElementById('search-bar');
    const allElements = document.querySelectorAll('#content *');

    // Clear the search bar
    searchBar.value = '';

    // Remove all highlights from the content
    removeHighlights();

    // Hide the stop button
    document.getElementById('stop-button').classList.remove('show');

    // Reset search bar to its original position and width
    const searchContainer = document.getElementById('search-container');
    searchBar.classList.remove('fixed-search-bar');
    searchBar.style.width = '300px';  // Reset width to original size
    searchContainer.classList.remove('fixed-search-container'); // Reset container width
}












let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
        dots[i].classList.toggle('active', i === index);
    });
}

function changeSlide(step) {
    slideIndex = (slideIndex + step + slides.length) % slides.length;
    showSlide(slideIndex);
}

function setSlide(index) {
    slideIndex = index;
    showSlide(slideIndex);
}

// Auto slideshow
function autoSlide() {
    changeSlide(1);
    setTimeout(autoSlide, 3000);
}

prevButton.addEventListener('click', () => changeSlide(-1));
nextButton.addEventListener('click', () => changeSlide(1));
dots.forEach((dot, index) => dot.addEventListener('click', () => setSlide(index)));

// Initialize
showSlide(slideIndex);
autoSlide();











// JavaScript to hide the loader after 1 seconds 
window.onload = function () {
    setTimeout(function () {
        document.getElementById("loader").style.display = "none"; // Hide loader
        document.getElementById("content").style.display = "block"; // Show content
    }, 1500); // 10 seconds in milliseconds
};



