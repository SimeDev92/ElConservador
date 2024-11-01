import { Component, OnInit } from '@angular/core';
import { DonationsService } from '../donations.service';
import Swal from 'sweetalert2';
import { Donation } from '../interfaces/donation.interface'; // Importa el tipo Donation si existe

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  public activeDonations: Donation[] = []; // Define el tipo de activeDonations

  constructor(private donationsService: DonationsService) {}

  ngOnInit(): void {
    this.loadActiveDonations();
  }

  loadActiveDonations() {
    this.donationsService.getActiveCollaborations().subscribe(
      (donations: Donation[]) => {
        this.activeDonations = donations.filter(donation => donation.type === 'recurring' && donation.status === 'active');
      },
      error => console.error('Error loading active donations:', error)
    );
  }


  cancelDonation(subscriptionId: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción cancelará tu colaboración recurrente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed) {
        this.donationsService.cancelRecurringDonation(subscriptionId).subscribe(
          () => {
            this.activeDonations = this.activeDonations.filter(d => d.stripeSubscriptionId !== subscriptionId);
            Swal.fire('Cancelado', 'Tu colaboración ha sido cancelada.', 'success');
          },
          error => console.error('Error cancelling donation:', error)
        );
      }
    });
  }
}
