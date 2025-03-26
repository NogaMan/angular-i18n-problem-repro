import {Component} from '@angular/core';

const messageWithInterpolation = $localize`{test}`;

@Component({
  selector: 'app-root',
  template: `
    <h1>ICU expression: {{messageWithInterpolation}}</h1>
    
    @if (messageWithInterpolation === '{test}') {
        OK
    } @else {
        NOT OK
    }
  `,
  standalone: true,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  messageWithInterpolation = messageWithInterpolation
}
