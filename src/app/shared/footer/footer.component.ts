import { Component } from '@angular/core';
import { environments } from '../../../environments/environments';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  facebookUrl = environments.facebookUrl;
  twitterUrl = environments.twitterUrl;
  telegramUrl = environments.telegramUrl;
  currentYear: number = new Date().getFullYear();
}
