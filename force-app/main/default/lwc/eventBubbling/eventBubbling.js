import { LightningElement, track } from 'lwc';
//import getAllContacts from '@salesforce/apex/ContactController.getAllContacts';
import findContacts from '@salesforce/apex/ContactController.findContacts';


const DELAY = 350;

export default class EventBubbling extends LightningElement {
    @track selectedContact;
    @track contacts;

    //@wire(getAllContacts) contacts;

    handleKeyChange(event) {
        // Debouncing this method: Do not actually invoke the Apex call as long as this function is
        // being called within a delay of DELAY. This is to avoid a very large number of Apex method calls.
        window.clearTimeout(this.delayTimeout);
        const searchKey = event.target.value;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.delayTimeout = setTimeout(() => {
            findContacts({ searchKey })
                .then(result => {
                    this.contacts = result;
                    this.error = undefined;
                })
                .catch(error => {
                    this.error = error;
                    this.contacts = undefined;
                });
        }, DELAY);
    }

    handleContactSelect(event) {
        this.selectedContact = event.target.contact;
    }
}
