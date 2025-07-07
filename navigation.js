// Navigation between Quiz and Flashcards
class NavigationManager {
    constructor() {
        this.currentTab = 'quiz';
        this.setupEventListeners();
    }

    setupEventListeners() {
        const navTabs = document.querySelectorAll('.nav-tab');
        
        navTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const targetTab = e.target.getAttribute('data-tab');
                this.switchTab(targetTab);
            });
        });
    }

    switchTab(tabName) {
        // Update current tab
        this.currentTab = tabName;
        
        // Update nav tab appearance
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        
        // Show/hide sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`${tabName}-section`).classList.add('active');
        
        // Add transition effect
        const activeSection = document.getElementById(`${tabName}-section`);
        activeSection.style.opacity = '0';
        activeSection.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            activeSection.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            activeSection.style.opacity = '1';
            activeSection.style.transform = 'translateY(0)';
        }, 50);
        
        // Reset transition after animation
        setTimeout(() => {
            activeSection.style.transition = '';
        }, 350);
    }

    getCurrentTab() {
        return this.currentTab;
    }
}

// Initialize navigation manager
let navigationManager;

document.addEventListener('DOMContentLoaded', () => {
    navigationManager = new NavigationManager();
    
    // Add some keyboard shortcuts for navigation
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + 1 for Quiz, Ctrl/Cmd + 2 for Flashcards
        if ((e.ctrlKey || e.metaKey) && e.key === '1') {
            e.preventDefault();
            navigationManager.switchTab('quiz');
        } else if ((e.ctrlKey || e.metaKey) && e.key === '2') {
            e.preventDefault();
            navigationManager.switchTab('flashcards');
        }
    });
});
