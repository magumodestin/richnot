document.addEventListener("DOMContentLoaded", function () {
    const loginView = document.getElementById("loginView");
    const registerView = document.getElementById("registerView");
    const showRegister = document.getElementById("showRegister");
    const showLogin = document.getElementById("showLogin");

    // Check if user is already logged in
    if (localStorage.getItem("currentUser")) {
        const existingUser = JSON.parse(localStorage.getItem("currentUser"));
        if (existingUser.role === "lecturer") {
            window.location.href = "lecturer-dashboard.html";
        } else {
            window.location.href = "student-dashboard.html";
        }
        return;
    }

    function switchView(show, hide) {
        hide.classList.add("flip-out");
        setTimeout(function () {
            hide.classList.remove("active");
            hide.classList.remove("flip-out");
            show.classList.add("active");
            clearFeedback();
        }, 250);
    }

    showRegister.addEventListener("click", function (event) {
        event.preventDefault();
        switchView(registerView, loginView);
    });

    showLogin.addEventListener("click", function (event) {
        event.preventDefault();
        switchView(loginView, registerView);
    });

    const roleButtons = document.querySelectorAll(".role-button");
    const accountRole = document.getElementById("accountRole");

    roleButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            roleButtons.forEach(function (item) {
                item.classList.remove("active");
            });
            button.classList.add("active");
            const selectedRole = button.dataset.role;
            accountRole.value = selectedRole;
        });
    });

    // Password toggle functionality
    const loginPassword = document.getElementById("loginPassword");
    const loginPasswordToggle = document.getElementById("loginPasswordToggle");
    const registerPassword = document.getElementById("registerPassword");
    const registerPasswordToggle = document.getElementById("registerPasswordToggle");

    loginPasswordToggle.addEventListener("click", function () {
        if (loginPassword.type === "password") {
            loginPassword.type = "text";
        } else {
            loginPassword.type = "password";
        }
    });

    registerPasswordToggle.addEventListener("click", function () {
        if (registerPassword.type === "password") {
            registerPassword.type = "text";
        } else {
            registerPassword.type = "password";
        }
    });

    // Clear all feedback
    function clearFeedback() {
        document.querySelectorAll('.error-message').forEach(el => el.classList.remove('show'));
        document.querySelectorAll('.success-message').forEach(el => el.classList.remove('show'));
        document.querySelectorAll('.input-container').forEach(el => {
            el.classList.remove('error', 'success');
        });
        document.querySelectorAll('.form-group').forEach(el => {
            el.classList.remove('shake', 'fade-in-up');
        });
    }

    // Show error state for input
    function showError(input, message) {
        const container = input.closest('.input-container');
        container.classList.add('error');
        container.classList.remove('success');
        
        // Create or update error message
        let errorMsg = container.parentElement.querySelector('.error-message');
        if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            errorMsg.innerHTML = `
                <span class="error-x">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                        <path d="M18 6L6 18M6 6L18 18"/>
                    </svg>
                </span>
                <span class="error-text"></span>
            `;
            container.parentElement.appendChild(errorMsg);
        }
        errorMsg.querySelector('.error-text').textContent = message;
        errorMsg.classList.add('show');
        
        // Add shake animation
        const formGroup = input.closest('.form-group');
        formGroup.classList.remove('shake');
        void formGroup.offsetWidth;
        formGroup.classList.add('shake');
    }

    // Show success state for input
    function showSuccess(input) {
        const container = input.closest('.input-container');
        container.classList.remove('error');
        container.classList.add('success');
        
        // Create or update success message
        let successMsg = container.parentElement.querySelector('.success-message');
        if (!successMsg) {
            successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.innerHTML = `
                <span class="success-check">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3">
                        <path d="M20 6L9 17L4 12"/>
                    </svg>
                </span>
            `;
            container.parentElement.appendChild(successMsg);
        }
        successMsg.classList.add('show');
    }

    // Clear error state
    function clearError(input) {
        const container = input.closest('.input-container');
        container.classList.remove('error', 'success');
        
        const errorMsg = container.parentElement.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.classList.remove('show');
        }
        
        const successMsg = container.parentElement.querySelector('.success-message');
        if (successMsg) {
            successMsg.classList.remove('show');
        }
    }

    // Email validation
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Show toast notification
    function showToast(message, type) {
        // Remove existing toast
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }

    // ====== ADD CONFIRM PASSWORD FIELD ======
    const registerForm = document.getElementById("registerForm");
    const registerPasswordInput = document.getElementById("registerPassword");
    const passwordGroup = registerPasswordInput.closest('.form-group');
    
    // Create confirm password group
    const confirmPasswordGroup = document.createElement('div');
    confirmPasswordGroup.className = 'form-group';
    confirmPasswordGroup.innerHTML = `
        <label class="form-label" for="confirmPassword">Confirm Password</label>
        <div class="input-container">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C8593" stroke-width="1.7">
                <rect x="5" y="10" width="14" height="10" rx="2"/>
                <path d="M8 10V7.5C8 5.5 9.6 4 12 4C14.4 4 16 5.5 16 7.5V10"/>
            </svg>
            <input type="password" id="confirmPassword" placeholder="Confirm your password" required>
            <button type="button" class="password-toggle" id="confirmPasswordToggle">
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                    <path d="M2 12S5.5 5.5 12 5.5S22 12 22 12S18.5 18.5 12 18.5S2 12 2 12Z"/>
                    <circle cx="12" cy="12" r="2.5"/>
                </svg>
            </button>
        </div>
    `;
    
    // Insert confirm password after the password group
    passwordGroup.after(confirmPasswordGroup);
    
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const confirmPasswordToggle = document.getElementById("confirmPasswordToggle");

    confirmPasswordToggle.addEventListener("click", function () {
        if (confirmPasswordInput.type === "password") {
            confirmPasswordInput.type = "text";
        } else {
            confirmPasswordInput.type = "password";
        }
    });

    // Password strength indicator
    const passwordStrength = document.querySelector('.password-strength');
    const passwordStrengthBar = document.querySelector('.password-strength-bar');

    registerPasswordInput.addEventListener("input", function() {
        clearError(registerPasswordInput);
        const value = registerPasswordInput.value;
        
        if (value.length === 0) {
            passwordStrength.classList.remove('visible');
            return;
        }
        
        passwordStrength.classList.add('visible');
        
        let strength = 0;
        if (value.length >= 6) strength++;
        if (value.length >= 10) strength++;
        if (/[A-Z]/.test(value)) strength++;
        if (/[0-9]/.test(value)) strength++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(value)) strength++;
        
        const percentage = Math.min((strength / 5) * 100, 100);
        passwordStrengthBar.style.width = percentage + '%';
        
        if (percentage < 40) {
            passwordStrengthBar.style.background = '#ef4444';
        } else if (percentage < 70) {
            passwordStrengthBar.style.background = '#f59e0b';
        } else {
            passwordStrengthBar.style.background = '#10b981';
        }
        
        if (value.length >= 6) {
            showSuccess(registerPasswordInput);
        }
    });

    // Real-time validation for confirm password
    confirmPasswordInput.addEventListener("input", function() {
        clearError(confirmPasswordInput);
        
        if (confirmPasswordInput.value.length > 0) {
            if (confirmPasswordInput.value === registerPasswordInput.value) {
                showSuccess(confirmPasswordInput);
            } else {
                confirmPasswordInput.closest('.input-container').classList.add('error');
            }
        }
    });

    // ====== REGISTRATION LOGIC ======
    const registerName = document.getElementById("registerName");
    const registerEmail = document.getElementById("registerEmail");

    // Real-time validation for registration
    registerName.addEventListener("input", function() {
        clearError(registerName);
        if (registerName.value.trim().length > 0) {
            showSuccess(registerName);
        }
    });

    registerEmail.addEventListener("input", function() {
        clearError(registerEmail);
        if (isValidEmail(registerEmail.value)) {
            showSuccess(registerEmail);
        }
    });

    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();
        clearFeedback();
        
        const name = registerName.value.trim();
        const email = registerEmail.value.trim();
        const password = registerPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const role = document.getElementById("accountRole").value;

        let isValid = true;

        // Validate name
        if (!name) {
            showError(registerName, "Name is required");
            isValid = false;
        }

        // Validate email
        if (!email) {
            showError(registerEmail, "Email is required");
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError(registerEmail, "Please enter a valid email");
            isValid = false;
        }

        // Validate password
        if (!password) {
            showError(registerPasswordInput, "Password is required");
            isValid = false;
        } else if (password.length < 6) {
            showError(registerPasswordInput, "Password must be at least 6 characters");
            isValid = false;
        }

        // Validate confirm password
        if (!confirmPassword) {
            showError(confirmPasswordInput, "Please confirm your password");
            isValid = false;
        } else if (password !== confirmPassword) {
            showError(confirmPasswordInput, "Passwords do not match!");
            isValid = false;
        } else {
            // Passwords match - show success
            showSuccess(confirmPasswordInput);
        }

        if (!isValid) return;

        // Check if user already exists
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const userExists = users.some(user => user.email === email);

        if (userExists) {
            showError(registerEmail, "An account with this email already exists");
            return;
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            password: password,
            role: role,
            memberSince: new Date().toLocaleDateString("en-US", { 
                month: "long", 
                day: "numeric", 
                year: "numeric" 
            })
        };

        // Save user
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        // Log the new user in immediately
        localStorage.setItem("currentUser", JSON.stringify(newUser));

        // Show success state
        const button = registerForm.querySelector(".sign-in-button");
        button.classList.add("success");
        button.textContent = "✓ Account Created!";

        // Show toast notification
        showToast("Registration successful! Redirecting...", "success");

        // Redirect straight to the correct dashboard
        setTimeout(function () {
            if (newUser.role === "lecturer") {
                window.location.href = "lecturer-dashboard.html";
            } else {
                window.location.href = "student-dashboard.html";
            }
        }, 1500);
    });

    // ====== LOGIN LOGIC ======
    const loginForm = document.getElementById("loginForm");
    const loginEmail = document.getElementById("loginEmail");
    const loginPasswordInput = document.getElementById("loginPassword");

    // Real-time validation for login
    loginEmail.addEventListener("input", function() {
        clearError(loginEmail);
        if (isValidEmail(loginEmail.value)) {
            showSuccess(loginEmail);
        }
    });

    loginPasswordInput.addEventListener("input", function() {
        clearError(loginPasswordInput);
        if (loginPasswordInput.value.length > 0) {
            showSuccess(loginPasswordInput);
        }
    });

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        clearFeedback();
        
        const email = loginEmail.value.trim();
        const password = loginPasswordInput.value;

        let isValid = true;

        // Validate email
        if (!email) {
            showError(loginEmail, "Email is required");
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError(loginEmail, "Please enter a valid email");
            isValid = false;
        }

        // Validate password
        if (!password) {
            showError(loginPasswordInput, "Password is required");
            isValid = false;
        }

        if (!isValid) return;

        // Find user in localStorage
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            // Show error with shake animation
            showError(loginEmail, "Invalid email or password");
            showError(loginPasswordInput, "Invalid email or password");
            return;
        }

        // Show success state
        showSuccess(loginEmail);
        showSuccess(loginPasswordInput);

        // Store current user session
        localStorage.setItem("currentUser", JSON.stringify(user));

        // Show loading state
        const button = loginForm.querySelector(".sign-in-button");
        button.classList.add("loading");
        button.disabled = true;

        // Show success toast
        showToast("Login successful! Redirecting...", "success");

        // Redirect to dashboard based on role after short delay
        setTimeout(function () {
            button.classList.remove("loading");
            button.disabled = false;
            
            if (user.role === "lecturer") {
                window.location.href = "lecturer-dashboard.html";
            } else {
                window.location.href = "student-dashboard.html";
            }
        }, 1500);
    });

});