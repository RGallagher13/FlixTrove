// This is the contact form popup
document.getElementById("contactButton").addEventListener("click", function() {
    document.getElementById("contactFormPopup").style.display = "block";
    console.log("Contact button clicked");
});

// Closes the form when clicking outside of it
window.onclick = function(event) {
    if (event.target == document.getElementById("contactFormPopup")) {
        document.getElementById("contactFormPopup").style.display = "none";
    }
}

// Closes the form when clicking on the X button
document.getElementsByClassName("close-button")[0].addEventListener("click", function() {
    document.getElementById("contactFormPopup").style.display = "none";
    console.log("Close button clicked");    
});

// Script submits the form
document.getElementById("submitButton").addEventListener("click", function(event) {
    event.preventDefault(); 
    console.log("Submit button clicked");

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (fullName === "" || email === "" || phoneNumber === "" || subject === "" || message === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Script constructs email body
    const emailBody = `Full Name: ${fullName}\nEmail Address: ${email}\nPhone Number: ${phoneNumber}\nSubject Line: ${subject}\nMessage: ${message}`;

    // Script to send email to specified address
    const mailtoURL = `mailto:unikalno_sme6no@abv.bg?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    console.log("Opening mail client"); 
    window.location.href = mailtoURL;
});