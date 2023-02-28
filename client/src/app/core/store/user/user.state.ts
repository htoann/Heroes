import { User } from "../../models/user.model";

export interface UserState {
  user: User;
  status: 'idle' | 'loading' | 'loaded' | 'error'
  error?: string
}
