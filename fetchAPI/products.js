import {get} from './service';

export default class ProductsAPI {
    static async getProduct(id) {
        return await get('products', null, id);
    }
}