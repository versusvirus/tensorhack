import {get, post, deleteCall} from './service';

export default class PurchasesAPI {
    static async getPurchase(note_id) {
        return await get('purchases', {note_id});
    }

    static async createPurchase(note_id, category_id, characteristics, count) {
        return await post('purchases', {note_id, category_id, characteristics, count});
    }

    static async deletePurchase(id) {
        return await deleteCall('purchases', null, id);
    }
}
