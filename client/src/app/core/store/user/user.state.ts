import { User } from "../../models/user.model";

export interface UserState {
  user: User | null;
  status: 'idle' | 'loading' | 'loaded' | 'error'
  error?: any
}