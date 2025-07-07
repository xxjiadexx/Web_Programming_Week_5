// Quiz Questions Database - Rust Option, Result, and Template Engine concepts
const quizQuestions = [
    {
        question: "What are the two variants of the Result enum in Rust?",
        options: [
            "Success(T) and Failure(E)",
            "Ok(T) and Err(E)",
            "Some(T) and None(E)",
            "Value(T) and Error(E)"
        ],
        correct: 1,
        explanation: "Result is defined with two variants: Ok(T) for successful outcomes encapsulating a value of type T, and Err(E) for errors encapsulating an error value of type E.",
        importance: "high"
    },
    {
        question: "What are the two variants of the Option enum in Rust?",
        options: [
            "Ok(T) and Err(E)",
            "True(T) and False",
            "Some(T) and None",
            "Value(T) and Empty"
        ],
        correct: 2,
        explanation: "Option has two variants: Some(value) indicating the presence of a value, and None indicating the absence of a value. This is used to handle nullable values safely.",
        importance: "high"
    },
    {
        question: "What happens when you call unwrap() on a None value?",
        options: [
            "Returns a default value",
            "Returns an empty string",
            "The program panics",
            "Returns false"
        ],
        correct: 2,
        explanation: "Calling unwrap() on a None value will cause the program to panic. This is why unwrap() should be used carefully and only when you're certain the value exists.",
        importance: "high"
    },
    {
        question: "What happens when you call unwrap() on an Err(error) Result?",
        options: [
            "Returns the error message",
            "The program panics",
            "Returns a default value",
            "Logs the error and continues"
        ],
        correct: 1,
        explanation: "Calling unwrap() on an Err(error) Result will cause the program to panic. For error handling without panicking, use methods like match, if let, or expect().",
        importance: "high"
    },
    {
        question: "Which of the following is NOT a common use case for Result in Rust?",
        options: [
            "File I/O operations",
            "Network requests",
            "String parsing operations",
            "Simple arithmetic calculations"
        ],
        correct: 3,
        explanation: "Simple arithmetic calculations typically don't fail and don't need Result. Result is used for operations that can fail like file I/O, network requests, and parsing operations.",
        importance: "medium"
    },
    {
        question: "In Rust, what does 'wrapping' a value mean?",
        options: [
            "Encrypting the value for security",
            "Converting the value to a string",
            "Putting a value inside a container type like Option or Result",
            "Compressing the value to save memory"
        ],
        correct: 2,
        explanation: "Wrapping refers to putting a value inside a container type such as Option::Some(value) or Result::Ok(value). It's the opposite of unwrapping.",
        importance: "high"
    },
    {
        question: "What is the primary purpose of a template engine?",
        options: [
            "To compile Rust code faster",
            "To generate text output by combining templates with dynamic data",
            "To manage database connections",
            "To handle HTTP routing"
        ],
        correct: 1,
        explanation: "A template engine generates text output (often HTML) by combining template files with dynamic data. It separates presentation logic from business logic.",
        importance: "high"
    },
    {
        question: "Which of the following is NOT a benefit of using template engines?",
        options: [
            "Separation of concerns",
            "Dynamic content rendering",
            "Code reusability through partials and layouts",
            "Faster database queries"
        ],
        correct: 3,
        explanation: "Template engines don't directly affect database query performance. Their benefits include separation of concerns, dynamic content rendering, and reusability through partials and layouts.",
        importance: "medium"
    },
    {
        question: "How would you wrap a string value 'hello' in an Option?",
        options: [
            "Option::wrap('hello')",
            "Some('hello')",
            "Option('hello')",
            "wrap!('hello')"
        ],
        correct: 1,
        explanation: "To wrap a value in an Option, you use Some(value). So for the string 'hello', it would be Some('hello') or Some(\"hello\".to_string()) for owned strings.",
        importance: "high"
    },
    {
        question: "What does 'separation of concerns' mean in the context of template engines?",
        options: [
            "Separating frontend and backend code",
            "Keeping data logic and presentation (HTML) separate",
            "Dividing code into multiple files",
            "Separating user authentication from business logic"
        ],
        correct: 1,
        explanation: "Separation of concerns in template engines means keeping your data logic separate from presentation (HTML/text). This makes code more maintainable and testable.",
        importance: "medium"
    },
    {
        question: "Which method would be safer than unwrap() for extracting values from Option or Result?",
        options: [
            "force_extract()",
            "get_value()",
            "match or if let",
            "unwrap_or_panic()"
        ],
        correct: 2,
        explanation: "Using match expressions or if let patterns is safer than unwrap() because they allow you to handle both success and failure cases explicitly without panicking.",
        importance: "high"
    },
    {
        question: "In a Rust template engine context, what would be an example of 'dynamic content'?",
        options: [
            "Static HTML pages that never change",
            "CSS stylesheets",
            "Showing a user's name or personalized data on a webpage",
            "JavaScript files"
        ],
        correct: 2,
        explanation: "Dynamic content refers to content that changes based on data, such as displaying a user's name, showing different products, or personalizing pages based on user preferences.",
        importance: "medium"
    }
];

