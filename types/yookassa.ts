export interface IPaymentData {
  id: string;
  status: string;
  amount: IAmount;
  description: string;
  recipient: IRecipient;
  created_at: string;
  confirmation: IConfirmation;
  test: boolean;
  paid: boolean;
  refundable: boolean;
  metadata: IMetadata;
}

interface IAmount {
  value: string;
  currency: string;
}

interface IRecipient {
  account_id: string;
  gateway_id: string;
}

interface IConfirmation {
  type: string;
  confirmation_url: string;
}

interface IMetadata {
  order_id: string;
}