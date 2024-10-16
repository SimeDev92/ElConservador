import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {
  private authService = inject(AuthService);
  public user = computed(() => this.authService.currentUser());

  public activePackage = {
    name: 'Paquete Premium',
    details: 'Publicaciones ilimitadas - 30 días restantes'
  };

  public stats = {
    publishedNews: 25,
    totalViews: 12345,
    totalComments: 789
  };

  public latestNews = [
    { title: 'Nueva ley de impuestos aprobada', date: new Date() },
    { title: 'Récord de exportaciones en el sector agrícola', date: new Date(Date.now() - 86400000) },
    { title: 'Debate sobre la reforma educativa', date: new Date(Date.now() - 172800000) }
  ];

  openExternalLink(url: string): void {
    window.open(url, '_blank');
  }

  onEditProfile() {
  }

  onLogout() {
    this.authService.logout();
  }
}
