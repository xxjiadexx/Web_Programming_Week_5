// Flashcards Application for Rust Concepts
class FlashcardApp {
    constructor() {
        this.cards = this.createFlashcards();
        this.originalCards = [...this.cards];
        this.currentCardIndex = 0;
        this.isFlipped = false;
        this.showingImportantOnly = false;
        
        this.initializeElements();
        this.setupEventListeners();
        this.displayCard();
    }

    createFlashcards() {
        return quizQuestions.map(q => ({
            question: q.question,
            answer: q.options[q.correct],
            explanation: q.explanation,
            importance: q.importance
        }));
    }

    initializeElements() {
        this.cardNumber = document.getElementById('card-number');
        this.totalCards = document.getElementById('total-cards');
        this.flashcard = document.getElementById('flashcard');
        this.flashcardQuestion = document.getElementById('flashcard-question');
        this.flashcardAnswer = document.getElementById('flashcard-answer');
        this.prevCardBtn = document.getElementById('prev-card');
        this.nextCardBtn = document.getElementById('next-card');
        this.flipCardBtn = document.getElementById('flip-card');
        this.shuffleCardsBtn = document.getElementById('shuffle-cards');
        this.importantOnlyBtn = document.getElementById('important-only');
        this.resetCardsBtn = document.getElementById('reset-cards');
        this.cardImportanceBadge = document.getElementById('card-importance-badge');
        
        this.updateCardCounter();
    }

    setupEventListeners() {
        this.prevCardBtn.addEventListener('click', () => this.previousCard());
        this.nextCardBtn.addEventListener('click', () => this.nextCard());
        this.flipCardBtn.addEventListener('click', () => this.flipCard());
        this.shuffleCardsBtn.addEventListener('click', () => this.shuffleCards());
        this.importantOnlyBtn.addEventListener('click', () => this.toggleImportantOnly());
        this.resetCardsBtn.addEventListener('click', () => this.resetCards());
        
        // Click to flip
        this.flashcard.addEventListener('click', () => this.flipCard());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            const flashcardsSection = document.getElementById('flashcards-section');
            if (!flashcardsSection.classList.contains('active')) return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousCard();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.nextCard();
                    break;
                case ' ':
                case 'Enter':
                    e.preventDefault();
                    this.flipCard();
                    break;
            }
        });
    }

    displayCard() {
        if (this.cards.length === 0) {
            this.flashcardQuestion.textContent = "No cards available";
            this.flashcardAnswer.textContent = "No cards available";
            return;
        }
        
        const card = this.cards[this.currentCardIndex];
        
        // Update content
        this.flashcardQuestion.textContent = card.question;
        this.flashcardAnswer.innerHTML = `
            <strong>Answer:</strong> ${card.answer}<br><br>
            <strong>Explanation:</strong> ${card.explanation}
        `;
        
        // Show/hide importance badge
        if (card.importance === 'high') {
            this.cardImportanceBadge.style.display = 'block';
        } else {
            this.cardImportanceBadge.style.display = 'none';
        }
        
        // Reset flip state
        this.isFlipped = false;
        this.flashcard.classList.remove('flipped');
        
        // Update counter
        this.updateCardCounter();
        
        // Update navigation buttons
        this.updateNavigationButtons();
    }

    updateCardCounter() {
        this.cardNumber.textContent = this.currentCardIndex + 1;
        this.totalCards.textContent = this.cards.length;
    }

    updateNavigationButtons() {
        this.prevCardBtn.disabled = this.currentCardIndex === 0;
        this.nextCardBtn.disabled = this.currentCardIndex === this.cards.length - 1;
    }

    flipCard() {
        this.isFlipped = !this.isFlipped;
        if (this.isFlipped) {
            this.flashcard.classList.add('flipped');
        } else {
            this.flashcard.classList.remove('flipped');
        }
    }

    previousCard() {
        if (this.currentCardIndex > 0) {
            this.currentCardIndex--;
            this.displayCard();
        }
    }

    nextCard() {
        if (this.currentCardIndex < this.cards.length - 1) {
            this.currentCardIndex++;
            this.displayCard();
        }
    }

    shuffleCards() {
        // Fisher-Yates shuffle
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
        
        this.currentCardIndex = 0;
        this.displayCard();
        
        // Visual feedback
        this.shuffleCardsBtn.textContent = '✨ Shuffled!';
        setTimeout(() => {
            this.shuffleCardsBtn.textContent = '🔀 Shuffle Cards';
        }, 1500);
    }

    toggleImportantOnly() {
        this.showingImportantOnly = !this.showingImportantOnly;
        
        if (this.showingImportantOnly) {
            this.cards = this.originalCards.filter(card => card.importance === 'high');
            this.importantOnlyBtn.textContent = '📚 Show All';
            this.importantOnlyBtn.style.background = '#ffa500';
            this.importantOnlyBtn.style.color = 'white';
        } else {
            this.cards = [...this.originalCards];
            this.importantOnlyBtn.textContent = '⭐ Important Only';
            this.importantOnlyBtn.style.background = '';
            this.importantOnlyBtn.style.color = '';
        }
        
        this.currentCardIndex = 0;
        this.displayCard();
    }

    resetCards() {
        this.cards = [...this.originalCards];
        this.currentCardIndex = 0;
        this.showingImportantOnly = false;
        this.importantOnlyBtn.textContent = '⭐ Important Only';
        this.importantOnlyBtn.style.background = '';
        this.importantOnlyBtn.style.color = '';
        this.displayCard();
        
        // Visual feedback
        this.resetCardsBtn.textContent = '✅ Reset!';
        setTimeout(() => {
            this.resetCardsBtn.textContent = '🔄 Reset';
        }, 1500);
    }
}

// Global flashcard app instance
let flashcardApp;

// Initialize flashcards when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure quiz questions are loaded
    setTimeout(() => {
        flashcardApp = new FlashcardApp();
    }, 100);
});
