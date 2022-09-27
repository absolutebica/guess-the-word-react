
import fetchGetHelper from "../utils/fetchUtil";

const GameApi = () => {
    const API_BASE = 'https://random-word-api.herokuapp.com/';

    const api = {
        fetchRandomWord() {
            return fetchGetHelper(`${API_BASE}word`);
        }
    }

    return api;
}

export default GameApi;