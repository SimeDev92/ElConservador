export interface Donation {
  _id: string;
  userId: string;
  amount: number;
  currency: string;
  date: Date;
  type: 'one-time' | 'recurring';
  stripeSessionId: string;
  stripeSubscriptionId?: string;
  status: string;
}
