class MergeGame {
    static UPS = 30;
    static AUTO_SAVE_INTERVAL = 10000;

    constructor() {
        this.ui = new GameUI(this);
        GameState.loadGameState(this);
    }

    start() {
        if (!this.lastUpdateTime) {
            this.lastUpdateTime = performance.now();
            this.gameLoop = requestAnimationFrame(this.update.bind(this));
        }
        this.autoSaveInterval = setInterval(this.saveGameState.bind(this), MergeGame.AUTO_SAVE_INTERVAL);
    }

    stop() {
        cancelAnimationFrame(this.gameLoop);
        this.lastUpdateTime = 0;
        clearInterval(this.autoSaveInterval);
    }

    update(currentTime) {
        if (this.isPaused) {
            this.scheduleNextUpdate();
            return;
        }

        const deltaTime = currentTime - this.lastUpdateTime;
        this.lastUpdateTime = currentTime;

        this.updateTimers(deltaTime);
        this.checkTimers();

        this.ui.updateProgressBars();
        this.ui.updateTimers();
        this.ui.checkPrestigeAvailability();
        this.ui.updateMaxNumberDisplay();
        this.ui.render();
        this.ui.updateMaxStateSizeDisplay(); // Add this line

        this.scheduleNextUpdate();
    }

    scheduleNextUpdate() {
        this.gameLoop = requestAnimationFrame(this.update.bind(this));
    }

    updateTimers(deltaTime) {
        this.mergeTimer += deltaTime;
      
        if (game.state.length < game.maxStateLength) {
            this.spawnTimer += deltaTime;
        }
    }

    checkTimers() {
        if (this.spawnTimer >= this.spawnInterval) {
            this.addNewElement();
            this.spawnTimer = 0;
        }

        if (this.mergeTimer >= this.mergeInterval) {
            this.processMerges();
            this.mergeTimer = 0;
        }
    }

    addNewElement() {
        const randomElement = Math.floor(Math.random() * 2) + 1;
        this.state.push(randomElement);
    }

    processMerges() {
        let mergeOccurred;
        do {
            mergeOccurred = false;
            const elementCounts = this.countElements();

            this.state = this.mergeElements(elementCounts, (merged, value) => {
                mergeOccurred = merged;
                if (merged) {
                    this.mergeOperations++;
                    this.score += value; // Increase score by the value of the merged element
                }
            });
        } while (mergeOccurred);
    }

    countElements() {
        return this.state.reduce((acc, num) => {
            acc[num] = (acc[num] || 0) + 1;
            return acc;
        }, {});
    }

    mergeElements(countMap, onMerge) {
        let mergeOccurred = false;
        const newState = Object.entries(countMap).flatMap(([num, count]) => {
            const numericNum = Number(num);
            const mergedCount = Math.floor(count / 2);
            const remaining = count % 2;

            if (mergedCount > 0 && numericNum < this.maxMergeNumber) {
                onMerge(true, numericNum + 1);
                mergeOccurred = true;
            }

            return [
                ...Array(mergedCount).fill(numericNum + 1).filter(n => n <= this.maxMergeNumber),
                ...(remaining ? [numericNum] : []),
                ...(numericNum >= this.maxMergeNumber ? Array(count).fill(numericNum) : [])
            ];
        });

        if (!mergeOccurred) onMerge(false, 0);
        return newState;
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        this.ui.updateButtonState();
    }

    saveGameState() {
        try {
            GameState.saveGameState(this);
        } catch (error) {
            console.error('Failed to save game state:', error);
        }
    }

    loadGameState() {
        try {
            GameState.loadGameState(this);
        } catch (error) {
            console.error('Failed to load game state:', error);
        }
    }

    resetGameState() {
        GameState.resetGameState(this);
        this.ui.render();
        this.ui.updateProgressBars();
        this.ui.updateTimers();
        this.ui.updateMaxStateSizeDisplay(); // Add this line
    }

    checkPrestigeAvailability() {
        const hasMaxMergeNumber = this.state.includes(this.maxMergeNumber);
        if (this.ui.prestigeButton) {
            this.ui.prestigeButton.disabled = !hasMaxMergeNumber;
            this.ui.prestigeButton.style.cursor = hasMaxMergeNumber ? 'pointer' : 'not-allowed';
        }
    }

    prestige() {
        if (this.state.includes(this.maxMergeNumber)) {
            this.maxMergeNumber += 1;
            this.ui.prestigeButton.disabled = true;
            this.ui.prestigeButton.style.cursor = 'not-allowed';
            this.state = [];
            this.score = 0;
            this.saveGameState();
            this.ui.updateMaxNumberDisplay(); // Update display after prestige
            this.ui.updateMaxStateSizeDisplay(); // Add this line
        }
    }
}

// Game initialization
const game = new MergeGame();

// Event listeners setup
document.addEventListener('DOMContentLoaded', () => {
    if (game.ui.pauseButton) {
        game.ui.pauseButton.addEventListener('click', () => game.togglePause());
    }
    document.getElementById('resetButton').addEventListener('click', () => game.resetGameState());
    document.getElementById('prestigeButton').addEventListener('click', () => game.prestige());
    game.start();
});