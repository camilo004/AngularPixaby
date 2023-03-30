import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as bootstrap from 'bootstrap';


interface PixabayResponse {
  totalHits: number;
  hits: {
    id: number;
    webformatURL: string;
    tags: string;
    views: number;
    likes: number;
    title: string;
  }[];
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  searchTerm = '';
  category = '';
  images: PixabayResponse['hits'] = [];
  selectedImage: { id: number, webformatURL: string, title: string, tags: string, views: number, likes: number } = { id: 0, webformatURL: '',title:'', tags: '', views: 0, likes: 0 };
  
  

  searchImages(): void {
    const url = `https://pixabay.com/api/?key=13119377-fc7e10c6305a7de49da6ecb25&per_page=100&q=${this.searchTerm}&category=${this.category}&image_type=photo`;    this.http.get<PixabayResponse>(url).subscribe(data => {
      this.images = data.hits;
    });
  }

  selectImage(image: PixabayResponse['hits'][0]) {
    this.selectedImage = image;
  }
  openModal(image: any) {
    const modalLabel = document.querySelector('#imageModalLabel');
    const modalImage = document.querySelector('#modalImage');
    const modalViews = document.querySelector('#modalViews');
    const modalLikes = document.querySelector('#modalLikes');
  
    if (!modalLabel || !modalImage || !modalViews || !modalLikes ) {
      return;
    }
  
    modalLabel.textContent =` ${image.tags}`;
    modalImage.setAttribute('src', image.webformatURL);
    modalViews.textContent = ` ${image.views}`;
    modalLikes.textContent = ` ${image.likes}`;
  
    const modalEl = document.getElementById('imageModal');
    if (modalEl) {
      const modal = new bootstrap.Modal(modalEl, {});
      modal.show();
    }
  }

 

  
  constructor(private http: HttpClient) {}
}
