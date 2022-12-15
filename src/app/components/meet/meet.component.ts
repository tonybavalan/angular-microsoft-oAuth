import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me/events?$select=subject,body,bodyPreview,organizer,attendees,start,end,location';

type EventType = Array<{
  subject?: string,
  bodyPreview?: string,
  location?: { displayName?: string },

}>;

@Component({
  selector: 'app-meet',
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.css']
})
export class MeetComponent {
  event!: EventType;
  
  constructor( 
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getAllEvents();
  }

  getAllEvents() {
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(event => {
        console.log(event);
    });
  }
}
