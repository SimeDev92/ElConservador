import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../../services/subscription.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Subscription } from '../../interfaces/subscription.interface';

@Component({
  selector: 'app-subscription-management',
  templateUrl: './subscription-management.component.html',
  styleUrls: ['./subscription-management.component.css']
})
export class SubscriptionManagementComponent implements OnInit {
  activeSubscription: Subscription | null = null;
  availablePackages: any[] = [];
  userId: string | null = null;

  constructor(
    private subscriptionService: SubscriptionService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getCurrentUserId();
    if (this.userId) {
      this.loadActiveSubscription();
      this.loadAvailablePackages();
    } else {
      console.error('No user ID available');
      // Manejar el caso de usuario no autenticado
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

  loadAvailablePackages() {
    this.subscriptionService.getAllPackages().subscribe(
      packages => {
        this.availablePackages = packages;
      },
      error => console.error('Error loading packages:', error)
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

  subscribeToPackage(priceId: string) {
    if (this.userId) {
      const metadata = { type: 'package' };
      this.subscriptionService.createCheckoutSession(priceId, this.userId, metadata).subscribe(
        response => {
          // Redirigir a Stripe Checkout
          window.location.href = response.url;
        },
        error => console.error('Error creating checkout session:', error)
      );
    }
  }
}
