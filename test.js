function openModal(imageSrc) {
var modal = document.getElementById("myModal");
var modalImage = document.getElementById("modalImage");
modal.style.display = "flex";
modalImage.src = imageSrc;
}

function closeModal() {
var modal = document.getElementById("myModal");
modal.style.display = "none";
}

function filterProjects() {
var categorySelector = document.querySelector('.category-dropdown select');
var selectedCategory = categorySelector.value;

var projects = document.querySelectorAll('.project');

projects.forEach(function(project) {
var projectCategory = project.getAttribute('data-category');

if (selectedCategory === 'all' || projectCategory === selectedCategory) {
    project.style.display = 'block';
} else {
    project.style.display = 'none';
}
});
}
// Autocomplete functionality
var projects = [
{ name: 'Project 1', category: 'design', image: 'ez.jpg' },
{ name: 'Project 2', category: 'photography', image: 'ez1.jpg' },
{ name: 'Project 3', category: 'illustration', image: 'ez2.jpg' }
];

var searchInput = document.querySelector('input[type="text"]');
var suggestionsContainer = document.createElement('div');
suggestionsContainer.classList.add('suggestions-container');
searchInput.parentNode.appendChild(suggestionsContainer);

function showSuggestions() {
var inputValue = searchInput.value.toLowerCase();
var matchingProjects = projects.filter(function(project) {
    return project.name.toLowerCase().includes(inputValue);
});

suggestionsContainer.innerHTML = '';

matchingProjects.forEach(function(project) {
    var suggestion = document.createElement('div');
    suggestion.classList.add('suggestion');
    suggestion.textContent = project.name;
    suggestion.onclick = function() {
    searchInput.value = project.name;
    suggestionsContainer.innerHTML = ''; // Clear suggestions after selection
    };
    suggestionsContainer.appendChild(suggestion);
});
}

searchInput.addEventListener('input', showSuggestions);

// Close suggestions when clicking outside the input and suggestions container
document.addEventListener('click', function(event) {
if (!event.target.matches('input[type="text"]') && !event.target.matches('.suggestion')) {
    suggestionsContainer.innerHTML = '';
}
});

var likedProjects = [];

function toggleLike(index) {
var likeButton = document.getElementById('like-button-' + index);
var project = projects[index];

if (likedProjects.includes(index)) {
    // Unlike
    likedProjects = likedProjects.filter(function (item) {
    return item !== index;
    });
    likeButton.classList.remove('liked');
} else {
    // Like
    likedProjects.push(index);
    likeButton.classList.add('liked');
}
}

function searchProjects() {
    var searchInput = document.getElementById('search-input');
    var inputValue = searchInput.value.toLowerCase();

    var matchingProjects = projects.filter(function(project) {
      return project.name.toLowerCase().includes(inputValue);
    });

    displaySearchResults(matchingProjects);
  }

  function clearsearchProjects(){
    displaySearchResults("");
  }

  function displaySearchResults(results) {
    var searchResultsContainer = document.getElementById('search-results');
    searchResultsContainer.innerHTML = '';

    results.forEach(function(project) {
      var projectCard = createProjectCard(project);
      searchResultsContainer.appendChild(projectCard);
    });
  }

function createProjectCard(project) {
    var projectCard = document.createElement('div');
    projectCard.classList.add('project');
    projectCard.onclick = function() {
      openModal(project.image);
    };

    var projectImage = document.createElement('img');
    projectImage.src = project.image;
    projectImage.alt = project.name;

    var likeButton = document.createElement('button');
    likeButton.classList.add('like-button');
    likeButton.id = 'like-button-' + projects.indexOf(project);
    likeButton.onclick = function() {
      toggleLike(projects.indexOf(project));
    };
    if (likedProjects.includes(projects.indexOf(project))) {
      likeButton.classList.add('liked');
    }
    likeButton.textContent = 'Like';

    projectCard.appendChild(projectImage);
    projectCard.appendChild(likeButton);

    return projectCard;
  }
