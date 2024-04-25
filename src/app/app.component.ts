import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environtment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'file-processing';

  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (!this.selectedFile) {
      alert('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    this.http
      .post<any>(`http://api.imgbb.com/1/upload?expiration=10&key=${environment.IMBB_API_KEY}`, formData)
      .pipe(
        switchMap((response) => {
          alert(`Upload successful: ${JSON.stringify(response)}`);
          return response;
        })
      )
      .subscribe(
        (result) => {
          alert(`Upload successful: ${JSON.stringify(result)}`);
        },
        (err) => {
          alert(`Upload error: ${err}`);
        }
      );
  }
}
