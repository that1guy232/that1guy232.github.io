class GameState {
    static DEFAULT_GAME_STATE = {
        state: [],
        mergeOperations: 0,
        score: 0,
        mergeTimer: 0,
        spawnTimer: 0,
        maxMergeNumber: 3,
        maxStateLength: 4,
        mergeInterval: 30000,
        spawnInterval: 5000
    };

    static saveGameState(game) {
        const gameState = {
            state: game.state,
            mergeOperations: game.mergeOperations,
            score: game.score,
            mergeTimer: game.mergeTimer,
            spawnTimer: game.spawnTimer,
            maxMergeNumber: game.maxMergeNumber,
            mergeInterval: game.mergeInterval,
            spawnInterval: game.spawnInterval
        };
        localStorage.setItem('mergeGameState', JSON.stringify(gameState));
    }

    static loadGameState(game) {
        const savedState = localStorage.getItem('mergeGameState');
        if (savedState) {
            const gameState = JSON.parse(savedState);
            game.state = gameState.state ?? GameState.DEFAULT_GAME_STATE.state;
            game.mergeOperations = gameState.mergeOperations ?? GameState.DEFAULT_GAME_STATE.mergeOperations;
            game.score = gameState.score ?? GameState.DEFAULT_GAME_STATE.score;
            game.mergeTimer = gameState.mergeTimer ?? GameState.DEFAULT_GAME_STATE.mergeTimer;
            game.spawnTimer = gameState.spawnTimer ?? GameState.DEFAULT_GAME_STATE.spawnTimer;
            game.maxMergeNumber = gameState.maxMergeNumber ?? GameState.DEFAULT_GAME_STATE.maxMergeNumber;
            game.mergeInterval = gameState.mergeInterval ?? GameState.DEFAULT_GAME_STATE.mergeInterval;
            game.spawnInterval = gameState.spawnInterval ?? GameState.DEFAULT_GAME_STATE.spawnInterval;
            game.maxStateLength = gameState.maxStateLength ?? GameState.DEFAULT_GAME_STATE.maxStateLength;
        } else {
            Object.assign(game, GameState.DEFAULT_GAME_STATE);
        }
    }

    static resetGameState(game) {
        Object.assign(game, GameState.DEFAULT_GAME_STATE);
        game.ui.render();
        game.ui.updateProgressBars();
        game.ui.updateTimers();
    }
}
