import {get} from './service';

export default class CalculateAPI {
    static async calculate(note) {
        return get('calculate', {note});
    }
}