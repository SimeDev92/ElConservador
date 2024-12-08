import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Subscription } from '../../interfaces/subscription.interface';
import { NewsService } from '../../../news/services/news.service';
import { New } from '../../../news/interfaces/news.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subscription-management',
  templateUrl: './subscription-management.component.html',
  styleUrls: ['./subscription-management.component.css']
})
export class SubscriptionManagementComponent implements OnInit {
  activeSubscription: Subscription | null = null;
  userId: string | null = null;
  latestNews: New[] = [];

  constructor(
    private subscriptionService: SubscriptionService,
    private authService: AuthService,
    private newsService: NewsService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getCurrentUserId();
    if (this.userId) {
      this.loadActiveSubscription();
      this.loadLatestNews();
    } else {
      console.error('No user ID available');
    }
  }

  loadActiveSubscription() {
    if (this.userId) {
      this.subscriptionService.getActiveSubscription(this.userId).subscribe(
        subscription => {
          this.activeSubscription = subscription;
        },
        error => console.error('Error loading active subscription:', error)
      );
    }
  }
  loadLatestNews() {
    this.newsService.getLatestNews(5).subscribe(
      news => {
        this.latestNews = news;
      },
      error => console.error('Error loading latest news:', error)
    );
  }

  cancelSubscription() {
    if (this.activeSubscription && this.activeSubscription.stripeSubscriptionId) {
      this.subscriptionService.cancelSubscription(this.activeSubscription.stripeSubscriptionId).subscribe(
        () => {
          this.activeSubscription = null;
          Swal.fire({
            title: 'Suscripción Cancelada',
            text: 'Tu suscripción ha sido cancelada exitosamente.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#007BFF',
          });
        },
        error => {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al cancelar la suscripción. Por favor, intenta de nuevo.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      );
    } else {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo encontrar una suscripción activa para cancelar.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    }
  }

}
