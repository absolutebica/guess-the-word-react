import GameApi from "../api/gameApi";

const GameService = () => {
    const Api = GameApi();
    const service = {
        getRandomWord() {
            return Api.fetchRandomWord();
        }
    }

    return service;
}

export default GameService;