import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Subscription } from '../../interfaces/subscription.interface';
import { NewsService } from '../../../news/services/news.service';
import { New } from '../../../news/interfaces/news.interface';

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
    if (this.activeSubscription && this.activeSubscription._id) {
      this.subscriptionService.cancelSubscription(this.activeSubscription._id).subscribe(
        () => {
          this.activeSubscription = null;
          // Mostrar mensaje de éxito
        },
        error => console.error('Error canceling subscription:', error)
      );
    }
  }
}
