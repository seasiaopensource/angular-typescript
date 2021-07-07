import { Component, OnInit, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { fieldModel, FieldDetails, Templateoptions } from './fieldVariables'
import { BsModalService } from 'ngx-bootstrap';
import { DynamicFormBuilderConfigService } from '../dynamic-form-builder-config.service';
import { ToastrService } from 'ngx-toastr';
import { DynamicFormBuilderService } from '../dynamic-form-builder.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
@Component({
  selector: 'dfb-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {

  fieldModel = new fieldModel()
  fieldDetail = new FieldDetails();
  selectedSections = [];
  serverBusy:boolean = false;
  
  constructor(private modalService: BsModalService,private dfbService: DynamicFormBuilderService,private toastr: ToastrService,public dfbConfigService:DynamicFormBuilderConfigService,private _cd:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getFields();
    this.getSections();
    this.fieldModel.fieldtypeList=this.dfbConfigService.getFieldType();
    this.fieldModel.subDrodownList=this.dfbConfigService.subDropdownTypes();
    this.fieldModel.validators=this.dfbConfigService.getValidators();
  }

  openFieldDialoge(popup: TemplateRef<any>){
    this.fieldDetail=new FieldDetails();
    this.fieldModel.selectedFieldId = "";
    this.fieldModel.isEditMode=false;
    this.fieldModel.modalRef = this.modalService.show(popup,{ignoreBackdropClick:true,class:"modal-lg"});
  }
  cancel()
  {
    this.fieldModel.modalRef.hide();
    setTimeout(() => {
      this.fieldDetail = new FieldDetails();
      this.fieldModel.sections=this.fieldModel.sections.concat(this.selectedSections);
      this.selectedSections = [];
    }, 1000);
  }

  checkFieldOptions() {
    this.fieldDetail.templateOptions=new Templateoptions();
    this.fieldDetail.validators.validation[0]=""

    this.fieldDetail.templateOptions.options = this.getEmptyOption(this.fieldDetail.type)
  }
  getEmptyOption(type: string) {
    if (type == "select" && !this.fieldDetail.subType) {
      return [
        {
          label: "",
          value: "",
        },
      ];
    } else if (type == "radio" && !this.fieldDetail.subType) {
      return [
        {
          key: "",
          value: "",
        },
      ];
    } else {
      return [];
    }
  }

  addMoreOptions() {
    if (this.fieldDetail.type == "select") {
      this.fieldDetail.templateOptions.options.push({
        label: "",
        value: "",
      });
    } else {
      this.fieldDetail.templateOptions.options.push({
        key: "",
        value: "",
      });
    }
  }

  removeOption(optionIndex) {
    if (this.fieldDetail.templateOptions.options.length > 1) {
      this.fieldDetail.templateOptions.options.splice(optionIndex, 1);
    }
  }

  showEditDialoge(id: string, popup: TemplateRef<any>){
    
    this.fieldModel.isEditMode=true;
    let field = this.fieldModel.results.find(x => x.id == id) 
    this.fieldDetail= new FieldDetails();
    Object.assign(this.fieldDetail,field)
    this.fieldDetail.type = field?.fieldType;
    this.fieldDetail.templateOptions.minLength = field?.minLength;
    this.fieldDetail.templateOptions.maxLength = field?.maxLength;
    this.fieldModel.selectedFieldId = id;
    this.fieldModel.modalRef = this.modalService.show(popup,{ignoreBackdropClick:true,class:"modal-lg"});
  }

  getPagingData(eventArgs:Array<any>)
  {
    this.fieldModel.currentRecords=eventArgs||[];
    this._cd.detectChanges();
  }

  searchWithFilter() {
    this.fieldModel.filteredResults = this.fieldModel.searchFilter ? this.fieldModel.results.filter(x => x.name.toLowerCase().includes(this.fieldModel.searchFilter.toLowerCase())) : this.fieldModel.results;
  }


  camelize = (str: string) => {
    return str
      .replace(/\s(.)/g, function ($1) { return $1.toUpperCase(); })
      .replace(/\s/g, '')
      .replace(/^(.)/, function ($1) { return $1.toLowerCase(); });
  }

  getFields() {
    this.serverBusy=true
    this.dfbService.getFields().subscribe((response: any) => {
      this.serverBusy=false
      if (response.length == 0) {
        this.toastr.info("No Record Found.")
        return false;
     }
       this.fieldModel.results = response || [];
       this.fieldModel.filteredResults = response || [];
       },error=>{
        this.serverBusy=false
        console.log(error);
      });
  
 
 
}

// getSelectedSections(){
//   if(this.selectedSections.length>0){
//     let data = {
//       "Key": this.camelize(this.selectedSections.name),
//       "sectionName": this.sectionModel.sectionName,
//       "Id": this.sectionModel.selectedSectionId,
//     }

//   }
// }

  saveField() {
    this.fieldModel.modalRef.hide();
    this.serverBusy=true
    if (this.fieldModel.selectedFieldId) {

      let data = {
        
          "className": this.fieldDetail.className,
          "defaultValue": this.fieldDetail.defaultValue || null,
          "fieldName": this.fieldDetail.name,
          "groupIds": this.selectedSections.map(a=>a.id) || null,
          "id": this.fieldModel.selectedFieldId,
          "isRequired": false,
          "key": this.camelize(this.fieldDetail.name),
          "maxLength": this.fieldDetail.templateOptions.maxLength || null,
          "minLength": this.fieldDetail.templateOptions.minLength || null,
          "Type": this.fieldDetail.type,
          "SuperFieldType": null
          
        
      }
      this.dfbService.editField(data).subscribe((response: any) => {
         this.serverBusy=false;
          this.fieldModel.selectedFieldId = '';
          this.toastr.success(this.fieldDetail.name + ',Field updated successfully.');
          this.getFields();
        },error=>{
          console.log(error);
          this.serverBusy = false
          this.toastr.error(error)
        })
    }
    else {
      let data = {

        "key": this.camelize(this.fieldDetail.name),
        "fieldName": this.fieldDetail.name,
        "isRequired": false,
        "defaultValue": this.fieldDetail.defaultValue || null,
        "className": this.fieldDetail.className,
        "maxLength": this.fieldDetail.templateOptions.maxLength,
        "minLength": this.fieldDetail.templateOptions.minLength,
        "Type": this.fieldDetail.type ,
        "SuperFieldType": null

      
      }
      this.dfbService.addField(data).subscribe((response: any) => {
          this.serverBusy=false
          this.fieldModel.selectedFieldId = '';
          this.toastr.success(this.fieldDetail.name + ',Field added successfully.');
          this.getFields();
      },error=>{
        console.log(error);
        this.serverBusy = false
        this.toastr.error(error)
      })
    }
  }
  
  get getIndependentToData()
  {
    switch (this.fieldDetail.subType){
      case "state":
        return this.fieldModel.results.filter(f=>f.fieldType=="region")
      break;
      case "city":
        return this.fieldModel.results.filter(f=>f.fieldType=="state")
      break;
      case "area":
        return this.fieldModel.results.filter(f=>f.fieldType=="city")
      break;
      case "pinCode":
        return this.fieldModel.results.filter(f=>f.fieldType=="area")
      break;
      default:
        return [];

    } 
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  disableField(id: string){
    const Swal = require('sweetalert2');
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Field file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Disable',
      confirmButtonColor: '#28a745',
      cancelButtonColor: "#dc3545",
      cancelButtonText: 'Cancel',
      
    }).then((result) => {
    
    })
  }

  getSections() {
    this.dfbService.getSections().subscribe((response: any) => {
    if (response.length == 0) {
      this.toastr.info("No Record Found.")
      return false;
     }
     this.fieldModel.sections = response || [];
   },error=>{
     console.log(error);
   })
  }

}
