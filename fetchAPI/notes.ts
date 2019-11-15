import {get, post, put, deleteCall} from './service';

export default abstract class NotesAPI {
    static async getNotes(): Promise<object[]> {
        return await get('notes');
    }

    static async getNote(id: string): Promise<object> {
        return await get('notes', null, id);
    }

    static async createNote(body: any): Promise<object> {
        return await post('notes', body);
    }

    static async deleteNote(id: string): Promise<any> {
        return await deleteCall('notes', null, id);
    }

    static async putNote(id: string, body: any): Promise<object> {
        return await put('notes', body, id);
    }
}