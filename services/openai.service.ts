import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../environment";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class OpenaAiService {
    private readonly apiUrl = 'https://api.openai.com/v1/chat/completions'
    private readonly requestHeader = new HttpHeaders ( {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${environment.openaiApiKey}`
    })

    constructor (private http: HttpClient) {}

    summarize( text: string): Observable<any> {
        return this.http.post(this.apiUrl, {
            "model": "gpt-3.5-turbo",
            "messages": [
                { "role": "system", "content": "Ти  асистент, який вміє стисло переказувати текст." },
                { "role": "user", "content": `Ось текст лекції. Сконспектуй головне:\n\n${text}` }
  ]
}, {headers: this.requestHeader})

    }
}