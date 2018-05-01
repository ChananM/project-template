import { DatabaseProvider } from './../database/database';
import { CalendarEvent } from './../../models/calendarEvent.model';
import { Injectable } from '@angular/core';
  
//Date format is ISO 8601 "YYYY-MM-DD" the value is a string

@Injectable()
export class CalendarEventProvider {

  posts: CalendarEvent[] = [];

  constructor(public dbProvider: DatabaseProvider) {
    dbProvider.getCalEvents().subscribe(stories => { 
      this.posts = stories;
      console.log(this.posts);
    })
  }
  async load(){
    await this.posts.length > 0;
    // this.posts = [ // delete this in your time
    //   new CalendarEvent("",this.isoToDate("2018-04-24"),"Test","האירוע המטריף של הקיץ - בדיקת אפליקציות", false),
    //   new CalendarEvent("https://s-i.huffpost.com/gen/1842880/images/n-NIGHTCLUB-628x314.jpg",this.isoToDate("2018-03-10"),"מסיבה","בלה-בלה-בלה,לה-לה-לה", false),
    //   new CalendarEvent("https://c.wallhere.com/photos/90/73/disco_club_dance_hands-723564.jpg!d",this.isoToDate("2018-04-24"),"Test3","Let's test our calendar event", false)
    // ];
  }

  addEvent(event: CalendarEvent){
    return this.dbProvider.addCalEvent(event);
  }

  deleteEvent(event: CalendarEvent){
    return this.dbProvider.deleteCalEvent(event);
  }

  private isoToDate(dateStr:string) : Date{
    return new Date(dateStr);
  }
}

