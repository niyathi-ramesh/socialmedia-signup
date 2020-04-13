import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import * as DataModels from '@shared/models/data.model';
import country_list from '@assets/data/country_list.json';

@Component({
  selector: 'cs-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  submitted = false;
  filteredCountries: Observable<DataModels.Country[]>;
  inputType = 'password';
  maxDate = new Date();
  countryList = [...country_list];

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
    this.filteredCountries = this.signupForm.controls.country.valueChanges.pipe(
      startWith(''),
      map((state) =>
        state ? this._filterCountries(state) : this.countryList.slice()
      )
    );
  }

  ngOnInit() {}

  createForm() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      dob: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.signupForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }

    console.log(this.signupForm.value);
  }

  private _filterCountries(query: string) {
    if (typeof query !== 'string') {
      return;
    }
    const filterValue = query.toLowerCase();

    return this.countryList.filter(
      (country) => country.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  displayFn(country): string {
    return country && country.name ? country.name : '';
  }

  changeType() {
    this.inputType = this.inputType === 'text' ? 'password' : 'text';
  }
}
