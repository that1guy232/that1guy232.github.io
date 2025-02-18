class GameUI {
    constructor(game) {
        this.game = game;
        this.initDOMElements();
    }

    initDOMElements() {
        this.container = document.getElementById('arrayContainer');
        this.mergeCountContainer = document.getElementById('mergeCountContainer');
        this.scoreContainer = document.getElementById('scoreContainer');
        this.pauseButton = document.getElementById('pauseButton');
        this.progressBar1 = document.getElementById('progressBar1');
        this.progressBar2 = document.getElementById('progressBar2');
        this.mergeTimerElement = document.getElementById('mergeTimer');
        this.spawnTimerElement = document.getElementById('spawnTimer');
        this.prestigeButton = document.getElementById('prestigeButton');
        this.maxNumberContainer = document.getElementById('maxNumberContainer');
        this.maxStateSizeContainer = document.getElementById('maxStateSizeContainer');
        this.wideContainer = document.getElementById('wideContainer');
    }

    render() {
        const newStateString = JSON.stringify(this.game.state.sort((a, b) => a - b).reverse());

        if (this.container.textContent !== newStateString) {
            this.container.textContent = newStateString;
        }

        if (this.mergeCountContainer && this.mergeCountContainer.textContent !== `Total Merges: ${this.game.mergeOperations}`) {
            this.mergeCountContainer.textContent = `Total Merges: ${this.game.mergeOperations}`;
        }

        if (this.scoreContainer && this.scoreContainer.textContent !== `Score: ${this.game.score}`) {
            this.scoreContainer.textContent = `Score: ${this.game.score}`;
        }

        const wideContainerContent = `Wide Container Content: ${this.game.someProperty}`;
        if (this.wideContainer.textContent !== wideContainerContent) {
            this.wideContainer.textContent = wideContainerContent;
        }
    }

    updateProgressBars() {
        const mergeProgress = Math.min(this.game.mergeTimer / this.game.mergeInterval, 1) * 100;
        const spawnProgress = Math.min(this.game.spawnTimer / this.game.spawnInterval, 1) * 100;

        if (this.progressBar1) {
            this.progressBar1.style.height = `${mergeProgress}%`;
        }
        if (this.progressBar2) {
            this.progressBar2.style.height = `${spawnProgress}%`;
        }
    }

    updateTimers() {
        const mergeTimeLeft = Math.max((this.game.mergeInterval - this.game.mergeTimer) / 1000, 0).toFixed(1);
        if (this.mergeTimerElement) {
            this.mergeTimerElement.textContent = `${mergeTimeLeft}s`;
        }

        const spawnTimeLeft = Math.max((this.game.spawnInterval - this.game.spawnTimer) / 1000, 0).toFixed(1);
        if (this.spawnTimerElement) {
            this.spawnTimerElement.textContent = `${spawnTimeLeft}s`;
        }
    }

    updateButtonState() {
        if (this.pauseButton) {
            this.pauseButton.textContent = this.game.isPaused ? 'Resume' : 'Pause';
            this.pauseButton.className = this.game.isPaused ? 'paused' : 'active';
        }
    }

    checkPrestigeAvailability() {
        const hasMaxMergeNumber = this.game.state.includes(this.game.maxMergeNumber);
        if (this.prestigeButton) {
            this.prestigeButton.disabled = !hasMaxMergeNumber;
            this.prestigeButton.style.cursor = hasMaxMergeNumber ? 'pointer' : 'not-allowed';
        }
    }

    updateMaxNumberDisplay() {
        if (this.maxNumberContainer) {
            this.maxNumberContainer.textContent = `Max Mergable Number: ${this.game.maxMergeNumber}`;
        }
    }

    updateMaxStateSizeDisplay() {
        if (this.maxStateSizeContainer) {
            this.maxStateSizeContainer.textContent = `Max Array Size: ${this.game.maxStateLength}`;
        }
    }
}
