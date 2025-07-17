import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Chat } from './dashboard/components/chat/chat';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-root',
  imports: [DashboardComponent, HttpClientModule, RouterModule, ReactiveFormsModule, FormsModule, Chat],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'notetraker';
}