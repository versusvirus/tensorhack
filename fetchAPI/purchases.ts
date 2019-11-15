import {get, post, deleteCall} from './service';

export default abstract class PurchasesAPI {
    static async getPurchase(note: string): Promise<object> {
        return await get('purchases', {note});
    }

    static async createPurchase(note: string, text: string): Promise<object> {
        return await post('purchases', {note, text});
    }

    static async deletePurchase(note: string): Promise<any> {
        return await deleteCall('purchases', null, note);
    }
}
