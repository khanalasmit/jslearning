// Validation functions
function validateName() {
    const name = document.getElementById("name").value.trim();
    const nameError = document.getElementById("nameError");
    const nameInput = document.getElementById("name");
    
    if (name === "") {
        nameError.textContent = "Name is required";
        nameInput.classList.add("invalid");
        nameInput.classList.remove("valid");
        return false;
    } else if (name.length < 3) {
        nameError.textContent = "Name must be at least 3 characters long";
        nameInput.classList.add("invalid");
        nameInput.classList.remove("valid");
        return false;
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
        nameError.textContent = "Name can only contain letters and spaces";
        nameInput.classList.add("invalid");
        nameInput.classList.remove("valid");
        return false;
    } else {
        nameError.textContent = "";
        nameInput.classList.remove("invalid");
        nameInput.classList.add("valid");
        return true;
    }
}

function validateEmail() {
    const email = document.getElementById("email").value.trim();
    const emailError = document.getElementById("emailError");
    const emailInput = document.getElementById("email");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email === "") {
        emailError.textContent = "Email is required";
        emailInput.classList.add("invalid");
        emailInput.classList.remove("valid");
        return false;
    } else if (!emailPattern.test(email)) {
        emailError.textContent = "Please enter a valid email address";
        emailInput.classList.add("invalid");
        emailInput.classList.remove("valid");
        return false;
    } else {
        emailError.textContent = "";
        emailInput.classList.remove("invalid");
        emailInput.classList.add("valid");
        return true;
    }
}

function validatePassword() {
    const password = document.getElementById("password").value;
    const passwordError = document.getElementById("passwordError");
    const passwordInput = document.getElementById("password");
    
    // Check individual requirements
    const lengthCheck = password.length >= 8;
    const uppercaseCheck = /[A-Z]/.test(password);
    const lowercaseCheck = /[a-z]/.test(password);
    const numberCheck = /[0-9]/.test(password);
    
    // Update requirement indicators
    document.getElementById("length").className = lengthCheck ? "valid" : "";
    document.getElementById("uppercase").className = uppercaseCheck ? "valid" : "";
    document.getElementById("lowercase").className = lowercaseCheck ? "valid" : "";
    document.getElementById("number").className = numberCheck ? "valid" : "";
    
    if (password === "") {
        passwordError.textContent = "Password is required";
        passwordInput.classList.add("invalid");
        passwordInput.classList.remove("valid");
        return false;
    } else if (!lengthCheck || !uppercaseCheck || !lowercaseCheck || !numberCheck) {
        passwordError.textContent = "Password does not meet all requirements";
        passwordInput.classList.add("invalid");
        passwordInput.classList.remove("valid");
        return false;
    } else {
        passwordError.textContent = "";
        passwordInput.classList.remove("invalid");
        passwordInput.classList.add("valid");
        
        // Validate confirm password if it has content
        if (document.getElementById("confirmPassword").value !== "") {
            validateConfirmPassword();
        }
        return true;
    }
}

function validateConfirmPassword() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    
    if (confirmPassword === "") {
        confirmPasswordError.textContent = "Please confirm your password";
        confirmPasswordInput.classList.add("invalid");
        confirmPasswordInput.classList.remove("valid");
        return false;
    } else if (password !== confirmPassword) {
        confirmPasswordError.textContent = "Passwords do not match";
        confirmPasswordInput.classList.add("invalid");
        confirmPasswordInput.classList.remove("valid");
        return false;
    } else {
        confirmPasswordError.textContent = "";
        confirmPasswordInput.classList.remove("invalid");
        confirmPasswordInput.classList.add("valid");
        return true;
    }
}

function handleSubmit(event) {
    event.preventDefault();
    
    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    
    // Check if all validations pass
    if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
        // Hide form and show success message
        document.getElementById("registrationForm").style.display = "none";
        document.getElementById("successMessage").style.display = "block";
        
        // Log the form data (in a real app, you'd send this to a server)
        console.log({
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        });
    } else {
        // Show an alert if validation fails
        alert("Please fix all errors before submitting the form");
    }
}
