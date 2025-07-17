import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note } from '../../../models/note.model';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notes.html',
  styleUrls: ['./notes.scss']
})
export class Notes {
  @Input() notes: Note[] = [];

  @Output() editNote = new EventEmitter<Note>();
  @Output() deleteNote = new EventEmitter<number>();

  onEdit(note: Note) {
    this.editNote.emit(note);
  }

  onDelete(noteId: number) {
    if (confirm('Ви впевнені, що хочете видалити нотатку?')) {
      this.deleteNote.emit(noteId);
    }
  }
}
