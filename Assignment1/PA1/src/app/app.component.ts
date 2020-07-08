import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  query = '';
  table = '';
  attribute = '';
  condition = '';
  orderBy = '';
  results = null;

  constructor(private http:HttpClient){}

  runQuery() {
    if (!this.query) {
      return;
    }
    this.http.post('/api/runQuery',{query:this.query.trim()}).subscribe((data)=>{
    console.log(data)
    this.results = data;
    }, (err) => {
      this.results = err;
    }
    )
  }

  fillSelect() {
    this.query = ' SELECT {attribute} FROM {table} WHERE {condition} ' 
  }

  fillInsert() {
    this.query = ' INSERT INTO {table} VALUES {values} ' 
  }

  fillDelete() {
    this.query = ' DELETE FROM {table} WHERE {condition} ' 
  }

  addOrderBy() {
    if (this.orderBy && this.query.indexOf('ORDER BY') == -1) {
      this.query += ' ORDER BY ' + this.orderBy;
    }
    else if (this.query.indexOf('ORDER BY') != -1) {
      this.query = this.query.split('ORDER BY') [0];
      if (this.orderBy) {
        this.addOrderBy();
      }
    }
  }

  fillIn(type) {
    if (!this.query) {
      return;
    }

    switch(type) {
      case 'table':
          this.query = this.query.replace('{table}', this.table);
          break;
      case 'attribute':
          this.query = this.query.replace('{attribute}', this.attribute);
          break;
    } 
  }
}
