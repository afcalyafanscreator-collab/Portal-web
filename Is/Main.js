// Main Application
class PortalApp {
    constructor() {
        this.config = null;
        this.init();
    }

    // Initialize application
    async init() {
        try {
            // Load configuration
            await this.loadConfig();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Load dynamic content
            this.loadContent();
            
            console.log('Portal Web by LUTFY initialized successfully!');
        } catch (error) {
            console.error('Failed to initialize app:', error);
        }
    }

    // Load configuration from JSON
    async loadConfig() {
        try {
            const response = await fetch('data/config.json');
            if (!response.ok) {
                throw new Error('Failed to load configuration');
            }
            this.config = await response.json();
            console.log('Configuration loaded:', this.config);
        } catch (error) {
            console.warn('Using default configuration');
            this.config = this.getDefaultConfig();
        }
    }

    // Default configuration if JSON fails to load
    getDefaultConfig() {
        return {
            appName: 'Portal Web by LUTFY',
            version: '1.0.0',
            features: ['Responsive Design', 'Loading Screen', 'Dynamic Content'],
            contact: {
                email: 'info@portalweb.com',
                phone: '(021) 1234-5678'
            }
        };
    }

    // Setup event listeners
    setupEventListeners() {
        // Navigation smooth scrolling
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add hover effect to cards
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                card.style.transform = 'scale(1.02)';
            });
            card.addEventListener('mouseleave', (e) => {
                card.style.transform = 'scale(1)';
            });
        });
    }

    // Load dynamic content
    loadContent() {
        // Display app version in footer
        const footer = document.querySelector('footer p');
        if (footer && this.config) {
            const versionText = ` v${this.config.version || '1.0.0'}`;
            footer.textContent = footer.textContent + versionText;
        }

        // Update contact information
        if (this.config && this.config.contact) {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const emailP = contactSection.querySelector('p:first-of-type');
                const phoneP = contactSection.querySelector('p:last-of-type');
                if (emailP) emailP.textContent = `Email: ${this.config.contact.email}`;
                if (phoneP) phoneP.textContent = `Telepon: ${this.config.contact.phone}`;
            }
        }
    }

    // Utility: Display notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background: ${type === 'success' ? '#2ecc71' : '#3498db'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 1000;
            animation: slideIn 0.5s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }
}

// Initialize app when main content is shown
document.addEventListener('DOMContentLoaded', () => {
    // Wait for loader to complete
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && 
                mutation.attributeName === 'class' &&
                document.getElementById('loading-screen').classList.contains('hide')) {
                // Initialize app after loading completes
                const app = new PortalApp();
                observer.disconnect();
            }
        });
    });

    observer.observe(document.getElementById('loading-screen'), {
        attributes: true
    });
});
