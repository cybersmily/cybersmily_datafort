import { Title, Meta } from '@angular/platform-browser';
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private title: Title, private meta: Meta, @Inject(DOCUMENT) private doc) { }

  updateMeta(title: string, description: string) {
    this.title.setTitle(`Cybersmily's Datafort ${title}`);
    this.meta.updateTag({name: 'description', content: description});
    this.meta.updateTag({name: 'og:title', content: title});
    this.meta.updateTag({name: 'og:description', content: description});
    this.createLinkForCanonicalURL();
  }

  private createLinkForCanonicalURL() {
    let link: HTMLLinkElement = this.doc.querySelector('link[rel="canonical"');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', this.doc.URL);
  }
}
