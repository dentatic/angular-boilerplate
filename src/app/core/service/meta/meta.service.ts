import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { IMetaConfig } from '@core/model';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(private meta: Meta, private title: Title) { }

  setTitle(title: string) {
    this.title.setTitle(title)
  }

  setMeta(config: IMetaConfig) {

    this.meta.updateTag({ name: 'description', content: config.description });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:site', content: '@boilerplate' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: config.image });

    this.meta.updateTag({ name: 'og:type', content: 'article' });
    this.meta.updateTag({ name: 'og:site_name', content: '@boilerplate' });
    this.meta.updateTag({ name: 'og:title', content: config.title });
    this.meta.updateTag({ name: 'og:description', content: config.description });
    this.meta.updateTag({ name: 'og:image', content: config.image });
    this.meta.updateTag({ name: 'og:url', content: config.url });

  }

}