// Quiz Application Class
class QuizApp {
    constructor() {
        this.questions = [...quizQuestions];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.selectedOption = null;
        this.isAnswered = false;
        
        this.initializeElements();
        this.setupEventListeners();
        this.displayQuestion();
    }

    initializeElements() {
        this.questionText = document.getElementById('question-text');
        this.optionsContainer = document.getElementById('options-container');
        this.nextBtn = document.getElementById('next-btn');
        this.restartBtn = document.getElementById('restart-btn');
        this.progressBar = document.getElementById('progress');
        this.questionNumber = document.getElementById('question-number');
        this.totalQuestions = document.getElementById('total-questions');
        this.scoreContainer = document.getElementById('score-container');
        this.explanationContainer = document.getElementById('explanation-container');
        this.explanationText = document.getElementById('explanation-text');
        this.finalScore = document.getElementById('final-score');
        this.totalScore = document.getElementById('total-score');
        this.scorePercentage = document.getElementById('score-percentage');
        this.scoreMessage = document.getElementById('score-message');
        
        this.totalQuestions.textContent = this.questions.length;
    }

    setupEventListeners() {
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.restartBtn.addEventListener('click', () => this.restartQuiz());
    }

    displayQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        
        // Reset state
        this.selectedOption = null;
        this.isAnswered = false;
        this.nextBtn.disabled = true;
        this.explanationContainer.style.display = 'none';
        
        // Show/hide importance badge
        const importanceBadge = document.getElementById('importance-badge');
        if (question.importance === 'high') {
            importanceBadge.style.display = 'block';
        } else {
            importanceBadge.style.display = 'none';
        }
        
        // Update progress
        const progress = ((this.currentQuestionIndex) / this.questions.length) * 100;
        this.progressBar.style.width = `${progress}%`;
        this.questionNumber.textContent = this.currentQuestionIndex + 1;
        
        // Display question
        this.questionText.textContent = question.question;
        
