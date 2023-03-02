import { User } from "../../models/user.model";

export interface AuthState {
  user: User | null;
  status: 'idle' | 'loading' | 'loaded' | 'error'
  error?: string
}
