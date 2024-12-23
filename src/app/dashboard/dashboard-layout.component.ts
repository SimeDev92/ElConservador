import { Component, OnInit, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { NewsService } from '../news/services/news.service';
import { SubscriptionService } from '../subscription/services/subscription.service';
import { New } from '../news/interfaces/news.interface';
import { Subscription } from '../subscription/interfaces/subscription.interface';
import { Clipboard } from '@angular/cdk/clipboard';
import Swal from 'sweetalert2';
import { DonationsService } from '../donations/donations.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {
  private authService = inject(AuthService);
  private newsService = inject(NewsService);
  private subscriptionService = inject(SubscriptionService);
  private donationsService = inject(DonationsService);
  private router = inject(Router);
  private clipboard = inject(Clipboard);

  public user = computed(() => this.authService.currentUser());
  public activeSubscription: Subscription | null = null;
  public userNews: New[] = [];
  public userNewsLimit: number = 5; // Limite inicial
  public latestNews: New[] = [];
  public activeCollaboration: any | null = null;
  public activeCollaborations: any[] = [];
  constructor() {}

  ngOnInit() {
    this.loadActiveSubscription();
    this.loadUserNews();
    this.loadLatestNews();
    this.loadActiveCollaborations();
  }

  getHiddenCode(code: string): string {
    return code.slice(0, 3) + '****' + code.slice(-3); // Muestra los primeros 3 y últimos 3 caracteres
  }

  copyToClipboard(code: string) {
    this.clipboard.copy(code);
    Swal.fire({
      title: '¡Copiado!',
      text: 'El código ha sido copiado al portapapeles.',
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#007BFF',
      toast: true,
      position: 'top-end',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
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
      // Redirige al componente de gestión de suscripción
      this.router.navigate(['/subscriptions/manage']);
    } else {
      // Si no hay suscripción activa, redirige a la página de paquetes
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

  loadActiveCollaborations() {
    const userId = this.user()?._id;
    if (userId) {
      this.donationsService.getActiveCollaborations().subscribe(
        collaborations => {
          this.activeCollaborations = collaborations;
        },
        error => console.error('Error loading active collaborations:', error)
      );
    }
  }

  onManageCollaboration() {
    if (this.activeCollaborations.length > 0) {
      this.router.navigate(['/donations/manage']);
    }
  }



}
