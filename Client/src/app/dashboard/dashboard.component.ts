import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserserviceService } from '../Services/userservice.service';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  current_id: any;
  addingNewData: boolean = false;
  DataForm!: FormGroup;
  formModal: any;
  edit = faEdit;
  delete = faTrash;
  currentUser_id : any;
  userData : any = [];
  closeResult : string = '';

  constructor(private modalService: NgbModal, private userService: UserserviceService, private formBuilder: FormBuilder, private router: Router) { }
  
  ngOnInit(): void {

    this.DataForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      phone: [0, Validators.required],
      address: ['', Validators.required]
    });

    this.getUserData();
  }

  setDefaultValuesforForm()
  {
    this.DataForm.controls['name'].setValue('');
    this.DataForm.controls['email'].setValue('');
    this.DataForm.controls['phone'].setValue(0);
    this.DataForm.controls['address'].setValue('');
  }
  
  open(content:any) {
    this.addingNewData = true;
    this.setDefaultValuesforForm();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  getUserData()
  {
    this.userService.GetAllUsers().subscribe((res) => {
      this.userData = res;
      this.router.navigate(['/dashboard']);
    })
  }
    
  

  onSubmit(form: FormGroup)
  {
    console.log('onSubmit is called');
    console.log('form = ', form.value);
    this.userService.createNewUser(form.value).subscribe((res) => {
      this.getUserData();
    });

  }

  updateUser(form: FormGroup) {
    this.userService.UpdateData(form.value, this.current_id).subscribe((res) => {
      this.getUserData();
    });
    this.modalService.dismissAll();
    this.setDefaultValuesforForm();
  }

  openUpdateDialog(content: any, user: any)
  {
    this.addingNewData = false;
    this.current_id = user._id;
    this.DataForm.controls['name'].setValue(user.name);
    this.DataForm.controls['email'].setValue(user.email);
    this.DataForm.controls['phone'].setValue(user.phone);
    this.DataForm.controls['address'].setValue(user.address);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openDeleteDialog(content: any, id: any) {
    this.currentUser_id = id;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  Delete() {
    this.userService.Delete(this.currentUser_id).subscribe((res) => {
      this.getUserData();
    });
    
    this.modalService.dismissAll();
  }

}
