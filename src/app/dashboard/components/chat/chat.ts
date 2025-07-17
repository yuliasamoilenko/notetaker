import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OpenaAiService } from '../../../../../services/openai.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrls: ['./chat.scss']
})
export class Chat {
  userMessage: string = '';
  isLoading: boolean = false;

  messages: { text: string; isUser: boolean }[] = [];

  @Output() editNote = new EventEmitter<string>();

  constructor(private openaiService: OpenaAiService) {}

  sendMessage() {
    if (!this.userMessage.trim()) return;

    this.messages.push({ text: this.userMessage, isUser: true });

    this.isLoading = true;

    this.openaiService.summarize(this.userMessage).subscribe({
      next: (response) => {
        const aiText = response.choices[0].message.content;
        this.messages.push({ text: aiText, isUser: false });
        this.isLoading = false;
        this.userMessage = '';
      },
      error: (err) => {
        console.error('Помилка запиту:', err.error || err.message || err);
        this.messages.push({
          text: 'Виникла помилка. Спробуйте ще раз.',
          isUser: false
        });
        this.isLoading = false;
      }
    });
  }

  onAiMessageClick(text: string) {
    this.editNote.emit(text);
  }
}
