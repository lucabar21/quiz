import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ButtonComponent } from '../../components/button/button.component';
import { Route, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HeaderComponent, ButtonComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
