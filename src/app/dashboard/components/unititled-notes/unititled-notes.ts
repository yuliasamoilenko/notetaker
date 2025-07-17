import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Note } from '../../../models/note.model';

@Component({
  selector: 'app-unititled-notes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './unititled-notes.html',
  styleUrls: ['./unititled-notes.scss']
})
export class UnititledNotes implements OnChanges {
  @Input() draft: string = '';
  @Input() editingNote: Note | null = null;

  @Output() noteSaved = new EventEmitter<void>();

  title: string = '';
  content: string = '';
  savedMessage: string = '';
  private editingId?: number;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['draft'] && changes['draft'].currentValue && !this.editingNote) {
      this.content = changes['draft'].currentValue;
      if (!this.title) {
        this.title = this.content.slice(0, 20) + (this.content.length > 20 ? '...' : '');
      }
      this.editingId = undefined;
    }
    if (changes['editingNote'] && changes['editingNote'].currentValue) {
      const note = changes['editingNote'].currentValue;
      this.title = note.title;
      this.content = note.content;
      this.editingId = note.id;
      this.savedMessage = '';
    }
  }

  saveNote() {
    if (!this.title.trim() || !this.content.trim()) {
      this.savedMessage = 'Будь ласка, заповніть усі поля.';
      return;
    }

    const existingNotes = JSON.parse(localStorage.getItem('notes') || '[]');

    if (this.editingId) {
      // оновлення
      const index = existingNotes.findIndex((n: Note) => n.id === this.editingId);
      if (index !== -1) {
        existingNotes[index] = {
          id: this.editingId,
          title: this.title.trim(),
          content: this.content.trim(),
          createdAt: existingNotes[index].createdAt
        };
      }
    } else {
      // нова нотатка
      existingNotes.push({
        id: Date.now(),
        title: this.title.trim(),
        content: this.content.trim(),
        createdAt: new Date()
      });
    }

    localStorage.setItem('notes', JSON.stringify(existingNotes));

    this.savedMessage = 'Нотатку збережено!';
    this.title = '';
    this.content = '';
    this.editingId = undefined;
    this.draft = '';

    this.noteSaved.emit();
  }
}
