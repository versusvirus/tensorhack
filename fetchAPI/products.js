import {get} from './service';

export default class ProductsAPI {
    static async getProduct(id) {
        return await get('products', null, id);
    }

    static async getProducts(name) {
        return name ? await get('products', {name}) : await get('products');
    }
}