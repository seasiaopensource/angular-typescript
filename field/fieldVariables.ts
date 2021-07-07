import { BsModalRef } from 'ngx-bootstrap';

export class fieldModel {

    modalRef: BsModalRef;
    isEditMode: boolean = false;
    searchFilter: string = "";    
    selectedFieldId: string = "";
    fieldtypeList: Array<any> = [];
    results:Array<any> = [];
    currentRecords:Array<any> = [];
    filteredResults: Array<any> = [];
    subDrodownList=[];
    validators=[];
    // sections = [
    //     {
    //         "id": "39f4195135b2a6e0c8cdb7cd13f5dd77",
    //         "key": "additionalQuestions",
    //         "name": "Additional Questions"
    //     },
    //     {
    //         "id": "39f41905200bf7fb7f56e3162e865ba9",
    //         "key": "bankDetailsL2CLSecured",
    //         "name": "Bank Details L2 CL secured"
    //     },
    //     {
    //         "id": "39e1b29b9dc192088ca104bb4a8b3699",
    //         "key": "basicDetails",
    //         "name": "Basic Details"
    //     },
    //     {
    //         "id": "39ed47225735bc7ee1daa478ea289664",
    //         "key": "businessDetails",
    //         "name": "Business Details"
    //     },
    //     {
    //         "id": "39e27f19180b84423253487ee0cc0653",
    //         "key": "bUSINESSINFORMATION",
    //         "name": "BUSINESS INFORMATION"
    //     },
    //     {
    //         "id": "39ed472460a6b9f17e65f0bd05d25684",
    //         "key": "currentAddressDetails",
    //         "name": "Current Address Details"
    //     },
    //     {
    //         "id": "39f41903b8805754bf3dfc0ce5c82f59",
    //         "key": "currentAddressDetailsL2CLSecured",
    //         "name": "Current Address Details L2 CL secured"
    //     },
    //     {
    //         "id": "39e1b26520664172557e241ced129f50",
    //         "key": "decisionReviewDetail",
    //         "name": "Decision Review Detail"
    //     },
    //     {
    //         "id": "39f419062cf7f199e2d19802edefb7d1",
    //         "key": "delinquencyGird(forRefinanceOnly)L2CLSecured",
    //         "name": "Delinquency Gird (for refinance only) L2 CL secured"
    //     },
    //     {
    //         "id": "39ed4723f7bfb3cda51943ef553fb991",
    //         "key": "employerDetails",
    //         "name": "Employer Details"
    //     },
    //     {
    //         "id": "39f41896dbad9c7007014ac831cdaa16",
    //         "key": "employerDetailsL2CLSecured",
    //         "name": "Employer Details L2 CL secured"
    //     },
    //     {
    //         "id": "39f41904daf4da1388603e7667d26eaa",
    //         "key": "iDDetailsL2CLSecured",
    //         "name": "ID Details L2 CL secured"
    //     },
    //     {
    //         "id": "39f419387cccb03ff8162606b6e0d40f",
    //         "key": "incomeAndPayments",
    //         "name": "Income And Payments"
    //     },
    //     {
    //         "id": "39ed4723863d34ceba31668ebaf5a6bc",
    //         "key": "level1BankDetails",
    //         "name": "Level1 Bank Details"
    //     },
    //     {
    //         "id": "39ed472343dd8dd1d425b2f1e56ae3cf",
    //         "key": "level1IDDetails",
    //         "name": "Level1 ID Details"
    //     },
    //     {
    //         "id": "39ed4721ef09247b08d309b82f54c1a1",
    //         "key": "loanDetails",
    //         "name": "Loan Details"
    //     },
    //     {
    //         "id": "39e1b29c2827a69c2e50b19ad7652398",
    //         "key": "otherDetails",
    //         "name": "Other Details"
    //     },
    //     {
    //         "id": "39f419055b27d7f54e97141c5f5e0767",
    //         "key": "otherDetailsL2CLSecured",
    //         "name": "Other Details L2 CL secured"
    //     },
    //     {
    //         "id": "39ed472e8a53a3f5e9a7431bb2fda34c",
    //         "key": "otherDetails2",
    //         "name": "Other Details2"
    //     },
    //     {
    //         "id": "39ed472e9e8c93e23e98e4afea80d74d",
    //         "key": "otherDetails3",
    //         "name": "Other Details3"
    //     },
    //     {
    //         "id": "39e1b2657922d683b0a58ae4aade4715",
    //         "key": "otherPersonalDetails",
    //         "name": "Other Personal Details"
    //     },
    //     {
    //         "id": "39f418a39e1c71cf00a0c3351a5508f0",
    //         "key": "otherDetailsLeadSource",
    //         "name": "OtherDetails LeadSource"
    //     },
    //     {
    //         "id": "39e1b263fe5b29708c660381477e713c",
    //         "key": "personalDetails",
    //         "name": "Personal Details"
    //     },
    //     {
    //         "id": "39ed47272a707cedac5f787e027ff52a",
    //         "key": "previousAddress(IfLessThan3YrsAtCurrentAddress)",
    //         "name": "Previous  Address (If Less than 3 yrs at current address)"
    //     },
    //     {
    //         "id": "39f4190494fb59bfdffe236312af0498",
    //         "key": "previousAddress(ifLessThan2YearsAtCurrent)L2CLSecured",
    //         "name": "Previous Address (if less than 2 years at current) L2 CL secured"
    //     },
    //     {
    //         "id": "39ed4728ade73cc59f982295debed4ee",
    //         "key": "reference1Details",
    //         "name": "Reference 1 Details "
    //     },
    //     {
    //         "id": "39ed4728d225f44510dde1f2d0dff1ca",
    //         "key": "reference2Details",
    //         "name": "Reference 2 Details "
    //     },
    //     {
    //         "id": "39f4193363e01b6191d57fcbebcbe0b6",
    //         "key": "reference3Details",
    //         "name": "Reference 3 Details "
    //     },
    //     {
    //         "id": "39ed4727978c717e220be883cd74ce52",
    //         "key": "spouse/CommonDetails",
    //         "name": "Spouse/Common Details"
    //     },
    //     {
    //         "id": "39f418514dee703c0ad10da8b91532f4",
    //         "key": "testSection",
    //         "name": "test Section"
    //     },
    //     {
    //         "id": "39ed4727f1de1a3da0d352a6cd4b820f",
    //         "key": "thirdPartyDetails",
    //         "name": "Third Party Details"
    //     }
    // ]
    sections=[];
    

}

export class Templateoptions{
    minLength: string = "";
    maxLength: string = ""; 
    label: string = "";
    key: string = "";
    independentTo: string = null;
    required:boolean=false;
    options:any[]=[];
}

export class FieldDetails{
    className:string ="col-6";
    name: string = "";
    type: string = "";
    defaultValue: string = "";
    subType:string="";
    templateOptions: Templateoptions= new Templateoptions();
    validators={
        validation:[""]
    }
    
}
