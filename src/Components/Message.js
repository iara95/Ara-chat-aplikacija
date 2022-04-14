import React, { useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";


const Message = ({ messages, users }) => {


  return (
    <div>
      <ul className="Messages-list">
        {messages.map((message) => {
          const timeStamp = { //uzima vrijeme koje je dodano uz poruku u App.js-u te konvertira da se ljepše prikazuje
            hours: message.timeStamp.getHours() < 10 ? '0' + message.timeStamp.getHours() : message.timeStamp.getHours(),
            minutes: message.timeStamp.getMinutes() < 10 ? '0' + message.timeStamp.getMinutes() : message.timeStamp.getMinutes()
          }
          return(
          <div key={messages.indexOf(message)} className={(message.chatUserID === users) //određuje stilove ovisno tko je poslao poruku
            ? "Messages-message currentMember"
            : "Messages-message otherMember"}>
            {/*<span
              className="avatar"
              style={{ backgroundColor: `${message.userColor}` }} 
            />*/}
            <img src={message.userAvatar} alt=" " className="avatar" style={{backgroundColor: `${message.userColor}`}}/>
            <div className="Message-content">
              <div className="username">{message.username}</div>
              <div className="timestamp">{timeStamp.hours}:{timeStamp.minutes}</div>
              <div className="text">{message.text}</div>
            </div>
            
          </div>
          )
        })}
      </ul>
    </div>
  );
};

export default Message;