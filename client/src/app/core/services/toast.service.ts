import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private toastr: ToastrService) {
  }

  showSuccess(text: string) {
    this.toastr.success(text);
  }

  showError(text: string) {
    this.toastr.error(text);
  }
}