import {get} from './service';

export default abstract class CalculateAPI {
    static async calculate(products: string[]): Promise<object> {
        return get('calculate', {products});
    }
}