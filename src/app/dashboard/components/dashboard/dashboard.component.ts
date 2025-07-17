import { Component } from '@angular/core';
import { Chat } from "../chat/chat";
import { Notes } from '../notes/notes';
import { UnititledNotes } from '../unititled-notes/unititled-notes';
import { Note } from '../../../models/note.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Chat, Notes, UnititledNotes],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent {
  draftContent: string = '';
  editingNote: Note | null = null;
  notes: Note[] = [];

  constructor() {
    this.loadNotes();
  }

  loadNotes() {
    this.notes = JSON.parse(localStorage.getItem('notes') || '[]');
  }

  startDrafting(noteContent: string) {
    this.draftContent = noteContent;
    this.editingNote = null;
  }

  onEditNote(note: Note) {
    this.editingNote = note;
  }

  onDeleteNote(noteId: number) {
    this.notes = this.notes.filter(n => n.id !== noteId);
    localStorage.setItem('notes', JSON.stringify(this.notes));

    if (this.editingNote?.id === noteId) {
      this.editingNote = null;
      this.draftContent = '';
    }
  }

  onNoteSaved() {
    this.loadNotes();
    this.editingNote = null;
    this.draftContent = '';
  }
}

