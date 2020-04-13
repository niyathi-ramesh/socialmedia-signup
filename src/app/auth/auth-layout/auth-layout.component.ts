import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'cs-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
})
export class AuthLayoutComponent implements OnInit {
  @Input() mainText: string;
  @Input() header: string;

  constructor() {}

  ngOnInit(): void {}
}
