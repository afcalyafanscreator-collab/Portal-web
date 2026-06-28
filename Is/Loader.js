// Loader Management
class LoaderManager {
    constructor() {
        this.progressFill = document.getElementById('progressFill');
        this.percentageDisplay = document.getElementById('loadingPercentage');
        this.statusDisplay = document.getElementById('loadingStatus');
        this.loadingScreen = document.getElementById('loading-screen');
        this.mainContent = document.getElementById('main-content');
        
        this.progress = 0;
        this.isComplete = false;
        this.statusMessages = [
            'Mempersiapkan...',
            'Memuat data...',
            'Menginisialisasi...',
            'Memproses...',
            'Hampir selesai...',
            'Selesai!'
        ];
    }

    // Update progress bar
    updateProgress(value) {
        this.progress = Math.min(value, 100);
        this.progressFill.style.width = this.progress + '%';
        this.percentageDisplay.textContent = Math.round(this.progress) + '%';
        
        // Update status message based on progress
        const statusIndex = Math.floor((this.progress / 100) * (this.statusMessages.length - 1));
        this.statusDisplay.textContent = this.statusMessages[statusIndex] || this.statusMessages[0];
    }

    // Simulate loading process
    async startLoading() {
        const steps = [
            { progress: 10, delay: 300 },
            { progress: 25, delay: 400 },
            { progress: 40, delay: 500 },
            { progress: 55, delay: 300 },
            { progress: 70, delay: 400 },
            { progress: 85, delay: 500 },
            { progress: 95, delay: 300 },
            { progress: 100, delay: 200 }
        ];

        for (const step of steps) {
            if (this.isComplete) break;
            this.updateProgress(step.progress);
            await this.sleep(step.delay);
        }

        this.completeLoading();
    }

    // Complete loading and show main content
    completeLoading() {
        if (this.isComplete) return;
        this.isComplete = true;
        this.updateProgress(100);
        this.statusDisplay.textContent = 'Selesai!';
        
        setTimeout(() => {
            this.loadingScreen.classList.add('hide');
            this.mainContent.style.display = 'block';
            
            // Trigger animation for main content
            setTimeout(() => {
                this.mainContent.style.opacity = '1';
            }, 100);
        }, 500);
    }

    // Utility method for sleep/delay
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Handle errors
    handleError(error) {
        console.error('Loading error:', error);
        this.statusDisplay.textContent = 'Terjadi kesalahan. Silakan refresh.';
        this.statusDisplay.style.color = '#ff6b6b';
    }
}

// Initialize loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const loader = new LoaderManager();
    
    // Start loading
    loader.startLoading().catch(error => {
        loader.handleError(error);
    });
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LoaderManager;
          }
