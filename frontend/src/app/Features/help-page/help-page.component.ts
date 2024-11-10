import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-help-page',
  templateUrl: './help-page.component.html',
  styleUrl: './help-page.component.scss'
})
export class HelpPageComponent {

  helpForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.helpForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      issue: ['', [Validators.required, Validators.minLength(10)]],
      recyclingCategory: ['other', Validators.required],
      priority: ['low', Validators.required],
      additionalComments: ['']
    });
  }

  onSubmit(): void {
    if (this.helpForm.valid) {
      const formData = this.helpForm.value;
      console.log('Form Submitted', formData);

      // Here you would typically make an API call to send the form data to your backend server
      // For example:
      // this.helpService.submitHelpForm(formData).subscribe(response => {
      //   console.log(response);
      // });

      alert('Your query has been submitted! We will get back to you shortly.');
      this.helpForm.reset();
    }
  }

}
