import {get, post, put, deleteCall} from './service';

export default class NotesAPI {
    static async getNotes() {
        return await get('notes');
    }

    static async getNote(id) {
        return await get('notes', null, id);
    }

    static async createNote(body) {
        return await post('notes', body);
    }

    static async deleteNote(id) {
        return await deleteCall('notes', null, id);
    }

    static async putNote(id, body) {
        return await put('notes', body, id);
    }
}