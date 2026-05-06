// Initialize EmailJS
emailjs.init("wBk3b5K3gTVKj8b03"); // Replace with your EmailJS public key

function initContactValidation(){
    const contactModal = document.getElementById("contact-modal");
    const contactForm = document.getElementById("contact-form");
    const contactName = document.getElementById("contact-name");
    const contactEmail = document.getElementById("contact-email");
    const contactMessage = document.getElementById("contact-message");
    const formMessage = document.getElementById("form-message");
    const submitBtn = contactForm.querySelector("button[type='submit']");
    const cancelBtn = document.getElementById("form-cancel");

    if(!contactModal || !contactForm || !contactName || !contactEmail || !contactMessage || !formMessage){
        console.log("Contact form elements not found");
        return;
    }

    // Helper function to show messages
    function showMessage(text, type = 'error') {
        formMessage.textContent = text;
        formMessage.className = `form-message ${type} show`;
    }

    // Helper function to clear messages
    function clearMessage() {
        formMessage.textContent = "";
        formMessage.className = "form-message";
    }

    // Cancel button handler
    cancelBtn.addEventListener("click", function() {
        document.getElementById("modal-close").click();
    });

    contactForm.addEventListener("submit", async function(event){
        event.preventDefault();

        const name = contactName.value.trim();
        const email = contactEmail.value.trim();
        const message = contactMessage.value.trim();

        clearMessage();

        // Name validation
        if(name === ""){
            showMessage("👤 Name is required", "error");
            contactName.focus();
            return;
        }
        if(name.length < 3){
            showMessage("👤 Name must be at least 3 characters", "error");
            contactName.focus();
            return;
        }

        // Email validation
        if(email === ""){
            showMessage("✉️ Email is required", "error");
            contactEmail.focus();
            return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailPattern.test(email)){
            showMessage("✉️ Enter a valid email address", "error");
            contactEmail.focus();
            return;
        }

        // Message validation
        if(message === ""){
            showMessage("💬 Message is required", "error");
            contactMessage.focus();
            return;
        }
        if(message.length < 10){
            showMessage("💬 Message must be at least 10 characters", "error");
            contactMessage.focus();
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = "⏳ Sending...";
        showMessage("⏳ Sending your message...", "info");

        try {
            // Send email using EmailJS
            const response = await emailjs.send("service_238nbbi", "template_iau669e", {
                from_name: name,
                from_email: email,
                message: message,
                reply_to: email
            });

            showMessage("✓ Message sent successfully! I'll get back to you soon.", "success");
            contactForm.reset();

            // Reset submit button
            submitBtn.disabled = false;
            submitBtn.textContent = "Send Message";

            // Close modal after 2.5 seconds
            setTimeout(() => {
                document.getElementById("modal-close").click();
                clearMessage();
            }, 2500);

        } catch(error) {
            console.error("Email sending failed:", error);
            showMessage("✗ Failed to send message. Please try again.", "error");

            // Reset submit button
            submitBtn.disabled = false;
            submitBtn.textContent = "Send Message";
        }
    });

    // Clear error messages on input
    [contactName, contactEmail, contactMessage].forEach(input => {
        input.addEventListener("input", function(){
            if(formMessage.classList.contains("error")) {
                clearMessage();
            }
        });
    });

    // Add focus effects
    [contactName, contactEmail, contactMessage].forEach(input => {
        input.addEventListener("focus", function(){
            this.style.borderColor = "#ef4444";
        });
        input.addEventListener("blur", function(){
            this.style.borderColor = "var(--border)";
        });
    });
}   