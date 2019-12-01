import {get} from './service';

export default class Characteristics {
    static async get(category_id) {
        return await get('characteristics', {category_id});
    }
}