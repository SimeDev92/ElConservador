import { Component, inject } from '@angular/core';
import { environments } from '../../../../environments/environments';
import { New } from '../../../news/interfaces/news.interface';
import { NewsService } from '../../../news/services/news.service';

@Component({
  selector: 'app-publicar-informacion',
  templateUrl: './publicar-informacion.component.html',
  styleUrls: ['./publicar-informacion.component.css']
})
export class PublicarInformacionComponent {

  private newsService = inject(NewsService);

  public latestNews: New[] = [];

  ngOnInit() {
    this.loadLatestNews();
  }

  loadLatestNews() {
    this.newsService.getLatestNews(3).subscribe(
      news => {
        this.latestNews = news.map(item => ({
          ...item,
          date: new Date(item.date) // Convierte la fecha a un objeto Date
        }));
      },
      error => console.error('Error loading latest news:', error)
    );
  }
  contactEmail = environments.contactEmail;
  centinelaBotUrl = environments.centinelaBotUrl;
}
