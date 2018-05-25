import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Albums, Photo, Photos } from '../../models/interfaces';

@Injectable()
export class FacebookProvider {

  access = "EAACEdEose0cBAPMlwY96z99CWP3dPu6EK5qUZCZBsOy7fR7EglWZBPVRVlEzYguHABqGo3HFBg3ZAlGLvcA5OzMjVTFMkxkI7HUXmwiZClfBLo94ZBRZAcZAZC26NNV8dZBpFsvD0pAbyFrYUJ1qr6wCh00z4bVGwyFU623klXpMqJRd9WH0XfqTJ0ADT7ZCJ75s0In5ityXLJTkgZDZD";

  constructor(public http: HttpClient) {
  }

  getAllAlbums(): Promise<Albums> {
    let counter = 0;
    return new Promise<Albums>((resolve, reject) => {
      this.http.get('http://graph.facebook.com/aguda.jce/albums?limit=200&fields=name,count,cover_photo,created_time&access_token=' + this.access)
        .subscribe(albums => {
          let a = albums as Albums;
          for (let i = 0; i < a.data.length; i++) {
            this.http.get('http://graph.facebook.com/' + a.data[i].cover_photo.id + '?fields=images&access_token=' + this.access)
              .subscribe(cover => {
                a.data[i].cover_photo = cover as Photo;
                counter++;
                if(counter == a.data.length){
                  resolve(a)
                }
              })
            }
          }, err => {
            reject(err)
          })
    })
  }

  getphotos(id: string): Promise<Photo[]> {
    return new Promise<Photo[]>((resolve, reject) =>{
      this.http.get('http://graph.facebook.com/' + id + '/photos?fields=images&access_token=' + this.access)
        .subscribe( async photos => {
          let p = photos as Photos;
          let photo = p.data;
          while(p.paging.next != null) {
            await this.getNextPhotos(p.paging.next)
              .then( res =>{
                p = res;
                for (let i = 0; i < p.data.length; i++) {
                   photo.push(p.data[i]);
                }
              }).catch(err => {
                console.log(err);
              })
          } 
          
          resolve(photo);
          }, err => {
            reject(err)
          })
    })
  }

  getNextPhotos(next: string): Promise<Photos> {
    return new Promise<Photos>((resolve, reject) => {
      this.http.get(next)
        .subscribe(photos => { 
          let p = photos as Photos
          resolve(p);
          }, err => {
            reject(err)
          })
    })
  }
}
