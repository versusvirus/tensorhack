import {get} from './service';

export default class Categories {
    static async get(name) {
        if (name) {
            return await get('categories', {name});
        } else {
            return await get('categories');
        }
    }
}