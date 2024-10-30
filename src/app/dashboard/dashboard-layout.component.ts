import { Component, OnInit, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { NewsService } from '../news/services/news.service';
import { SubscriptionService } from '../subscription/services/subscription.service';
import { New } from '../news/interfaces/news.interface';
import { Subscription } from '../subscription/interfaces/subscription.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {
  private authService = inject(AuthService);
  private newsService = inject(NewsService);
  private subscriptionService = inject(SubscriptionService);
  private router = inject(Router);

  public user = computed(() => this.authService.currentUser());
  public activeSubscription: Subscription | null = null;
  public userNews: New[] = [];
  public userNewsLimit: number = 5; // Limite inicial
  public latestNews: New[] = [];

  constructor() {}

  ngOnInit() {
    this.loadActiveSubscription();
    this.loadUserNews();
    this.loadLatestNews();
  }

  loadActiveSubscription() {
    const userId = this.user()?._id;
    if (userId) {
      this.subscriptionService.getActiveSubscription(userId).subscribe(
        subscription => {
          this.activeSubscription = subscription;
        },
        error => {
          console.error('Error loading active subscription:', error);
          this.activeSubscription = null;
        }
      );
    }
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

  onManageSubscription() {
    if (this.activeSubscription) {
      // Implementar lógica para cancelar suscripción
      this.subscriptionService.cancelSubscription(this.activeSubscription._id).subscribe(
        () => {
          this.activeSubscription = null;
          // Mostrar mensaje de éxito
        },
        error => console.error('Error canceling subscription:', error)
      );
    } else {
      this.router.navigate(['/packages']);
    }
  }

  loadUserNews() {
    const userId = this.user()?._id;
    if (userId) {
      this.newsService.getUserNews(userId, this.userNewsLimit).subscribe(
        news => {
          this.userNews = news;
        },
        error => console.error('Error loading user news:', error)
      );
    }
  }
  loadMoreUserNews() {
    this.userNewsLimit += 5; // Incrementa el límite
    this.loadUserNews(); // Vuelve a cargar las noticias con el nuevo límite
  }

  onEditProfile() {
    this.router.navigate(['/profile/edit']);
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  onNewsClick(newsId: string) {
    this.router.navigate(['/news', newsId]);
  }

  openEmail() {
    window.open('mailto:elconservador.colaborators@noticias.com');
  }

  openCentinela() {
    window.open('https://t.me/Centinela_QA_bot');
  }


}