        // Clear and create options
        this.optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => this.selectOption(index, optionElement));
            this.optionsContainer.appendChild(optionElement);
        });
    }

    selectOption(selectedIndex, optionElement) {
        if (this.isAnswered) return;

        // Remove previous selections
        document.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected');
        });

        // Mark as selected
        optionElement.classList.add('selected');
        this.selectedOption = selectedIndex;
        
        // Enable next button
        this.nextBtn.disabled = false;
    }

    checkAnswer() {
        const question = this.questions[this.currentQuestionIndex];
        const options = document.querySelectorAll('.option');
        
        // Mark correct answer
        options[question.correct].classList.add('correct');
        
        // Mark incorrect answer if user selected wrong
        if (this.selectedOption !== question.correct) {
            options[this.selectedOption].classList.add('incorrect');
        } else {
            this.score++;
        }
        
        // Disable all options
        options.forEach(option => {
            option.classList.add('disabled');
            option.style.pointerEvents = 'none';
        });
        
        // Show explanation
        this.explanationText.textContent = question.explanation;
        this.explanationContainer.style.display = 'block';
        
        this.isAnswered = true;
        this.nextBtn.textContent = this.currentQuestionIndex === this.questions.length - 1 ? 'View Results' : 'Next Question';
    }

    nextQuestion() {
        if (!this.isAnswered) {
            this.checkAnswer();
            return;
        }

        this.currentQuestionIndex++;
        
        if (this.currentQuestionIndex >= this.questions.length) {
            this.showResults();
        } else {
            this.displayQuestion();
        }
    }

    showResults() {
        // Hide quiz container
        document.querySelector('.question-container').style.display = 'none';
        document.querySelector('.quiz-controls').style.display = 'none';
        this.explanationContainer.style.display = 'none';
        
        // Update progress to 100%
        this.progressBar.style.width = '100%';
        
        // Show score
        this.scoreContainer.style.display = 'block';
        this.finalScore.textContent = this.score;
        this.totalScore.textContent = this.questions.length;
        
        const percentage = Math.round((this.score / this.questions.length) * 100);
        this.scorePercentage.textContent = `${percentage}%`;
        
        // Calculate high importance questions performance
        const highImportanceQuestions = this.questions.filter(q => q.importance === 'high');
        const highImportanceCount = highImportanceQuestions.length;
        const highImportanceCorrect = this.calculateHighImportanceScore();
        
        // Show message based on performance
        let message, messageClass;
        if (percentage >= 80) {
            message = "Excellent! You have a strong understanding of Rust's Option, Result types, and template engine concepts. 🦀✨";
            messageClass = "excellent";
        } else if (percentage >= 60) {
            message = "Good job! You have a solid grasp of the concepts, but reviewing unwrap/wrap operations would be beneficial. 👍";
            messageClass = "good";
        } else {
            message = "Keep studying! Focus on understanding Option, Result types, and when to use unwrap safely. 📚";
            messageClass = "needs-improvement";
        }
        
        this.scoreMessage.textContent = message;
        this.scoreMessage.className = `score-message ${messageClass}`;
        
        // Show high importance summary
        const highImportanceSummary = document.getElementById('high-importance-summary');
        highImportanceSummary.innerHTML = `
            <h4>⭐ High Importance Concepts Performance</h4>
            <p>You got ${highImportanceCorrect} out of ${highImportanceCount} critical Rust concepts correct (${Math.round((highImportanceCorrect/highImportanceCount)*100)}%). 
            These are essential for safe Rust programming and avoiding runtime panics.</p>
        `;
        
        // Show restart button
        this.restartBtn.style.display = 'inline-block';
    }

    calculateHighImportanceScore() {
        const highImportanceQuestions = this.questions.filter(q => q.importance === 'high');
        const totalHighImportance = highImportanceQuestions.length;
        const overallPercentage = this.score / this.questions.length;
        
        // Estimate high importance score based on overall performance
        return Math.round(overallPercentage * totalHighImportance);
    }

    restartQuiz() {
        // Reset quiz state
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.selectedOption = null;
        this.isAnswered = false;
        
        // Reset UI
        this.scoreContainer.style.display = 'none';
        this.explanationContainer.style.display = 'none';
        this.restartBtn.style.display = 'none';
        this.nextBtn.textContent = 'Next Question';
        
        document.querySelector('.question-container').style.display = 'block';
        document.querySelector('.quiz-controls').style.display = 'block';
        
        // Shuffle questions for variety
        this.shuffleQuestions();
        
        // Start over
        this.displayQuestion();
    }

    shuffleQuestions() {
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
    }
}

// Initialize the quiz when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});

// Add some interactive feedback
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('option') && !e.target.classList.contains('disabled')) {
        // Add a subtle click animation
        e.target.style.transform = 'scale(0.98)';
        setTimeout(() => {
            e.target.style.transform = '';
        }, 150);
    }
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const nextBtn = document.getElementById('next-btn');
        if (!nextBtn.disabled) {
            nextBtn.click();
        }
    }
    
    // Number keys for option selection
    if (e.key >= '1' && e.key <= '4') {
        const optionIndex = parseInt(e.key) - 1;
        const options = document.querySelectorAll('.option:not(.disabled)');
        if (options[optionIndex]) {
            options[optionIndex].click();
        }
    }
});
