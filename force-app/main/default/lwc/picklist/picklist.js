/* eslint-disable no-console */
import { LightningElement, track, wire} from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import fetchCategories from '@salesforce/apex/ContactController.fetchCategories';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import AccountSource_FIELD from '@salesforce/schema/Account.AccountSource';

export default class Picklist extends LightningElement {

    @track taskfield1='Task_Test__c';

    @track objectfield1='Task';


    @track
    taskCategories;

    @track
    PriorityPicklistValues = [
        {value: 'All', label: 'All'},
        {value: 'High', label: 'High'},
        {value: 'Normal', label: 'Normal'},
        {value: 'Low', label: 'Low'}
    ];
    @track
    priority_value;

    @track value;

    @track category_value;

    @wire(fetchCategories,{objectPassed: '$objectfield1',fieldPassed: '$taskfield1'}) taskCategories;

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    objectInfo;

    @wire(getPicklistValues, { recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName: AccountSource_FIELD})
    AccountSourceValues;

    handleChange(event) {
        this.value = event.detail.value;
        console.log('Task info '+this.taskCategories);
    }

    handleTaskChange(event) {
        this.category_value = event.detail.value;
        //console.log('Task info '+JSON.parse(JSON.stringify(this.objectInfo)));
    }

    handlePriority(event) {
        this.priority_value = event.detail.value;
        /*const filter = event.target.dataset.filter;
        let value = event.detail.value; 
        this.taskList = this.masterTaskList;                    
        if(value !== "All" && value !== ""){
            let filterList = [];
            console.log('Task Size before'+this.taskList.length);
            this.taskList.forEach(item =>{
                if(filter === "priority" && item.priority === value){
                    filterList.push(item);
                }else if(filter === "duedate" && item.dueDate <= value){
                    filterList.push(item);
                }else if(filter === "taskcategory" && item.taskType === value){
                    filterList.push(item);
                }else if(filter === "search"){
                    let conName = item.accountName.toLocaleUpperCase();                  
                    if(conName.startsWith(value.toLocaleUpperCase())){
                        filterList.push(item);
                    }                    
                }              
            });                      
            this.taskList = filterList;              
        }else{
            this.taskList = this.masterTaskList;
        }
        if(this.taskList !== undefined && this.taskList.length > 0){ 
            this.emptyTask = false;                              
            let curTaskData = this.finalTaskData[this.taskList[0].Id];      
            fireEvent(this.pageRef, 'showTaskDetails',curTaskData);                       
        }else{
            this.emptyTask = true;
        }*/            
    }
}