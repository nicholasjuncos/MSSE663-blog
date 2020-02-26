import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {PasswordValidation} from '../../../shared/validators';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  updateUserForm: FormGroup;
  updatePasswordForm: FormGroup;
  updateImgForm: FormGroup;

  @Input() loading: boolean;
  @Input() userSubmitted: boolean;
  @Input() userError: String;
  @Input() passSubmitted: boolean;
  @Input() passError: String;
  @Input() imgSubmitted: boolean;
  @Input() imgError: String;

  @Output() sendUserForm = new EventEmitter<FormGroup>();
  @Output() sendPasswordForm = new EventEmitter<FormGroup>();
  @Output() sendImgForm = new EventEmitter<FormGroup>();
  constructor(public formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.updateUserForm = this.formBuilder.group({
      firstName: [this.authService.currentUserValue.firstName, Validators.required],
      lastName: [this.authService.currentUserValue.lastName, Validators.required]
    });
    this.updatePasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: PasswordValidation.MatchPassword
    });
    this.updateImgForm = this.formBuilder.group({
      img: ['', Validators.required]
    });
  }

  get fUser() {
    return this.updateUserForm.controls;
  }

  get fPassword() {
    return this.updatePasswordForm.controls;
  }

  get fImg() {
    return this.updateImgForm.controls;
  }

  updateUser() {
    this.sendUserForm.emit(this.updateUserForm);
  }

  updatePassword() {
    this.sendPasswordForm.emit(this.updatePasswordForm);
  }

  updateImg() {
    this.sendImgForm.emit(this.updateImgForm);
  }

}
