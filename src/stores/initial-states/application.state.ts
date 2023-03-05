import { AccountType } from 'src/models/account.models';
import { CandidateLevel } from 'src/models/candidate.model';

export const ApplicationStoreInitialState = {
  userToken: undefined,
  id: undefined,
  email: undefined,
  type: AccountType.CANDIDATE,
  tempPass: 'sdadj8s8d9fudssf!!',
  name: undefined,
  phone: undefined,
  title: 'Senior Web Developer',
  linkedin: undefined,
  level: CandidateLevel.senior,
  salary: 80000,
  tags: [],
  cityId: '3fa85f64-5717-4562-b3fc-2c963f66afa6', // Sao Paulo
  tempVerificationToken: undefined,
  isAuthenticated: false,
  processing: false,
  step: 1
}
