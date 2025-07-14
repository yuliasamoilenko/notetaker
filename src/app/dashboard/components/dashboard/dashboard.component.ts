import { Component } from '@angular/core';
import { Chat } from "../chat/chat";
import { Notes } from '../notes/notes';
import { UnititledNotes } from '../unititled-notes/unititled-notes';

@Component({
  selector: 'app-dashboard',
  imports: [Chat, Notes, UnititledNotes,],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent {

}
