export interface CreateAccountInput {
  email: string;
  password: string;
  type: AccountType;
}

export enum AccountType {
  CANDIDATE = 'CANDIDATE',
  COMPANY = 'COMPANY',
}

export interface SimplifiedAccountSchema {
  id: string;
  email: string;
  type: AccountType;
}

export interface AccountSchema extends SimplifiedAccountSchema {
  isActive: boolean;
  wasRemindedToActivate: boolean;
  createdAt: Date;
  updatedAt: Date;
  verificationToken: string;
}
