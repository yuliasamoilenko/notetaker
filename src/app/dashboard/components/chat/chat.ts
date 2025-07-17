import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OpenaAiService } from '../../../../.././services/openai.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './chat.html',
  styleUrls: ['./chat.scss']
})
export class Chat {
  userMessage: string = '';
  aiResponse: string = '';
  isLoading: boolean = false;

  constructor(private openaiService: OpenaAiService) {}

  sendToAI() {
    if (!this.userMessage.trim()) return;

    this.isLoading = true;
    this.openaiService.summarize(this.userMessage).subscribe({
      next: (response) => {
        this.aiResponse = response.choices[0].message.content;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Помилка запиту:', err.error || err.message || err);
        this.aiResponse = 'Виникла помилка. Спробуйте ще раз.';
        this.isLoading = false;
      }
    });
  }
}