// Login Form Handling
document.addEventListener('DOMContentLoaded', function() {
    initializeLogin();
    initializeForgotPassword();
    
    // Load saved username if remember me was checked
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    if (rememberMe) {
        const savedUsername = localStorage.getItem('savedUsername');
        if (savedUsername) {
            document.getElementById('username').value = savedUsername;
            document.getElementById('rememberMe').checked = true;
        }
    }
});

// Initialize Login Form
function initializeLogin() {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    // Toggle password visibility
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁️' : '🙈';
        });
    }

    // Form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }

    // Remove error message when user types
    const inputs = loginForm.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            hideError();
            this.parentElement.classList.remove('error');
        });
    });

    // Enter key to submit
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && document.activeElement.tagName !== 'TEXTAREA') {
            if (loginForm && !loginForm.querySelector(':focus')) {
                // Already handled by form submit
            }
        }
    });
}

// Handle Login
function handleLogin() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    const loginButton = document.querySelector('.btn-login');
    const errorMessage = document.getElementById('errorMessage');

    // Hide previous errors
    hideError();

    // Validation
    if (!username) {
        showError('Vui lòng nhập tên người dùng hoặc email');
        document.getElementById('username').focus();
        return;
    }

    if (!password) {
        showError('Vui lòng nhập mật khẩu');
        document.getElementById('password').focus();
        return;
    }

    // Show loading state
    loginButton.classList.add('loading');
    loginButton.disabled = true;

    // Simulate API call (replace with actual API call)
    setTimeout(() => {
        // Check credentials (in real app, this would be an API call)
        const isValid = validateLogin(username, password);

        if (isValid) {
            // Save remember me preference
            if (rememberMe) {
                localStorage.setItem('rememberMe', 'true');
                localStorage.setItem('savedUsername', username);
            } else {
                localStorage.removeItem('rememberMe');
                localStorage.removeItem('savedUsername');
            }

            // Save session
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('currentUser', username);
            sessionStorage.setItem('loginTime', new Date().toISOString());

            // Show success message
            showSuccess('Đăng nhập thành công! Đang chuyển hướng...');

            // Redirect to main page
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            // Show error
            loginButton.classList.remove('loading');
            loginButton.disabled = false;
            showError('Tên người dùng hoặc mật khẩu không đúng');
            document.getElementById('password').value = '';
            document.getElementById('password').focus();
        }
    }, 1000); // Simulate network delay
}

// Validate Login (Mock function - replace with actual API call)
function validateLogin(username, password) {
    // Mock users for demo purposes
    // In production, this should be an API call to your backend
    const mockUsers = [
        { username: 'admin', password: 'admin123', email: 'admin@example.com' },
        { username: 'warehouse', password: 'warehouse123', email: 'warehouse@example.com' },
        { username: 'user', password: 'user123', email: 'user@example.com' }
    ];

    // Check if username/email and password match
    return mockUsers.some(user => 
        (user.username === username || user.email === username) && 
        user.password === password
    );
}

// Show Error Message
function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            hideError();
        }, 5000);
    }
}

// Hide Error Message
function hideError() {
    const errorMessage = document.getElementById('errorMessage');
    if (errorMessage) {
        errorMessage.classList.remove('show');
        errorMessage.textContent = '';
    }
}

// Show Success Message
function showSuccess(message) {
    const errorMessage = document.getElementById('errorMessage');
    if (errorMessage) {
        errorMessage.style.background = '#d1fae5';
        errorMessage.style.color = '#065f46';
        errorMessage.style.borderColor = '#a7f3d0';
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
    }
}

// Forgot Password Modal
function showForgotPassword() {
    const modal = document.getElementById('forgotPasswordModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Pre-fill with username if available
        const username = document.getElementById('username').value;
        if (username) {
            document.getElementById('resetUsername').value = username;
        }
    }
}

function closeForgotPasswordModal() {
    const modal = document.getElementById('forgotPasswordModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        document.getElementById('forgotPasswordForm').reset();
    }
}

// Initialize Forgot Password Form
function initializeForgotPassword() {
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleForgotPassword();
        });
    }

    // Close modal when clicking outside
    const modal = document.getElementById('forgotPasswordModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeForgotPasswordModal();
            }
        });
    }
}

// Handle Forgot Password
function handleForgotPassword() {
    const resetUsername = document.getElementById('resetUsername').value.trim();
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const submitButton = forgotPasswordForm.querySelector('button[type="submit"]');

    if (!resetUsername) {
        alert('Vui lòng nhập tên người dùng hoặc email');
        return;
    }

    // Disable button
    submitButton.disabled = true;
    submitButton.textContent = 'Đang gửi...';

    // Simulate API call
    setTimeout(() => {
        // In production, this would be an actual API call
        alert(`Yêu cầu khôi phục mật khẩu đã được gửi đến email của bạn.\n\n(Đây là chức năng demo. Trong ứng dụng thực tế, hệ thống sẽ gửi email khôi phục mật khẩu.)`);
        
        closeForgotPasswordModal();
        submitButton.disabled = false;
        submitButton.textContent = 'Gửi yêu cầu';
    }, 1500);
}

// Check if user is already logged in (optional - redirect if logged in)
function checkAuthStatus() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn && window.location.pathname.includes('login.html')) {
        // User is already logged in, redirect to main page
        window.location.href = 'index.html';
    }
}

// Run check on page load
checkAuthStatus();

