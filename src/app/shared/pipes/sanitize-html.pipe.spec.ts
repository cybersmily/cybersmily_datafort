import { DomSanitizer } from '@angular/platform-browser';
import {TestBed, waitForAsync } from '@angular/core/testing';
import { SanitizeHtmlPipe } from './sanitize-html.pipe';

describe('SanitizeHtmlPipe', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DomSanitizer,
          useValue: {
            sanitize: () => 'safeString',
            bypassSecurityTrustHtml: () => 'safeString'
          }
        }]
    });
  }));

  it('create an instance', () => {
    const pipe = new SanitizeHtmlPipe(TestBed.get(DomSanitizer));
    expect(pipe).toBeTruthy();
  });
});
