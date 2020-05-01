import { DataService } from './../../shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CSArticle } from '../../shared/models/articles/article';

@Component({
  selector: 'cs-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  articleList: any;
  updated: string;
  title: string;
  curArticle: CSArticle;
  articleHTML: string;

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    this.LoadArticleHTML();
  }

  /**
   * Gets the base json file for all the articles in this section.
   * Then loads the current article based on path.
   * @memberof ArticleComponent
   */
  LoadArticleHTML(): void {
    // load the json file with the artilces
    this.dataService
    .GetJson('/json/mods/articles.json')
    .subscribe(
      resultObj => this.GetCurrentArticle(resultObj.articles),
      error => console.log( 'Error :: '  + JSON.stringify(error))
    );
  }

  /**
   * Sets the current articlelist and then continues to the set/load the current article.
   * @param {*} articles
   * @memberof ArticleComponent
   */
  GetCurrentArticle(articles: any): void {
    this.articleList = articles;
    this.activatedRoute.url.subscribe(
      (url) => this.LoadHTMLFile(url[0].path),
      error => console.log( 'Error :: ' + JSON.stringify(error))
    );
  }

  /**
   * Sets the current article and loads the html of the article to the component based on path parameter.
   * @param {string} path
   * @memberof ArticleComponent
   */
  LoadHTMLFile(path: string): void {
    // get the article from the list
    this.curArticle = this.articleList[path];
    this.updated = this.curArticle.updated;
    this.title = this.curArticle.title;
    this.dataService
    .GetHTML(`/html/mods/${this.curArticle.html}.html`)
    .subscribe(
      resultObj => {
        this.articleHTML = resultObj; },
      error => console.log( 'Error :: ' + JSON.stringify(error))
    );
  }
}
