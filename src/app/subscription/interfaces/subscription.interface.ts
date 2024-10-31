export interface Subscription {
  _id: string;
  userId: string;
  packageId: string;
  packageName: string;
  startDate: Date;
  endDate: Date;
  status: string;
  stripeSubscriptionId: string;
  amount: number;
  currency: string;
  collaboratorCode: string;
}
