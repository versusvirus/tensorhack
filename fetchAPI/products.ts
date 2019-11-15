import {get} from './service';

export default abstract class ProductsAPI {
    static async getProduct(id: string): Promise<object> {
        return await get('products', null, id);
    }
}