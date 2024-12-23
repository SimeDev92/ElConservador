import { Component, OnInit } from '@angular/core';
import { environments } from '../../../environments/environments';
import { VisitsService } from '../../visits.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  facebookUrl = environments.facebookUrl;
  twitterUrl = environments.twitterUrl;
  telegramUrl = environments.telegramUrl;
  currentYear: number = new Date().getFullYear();

  constructor(private visitsService: VisitsService) {}

  ngOnInit(): void {
    this.incrementVisits();
  }

  private incrementVisits(): void {
    this.visitsService.incrementVisits();
  }
}
