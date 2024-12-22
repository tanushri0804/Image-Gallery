// Get the modal and its elements 
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const downloadLink = document.getElementById("downloadLink");
const saveBtn = document.getElementById("saveLink");
const closeBtn = document.querySelector(".close");
const unsaveConfirmationBox = document.getElementById("unsaveConfirmationBox");
const confirmUnsaveBtn = document.getElementById("confirmUnsave");
const cancelUnsaveBtn = document.getElementById("cancelUnsave");

// Get all gallery items
const galleryItems = document.querySelectorAll(".gallery-item img");

let savedImages = JSON.parse(localStorage.getItem("savedImages")) || [];
let isSaved = false;
let currentIndex = 0; // Initialize current image index

// Function to open the modal
galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        modal.style.display = "flex";
        showImage(index);
    });
});

// Function to show the current image in the modal
function showImage(index) {
    currentIndex = index;
    const currentImage = galleryItems[currentIndex];
    modalImg.src = currentImage.src;
    downloadLink.href = currentImage.src;

    // Check if the image is saved
    isSaved = savedImages.includes(currentImage.src);
    updateSaveButton();
}
// Function to update the save button icon
function updateSaveButton() {
    saveBtn.innerHTML = isSaved ? '<i class="fas fa-bookmark"></i>' : '<i class="far fa-bookmark"></i>';
}
 // Close modal on close button click
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Navigate to the previous image
document.getElementById("prevImage").addEventListener("click", () => {
    if (currentIndex > 0) {
        showImage(currentIndex - 1);
    }
});
// Navigate to the next image
document.getElementById("nextImage").addEventListener("click", () => {
    if (currentIndex < galleryItems.length - 1) {
        showImage(currentIndex + 1);
    }
});

// Save/Unsave image on save button click
saveBtn.addEventListener("click", () => {
    if (isSaved) {
        unsaveConfirmationBox.style.display = "block"; // Show confirmation box
    } else {
        saveImage();
    }
});

// Confirm unsave action
confirmUnsaveBtn.addEventListener("click", () => {
    unsaveImage();
    unsaveConfirmationBox.style.display = "none";
});

// Cancel unsave action
cancelUnsaveBtn.addEventListener("click", () => {
    unsaveConfirmationBox.style.display = "none";
});

// Save the image
function saveImage() {
    if (!savedImages.includes(modalImg.src)) {
        savedImages.push(modalImg.src);
        localStorage.setItem("savedImages", JSON.stringify(savedImages));
        isSaved = true;
        updateSaveButton();
        updateSavedImagesSection();
    }
}

// Unsave the image
function unsaveImage() {
    savedImages = savedImages.filter((img) => img !== modalImg.src);
    localStorage.setItem("savedImages", JSON.stringify(savedImages));
    isSaved = false;
    updateSaveButton();
    updateSavedImagesSection();
}

function updateSavedImagesSection() {
    const savedImagesContainer = document.getElementById("savedImagesContainer");
    savedImagesContainer.innerHTML = ""; // Clear the container
    savedImages.forEach((src) => {
        const galleryItem = document.createElement("div"); // Create a div for the image
        galleryItem.classList.add("gallery-item"); // Add the gallery-item class

        const img = document.createElement("img"); // Create the img element
        img.src = src;
        img.alt = "Saved Image";
        galleryItem.appendChild(img); // Append the img to the gallery-item div

        savedImagesContainer.appendChild(galleryItem); // Append the gallery-item to the container
    });
}


// Initialize the saved images section
updateSavedImagesSection();

// Close modal on click outside the image
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});
// Navigate to the previous image
document.getElementById("prevImage").addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        showImage(currentIndex);
    }
});

// Navigate to the next image
document.getElementById("nextImage").addEventListener("click", () => {
    if (currentIndex < galleryItems.length - 1) {
        currentIndex++;
        showImage(currentIndex);
    }
});

// Add event listener for keydown events to navigate with arrow keys
window.addEventListener('keydown', function(event) {
    if (modal.style.display === "flex") { // Check if modal is open
        if (event.key === "ArrowLeft") {
            // Previous image
            if (currentIndex > 0) {
                currentIndex--;
                showImage(currentIndex);
            }
        } else if (event.key === "ArrowRight") {
            // Next image
            if (currentIndex < galleryItems.length - 1) {
                currentIndex++;
                showImage(currentIndex);
            }
        }
    }
});
// Select all navigation links and sections
const navLinks = document.querySelectorAll(".nav-link");
const screens = document.querySelectorAll(".screen");

// Function to show the selected screen and hide others
function showScreen(screenId) {
    screens.forEach(screen => {
        if (screen.id === screenId) {
            screen.classList.remove("hidden");
        } else {
            screen.classList.add("hidden");
        }
    });
}

// Add click event listeners to navigation links
navLinks.forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default link behavior
        const screenId = link.getAttribute("data-screen"); // Get the target screen ID
        showScreen(screenId); // Show the corresponding screen
    });
});

// Show the "Home" screen by default on page load
showScreen("home");
const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('fileInput');
const uploadPreview = document.getElementById('uploadPreview');

// Function to handle files
function handleFiles(files) {
    const file = files[0];
    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadPreview.innerHTML = `<img src="${e.target.result}" alt="Preview Image">`;
            uploadPreview.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
}

// Drag-and-drop events
['dragenter', 'dragover'].forEach(eventType => {
    dropArea.addEventListener(eventType, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropArea.classList.add('dragover');
    });
});

['dragleave', 'drop'].forEach(eventType => {
    dropArea.addEventListener(eventType, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropArea.classList.remove('dragover');
    });
});

dropArea.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    handleFiles(files);
});

fileInput.addEventListener('change', () => {
    const files = fileInput.files;
    handleFiles(files);
});
