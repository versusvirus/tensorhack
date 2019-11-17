import {get} from './service';

export default class CalculateAPI {
    static async calculate(products) {
        return get('calculate', {products});
    }
}