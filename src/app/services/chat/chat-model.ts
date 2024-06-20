import { SelectedChat } from '../../domain';
import { Subject } from 'rxjs';

export class ChatModel {
    private changedSubject: Subject<ChatModel> = new Subject<ChatModel>();
    #selectedChat: SelectedChat;
    
    constructor() {
        this.#selectedChat = {id:'', name:'', type:''}
    }


    public get selectedChat(): SelectedChat {
        return this.#selectedChat;
    }

    public set selectedChat(selectedChat: SelectedChat) {
        this.#selectedChat = selectedChat;
        this.changedSubject.next(this);
    }
}