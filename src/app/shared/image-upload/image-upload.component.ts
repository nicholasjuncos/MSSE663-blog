import {Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {ControlContainer, Form, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit, AfterViewInit {
    @Input() isRound = false;
    @Input() image: string;
    @Input() formControlName: string;
    public formGroup: FormGroup;
    state: any = {};
    @ViewChild('input') input: ElementRef;
    constructor(private controlContainer: ControlContainer) {
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    ngOnInit() {
        this.state = {
            file: null,
            imagePreviewUrl: this.image !== undefined ? this.image : (this.isRound ? '../../../assets/img/placeholder.jpg' : '../../../assets/img/image_placeholder.jpg')
        };
        this.formGroup = <FormGroup>this.controlContainer.control;
    }
    ngAfterViewInit() {
        this.input.nativeElement.children[2].onchange = this.handleImageChange;
    }
    handleImageChange(e) {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.onloadend = () => {
            this.state.file = file;
            this.state.imagePreviewUrl = reader.result;
            // Ignore console error that appears
            this.formGroup.patchValue({
                img: file
            })
        };
        reader.readAsDataURL(file);
    }
    handleSubmit(e) {
        e.preventDefault();
        // const myFormValue = this.fg.value;
        // const myFormData = new FormData;
        // for (let i = 0; i < myFormValue.length; i++ ) {
        //     for ( const key of myFormValue ) {
        //         myFormData.append(key, myFormValue[key]);
        //     }
        // }
    }
    handleClick() {
        this.input.nativeElement.children[2].click();
    }
    handleRemove() {
        this.state.file = null;
        this.state.imagePreviewUrl = this.image !== undefined ? this.image : (this.isRound ? '../../../assets/img/placeholder.jpg' : '../../../assets/img/image_placeholder.jpg');
    }
}
