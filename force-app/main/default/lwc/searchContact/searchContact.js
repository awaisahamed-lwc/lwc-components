import { LightningElement, track } from 'lwc';
import findContacts from '@salesforce/apex/ContactController.findContacts';

/** The delay used when debouncing event handlers before invoking Apex. */
const DELAY = 350;

export default class CompositionContactSearch extends LightningElement {
    @track selectedContact;
    @track contacts;
    @track error;

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

    handleClick(event) {
        event.preventDefault();
        window.open('https://mail.google.com/mail/u/0/?view=cm&tf=1&to='+this.selectedContact.Email+'&cc&bcc&su&body&fs=1','_blank'); 
    }
    
}
