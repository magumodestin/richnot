  document.addEventListener("DOMContentLoaded", function() {
            const form = document.getElementById("forgotForm");
            const emailInput = document.getElementById("emailform");
            const emailError = document.getElementById("emailError");
            
            function isValidEmail(email) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            }
            
            function showError(message) {
                emailError.innerHTML = '<span style="background:#ef4444; color:white; border-radius:50%; width:20px; height:20px; display:inline-flex; align-items:center; justify-content:center; font-size:12px;">✕</span> ' + message;
                emailError.classList.add('show');
                emailInput.closest('.input-container').classList.add('error');
                form.classList.add('shake');
                setTimeout(() => form.classList.remove('shake'), 500);
            }
            
            function showSuccess() {
                emailError.innerHTML = '<span style="background:#10b981; color:white; border-radius:50%; width:20px; height:20px; display:inline-flex; align-items:center; justify-content:center; font-size:12px;">✓</span> Reset link sent!';
                emailError.classList.remove('show');
                emailError.className = 'success-message show';
                emailInput.closest('.input-container').classList.remove('error');
                emailInput.closest('.input-container').classList.add('success');
                
                const button = form.querySelector('.resetbtn');
                button.classList.add('success');
                button.textContent = '✓ Link Sent!';
                
                setTimeout(function() {
                    window.location.href = "reset-pass.html";
                }, 1500);
            }
            
            form.addEventListener("submit", function(e) {
                e.preventDefault();
                
                const email = emailInput.value.trim();
                
                if (!email) {
                    showError("Email is required");
                    return;
                }
                
                if (!isValidEmail(email)) {
                    showError("Please enter a valid email address");
                    return;
                }
                
                // Check if user exists
                const users = JSON.parse(localStorage.getItem("users") || "[]");
                const user = users.find(u => u.email === email);
                
                if (user) {
                    localStorage.setItem("resetEmail", email);
                    showSuccess();
                } else {
                    showError("No account found with this email address");
                }
            });
        });