import { LightningElement, wire, track } from 'lwc';
//import { getSObjectValue } from '@salesforce/apex';
//import getSelectedContact from '@salesforce/apex/ContactController.getSelectedContact';
import getAllContacts from '@salesforce/apex/ContactController.getAllContacts';

//import NAME_FIELD from '@salesforce/schema/Contact.Name';
//import TITLE_FIELD from '@salesforce/schema/Contact.Title';
//import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
//import EMAIL_FIELD from '@salesforce/schema/Contact.Email';

export default class contactDetail extends LightningElement {
    @track selectedContact;
    @track contacts;

    @wire(getAllContacts) contacts;

    handleContactSelect(event) {
        const contactId=event.detail;
        this.selectedContact = this.contacts.data.find(
            contact => contact.Id === contactId
        );
    }

    //@wire(getSelectedContact, {id:'$id'})
    //contact;
    
    //@wire(getSingleContact) contact;

    /*get name() {
        return this.contact.data
            ? getSObjectValue(this.contact.data, NAME_FIELD)
            : '';
    }
    get title() {
        return this.contact.data
            ? getSObjectValue(this.contact.data, TITLE_FIELD)
            : '';
    }
    get email() {
        return this.contact.data
            ? getSObjectValue(this.contact.data, EMAIL_FIELD)
            : '';
    }
    
    get phone() {
        return this.contact.data
            ? getSObjectValue(this.contact.data, PHONE_FIELD)
            : '';
    }*/
}