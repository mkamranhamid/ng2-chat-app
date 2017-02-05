import { Component } from '@angular/core';
import { MdDialog, MdDialogRef, MdDialogConfig } from '@angular/material';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { Login } from '../login/login';
import { ParkingSlotObject } from './home';
import { BookingModalComponent } from '../modal/bookingmodal.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  items: FirebaseListObservable<any[]>;
  usersList: FirebaseListObservable<any[]>;
  getUserChat: FirebaseListObservable<any[]>;
  sendingMessageObject: FirebaseListObservable<any[]>;
  sessionUUId: string;
  concateduuids:string;
  chatMessages:Array<any>;
  currentUser;
  currentMessageNodeKey:string;
  constructor(public dialog: MdDialog, public af: AngularFire) {
    this.sessionUUId = sessionStorage.getItem('uuid')
    this.items = af.database.list('/parkingspaces');
    this.usersList = af.database.list('/users');
    this.usersList.subscribe(allusers=>{
      for(var i=0;i<allusers.length;i++){
        if(allusers[i].$key == this.sessionUUId){
          this.currentUser = allusers[i];
        }
      }
      console.log('allusers',allusers);
    })
    
    console.log(this.items)
  }
  tilesColorObj = {
    userList: 'lightgreen',
    userListHeader: '#9a9a8a',
    chatHeader: 'lightblue',
    chatContent: '#DDBDF1'
  }
  filterChatMessages(uA, uB, d) {
    let filteredMessages = [];
    if (uA && uB) {
      for (var key in d) {
        if (typeof d[key] === 'object') {
          filteredMessages.push(d[key])
        }
      }
      return filteredMessages
    }
  }
  showConvoWithUser(user) {
    this.chatMessages = [];
    this.concateduuids = user.uid + this.sessionUUId;
    this.getUserChat = this.af.database.list(`/messages/`)
    this.getUserChat.subscribe(data=>{
      if (data.length == 0) {
        this.currentMessageNodeKey = user.uid + this.sessionUUId;
      }
      data.map((d,i)=>{
        let CurrentUserInMsgKey = d.$key.indexOf(this.sessionUUId) > -1;
        let ClickedUserInMsgKey = d.$key.indexOf(user.uid) > -1;
        if (CurrentUserInMsgKey && ClickedUserInMsgKey) {
          this.currentMessageNodeKey = d.$key;
          this.chatMessages = this.filterChatMessages(CurrentUserInMsgKey, ClickedUserInMsgKey, d)
          console.log(this.chatMessages);
        }
      })
    })
  }
  sendMessage(msg):void {
    let msgObj = {
      message:msg,
      username:this.currentUser.username,
      senderUid:this.sessionUUId,
      timestamp:new Date().getTime()
    }
    console.log('msg',msg)
    this.sendingMessageObject = this.af.database.list(`/messages/${this.currentMessageNodeKey}`);
    this.sendingMessageObject.push(msgObj)
    msg = '';
  }

}