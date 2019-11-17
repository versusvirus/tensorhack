import {get, post, deleteCall} from './service';

export default class PurchasesAPI {
    static async getPurchase(note) {
        return await get('purchases', {note});
    }

    static async createPurchase(note, text) {
        return await post('purchases', {note, text});
    }

    static async deletePurchase(note) {
        return await deleteCall('purchases', null, note);
    }
}
