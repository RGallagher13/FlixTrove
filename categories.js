var images = {
    "1" : "https://m.media-amazon.com/images/M/MV5BOGFmZmNmNTQtOWVmMS00YzQwLWJjMjctYzM5MDk3YjVjNzA4XkEyXkFqcGdeQXVyNzA3ODUyNzY@._V1_FMjpg_UX1000_.jpg",
    "2" : "https://m.media-amazon.com/images/M/MV5BMDQ0NjgyN2YtNWViNS00YjA3LTkxNDktYzFkZTExZGMxZDkxXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_FMjpg_UX1000_.jpg",
    "3" : "https://m.media-amazon.com/images/M/MV5BMjA4NDg3NzYxMF5BMl5BanBnXkFtZTcwNTgyNzkyNw@@._V1_FMjpg_UX1000_.jpg",
    "4" : "https://m.media-amazon.com/images/M/MV5BMjI0NDI1MTMyM15BMl5BanBnXkFtZTcwMDMzMTcyNA@@._V1_FMjpg_UX1000_.jpg",
    "5" : "https://m.media-amazon.com/images/M/MV5BMTI1MTY2OTIxNV5BMl5BanBnXkFtZTYwNjQ4NjY3._V1_FMjpg_UX1000_.jpg",
    "6" : "https://m.media-amazon.com/images/M/MV5BNzQ3OTY4NjAtNzM5OS00N2ZhLWJlOWUtYzYwZjNmOWRiMzcyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg",
    "7" : "https://m.media-amazon.com/images/M/MV5BMzU3YWYwNTQtZTdiMC00NjY5LTlmMTMtZDFlYTEyODBjMTk5XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg",
    "8" : "https://m.media-amazon.com/images/M/MV5BZDA0ODYzZGMtOGI3ZS00YTdjLTk0ZjEtYzA0Zjg3MDM4OTA4XkEyXkFqcGdeQXVyMTUzMDUzNTI3._V1_FMjpg_UX1000_.jpg",
    "9" : "https://m.media-amazon.com/images/M/MV5BY2JiYTNmZTctYTQ1OC00YjU4LWEwMjYtZjkwY2Y5MDI0OTU3XkEyXkFqcGdeQXVyNTI4MzE4MDU@._V1_FMjpg_UX1000_.jpg",
    "10" : "https://m.media-amazon.com/images/M/MV5BYjhmNjMzNTktOWYzNS00NDA0LThhZmItNTBhOGNkNDk3MDc2XkEyXkFqcGdeQXVyNzU3Nzk4MDQ@._V1_FMjpg_UX1000_.jpg"
};
 
 // Appending images to the container
Object.keys(images).forEach(function(movieId) {
    var imagePath = images[movieId];
    var imgElement = $("<img class='my_img' width='200' height='300' src='" + imagePath + "' data-movie-id='" + movieId + "'>");
    $('#hold_images').append(imgElement);
});


// Function to add icon
function add_icon(selector, iconClass, size, color) {
    $(selector).append("<i class='" + iconClass + "' style='font-size: " + size + "; color: " + color + "'></i>");
}

// Appending left and right icons
$('body').append("<i id='icon_right'></i>");
$('body').append("<i id='icon_left'></i>");

add_icon('#icon_right', 'fas fa-chevron-right', '40px', "black");
add_icon('#icon_left', 'fas fa-chevron-left', '40px', "black");

// Adding hover effect to images
$(document).ready(function(){
    $('.my_img').hover(function() {
        $(this).addClass('transition');
    }, function() {
        $(this).removeClass('transition');
    });
});

// Click event for scrolling
$(document).on('click', '#icon_right, #icon_left', function() {
    var scrollDistance = $(window).width() / 2; // Adjust scroll distance as needed
    if ($(this).attr('id') == 'icon_right') {
        $('html, body').animate({scrollLeft: '+=' + scrollDistance}, 800); // Scroll right
    } else {
        $('html, body').animate({scrollLeft: '-=' + scrollDistance}, 800); // Scroll left
    }
});

// Modal code
$(document).ready(function() {
    var preferenceToRecord = null; // Variable to store the user's choice

    // Handle click on movie images
    $(document).on('click', '.my_img', function() {
        var movieId = $(this).data('movie-id'); // Get movie ID from data attribute
        $('#myModal').data('movie-id', movieId); // Store movie ID in modal
        $('#myModal').css('display', 'block');
    });



// Function to handle recording user's choice 
function record() {
    console.log('Recording user choice:', preferenceToRecord); // Log the preference being recorded
    if (preferenceToRecord !== null) {
        var movieId = $('#myModal').data('movie-id'); // Get movie ID from modal
        console.log('Recording for movie ID:', movieId); // Log the movie ID being recorded
        localStorage.setItem(movieId, preferenceToRecord); // Store user's choice
        preferenceToRecord = null; // Reset the preference flag
    }
}


// Handle thumbs up click
$('#thumbsUp').click(function(event) {
    preferenceToRecord = 'thumbsUp'; // Set the preference flag
    record(); 
});

// Handle thumbs down click
$('#thumbsDown').click(function(event) {
    preferenceToRecord = 'thumbsDown'; // Set the preference flag
    record(); 
});

    // Handle close button click
    $('.close').click(function() {
        preferenceToRecord = null; // Reset preference flag to null before closing
        $('#myModal').css('display', 'none'); // Close modal
    });

    // Close modal when clicking outside the modal
    $('#myModal').click(function(event) {
        if (event.target === this) {
            preferenceToRecord = null; // Reset preference flag to null before closing
            $('#myModal').css('display', 'none'); // Close modal
        }
    });
});

// Get stored preference for a specific movie
Object.keys(images).forEach(function(movieId) {
    var preference = localStorage.getItem(movieId); // Retrieve stored preference for the movie
    if (preference !== null) {
        // Preference exists, handle it accordingly
        if (preference === 'thumbsUp') {
            console.log('User is interested in watching the movie ' + movieId);
            // Perform actions for thumbs up
        } else if (preference === 'thumbsDown') {
            console.log('User is not interested in watching the movie ' + movieId);
            // Perform actions for thumbs down
        } else if (preference === 'closed') {
            console.log('User closed the modal for the movie ' + movieId);
            // Perform actions for modal closed
        }
    } else {
        // No preference recorded for the movie
        console.log('User has not voted for the movie ' + movieId);
    }
});


