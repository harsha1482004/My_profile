function initContactValidation(){
    const contactModal = document.getElementById("contact-modal");
    const contactForm = document.getElementById("contact-form");
    const contactName = document.getElementById("contact-name");
    const contactEmail = document.getElementById("contact-email");
    const formMessage = document.getElementById("form-message");

    if(!contactModal || !contactForm || !contactName || !contactEmail || !formMessage){
        console.log("Contact form elements not found");
        return;
    }
    contactForm.addEventListener("submit",function(event){
        event.preventDefault();

        const name = contactName.value.trim();
        const email = contactEmail.value.trim();

        formMessage.textContent = "";
        formMessage.className = "text-sm";

        //Name validation
        if(name === ""){
            formMessage.textContent = "Name is required";
            formMessage.classList.add("text-red-500");
            contactName.focus();
            return;
        }
        if(name.length < 5){
            formMessage.textContent = "Name must be at least 5 chars";
            formMessage.classList.add("text-red-500");
            contactName.focus();
            return;

        }
        //Email validation
        if(email === ""){
            formMessage.textContent = "Email is required";
            formMessage.classList.add("text-red-500");
            contactEmail.focus();
            return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailPattern.test(email)){
            formMessage.textContent = "Enter valid email";
            formMessage.classList.add("text-red-500");
            contactEmail.focus();
            return;
        }
        formMessage.textContent = "Message submitted successfully";
        formMessage.classList.add("text-green-600");
        console.log("Valid credentials:",{name:name,email:email});
        contactForm.reset();

    });
    contactName.addEventListener("input",function(){
        formMessage.textContent = "";
    });
    contactEmail.addEventListener("input",function(){
        formMessage.textContent = "";
    });

}   