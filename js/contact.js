// Contact page functionality

class ContactPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupContactForm();
        this.setupMapInteraction();
        this.setupFormValidation();
    }

    setupContactForm() {
        const form = document.getElementById('quotationForm');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (this.validateForm()) {
                this.submitForm();
            }
        });
    }

    validateForm() {
        const requiredFields = ['name', 'email', 'message'];
        let isValid = true;
        
        requiredFields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            const value = field.value.trim();
            
            // Remove existing error styling
            field.classList.remove('error');
            
            if (!value) {
                field.classList.add('error');
                isValid = false;
            }
        });
        
        // Email validation
        const emailField = document.getElementById('email');
        const emailValue = emailField.value.trim();
        if (emailValue && !this.isValidEmail(emailValue)) {
            emailField.classList.add('error');
            isValid = false;
        }
        
        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    submitForm() {
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            this.showSuccessMessage();
            
            // Reset form
            document.getElementById('quotationForm').reset();
        }, 2000);
    }

    showSuccessMessage() {
        // Create success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <h3>Request Sent Successfully!</h3>
                <p>Thank you for your inquiry. We'll get back to you within 24 hours with a detailed quotation.</p>
            </div>
        `;
        
        // Add styles
        successDiv.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
        `;
        
        const successContent = successDiv.querySelector('.success-content');
        successContent.style.cssText = `
            background: white;
            padding: 3rem 2rem;
            border-radius: 8px;
            text-align: center;
            max-width: 400px;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(successDiv);
        
        // Remove message after 3 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
        
        // Close on click
        successDiv.addEventListener('click', () => {
            successDiv.remove();
        });
    }

    setupMapInteraction() {
        const mapBtn = document.querySelector('.map-btn');
        
        mapBtn.addEventListener('click', () => {
            // Open Google Maps with the location
            const address = "64WR+5X, Bye Pass Side Road, near Sugan Feed Mills, behind Builder Mahal Back Side, Nallipalayam, Tamil Nadu 637003";
            const encodedAddress = encodeURIComponent(address);
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
            
            window.open(mapsUrl, '_blank');
        });
    }

    setupFormValidation() {
        // Real-time validation
        const inputs = document.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                // Remove error styling on input
                input.classList.remove('error');
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        
        // Check required fields
        if (field.hasAttribute('required') && !value) {
            field.classList.add('error');
            return false;
        }
        
        // Email validation
        if (field.type === 'email' && value && !this.isValidEmail(value)) {
            field.classList.add('error');
            return false;
        }
        
        field.classList.remove('error');
        return true;
    }
}

// Add error styling
const errorStyles = `
    .form-group input.error,
    .form-group textarea.error,
    .form-group select.error {
        border-color: #ff4444;
        box-shadow: 0 0 5px rgba(255, 68, 68, 0.3);
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = errorStyles;
document.head.appendChild(styleSheet);

// Initialize contact page functionality
document.addEventListener('DOMContentLoaded', () => {
    new ContactPage();
});