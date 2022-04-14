import './App.css';
import { useState, useEffect } from "react";

import Input from "./Components/Input";
import Message from "./Components/Message";
import Login from './Components/Login/Login/Login';

import avatarAstronaut from "./Components/Assets/avatarAstronaut.svg"
import avatarNinja from "./Components/Assets/avatarNinja.svg"
import avatarDetective from "./Components/Assets/avatarDetective.svg"



function randomColor() { //random boja ako se ne odabere kod login-a
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

function App() {

  const [user, setUser] = useState({
    username: '',
    randomColor: randomColor(),
    avatar: avatarAstronaut, //default avatar
    avatarId: 0
  });

  const [messages, setMessages] = useState([]); //niz svih poruka
  const [drone, setDrone] = useState(); //za chat
  const [users, setUsers] = useState(); //zapravo naš user ID

  const [isLoggedIn, setIsLoggedIn] = useState(false); //ako je korisnik ulogiran, koristimo da vidimo hoće li se vidjeti login ili chat

  
  const [usernameSubmitted, setUsernameSubmitted] = useState(false)


  useEffect(() => {
    if(usernameSubmitted){
      console.log(`ovo je to ${usernameSubmitted}`)
      const drone = new window.Scaledrone("cqXFOa7wXB8yCDxG", { //povezivanje sa chat kanalom
        data: user,
      });
      setDrone(drone);
    }
    // eslint-disable-next-line
  }, [usernameSubmitted]); //da se okine kod prvog mount-anja iliti učitavanja te da se tek onda povuku korisnikovi podaci

useEffect(() => {
  if (drone) {  //ako ima drone, ako se kod otvaranja pojavi greška da ju ispiše
    drone.on("open", (error) => {
      if (error) {
        console.log("Error on connecting", error);
      }

     

      const chatRoom = drone.subscribe("observable-room"); //prijavljujemo u chat room kako bi mogli reagirati na poruke

      chatRoom.on("open", (error) => { //javlja grešku ako dođe do nje kod otvaranja chat room-a
        if (error) {
          return console.error(error);
        }
        // Connected to room
      });

      chatRoom.on("data", (text, chatUser) => { //kada chat room primi poruku
         setUsers(drone.clientId);
        

        const username = chatUser.clientData.username; //dohvaćaju se podaci o korisniku koji je poslao poruku
        const chatUserID = chatUser.id;
        const userColor = chatUser.clientData.randomColor;
        const userAvatar = chatUser.clientData.avatar;
        const timeStamp = new Date()

        console.log(`text je ${text}`)
        
        setMessages((oldArray) => [
          ...oldArray,
          { text, username, userColor, chatUserID, user, timeStamp, userAvatar }, //dodaje se objekt sa porukom u niz svih poruka
        ]);
      });
    });
  }
}, [drone])

  const onSendMessage = (message) => { //prima text iz Input-a i prikazuje u chat room-u
    if (message) {
      drone.publish({
        room: "observable-room",
        message,
      });
    }
  };

  const loginHandler = (avatar, username) => {
    setUser(() => {
      return { id: drone.clientId, avatar: avatar, username: username }; //korisniku dodijeljuje podatke
    }); //nepotrebno no ostavit ću jer ne škodi
    setIsLoggedIn(true); //postavlja da je ulogiran
    console.log('User', username, 'connected!');
  };

  

  useEffect(() => {
    console.log("user")
    console.log(user)
    }, [user]) //ispisuje svaku promjenu u konzoli, najviše radi provjere

  return (
    <div className="App">
    {!isLoggedIn && <Login user={user} setUser={setUser} usernameSubmitted={usernameSubmitted} setUsernameSubmitted={setUsernameSubmitted} onLogin={loginHandler}/>} {/*ako nije ulogiran da se prikaže login */}
    {isLoggedIn && 
      
      <>
        <div className="App-header">
          <h1>Moja chat aplikacija</h1>
        </div>
        <div>
          <Message messages={messages} users={users}/>
          <Input onSendMessage={onSendMessage} />
        </div>
      </>
    } {/*ako je ulogiran da se prikaže chat */}
    </div> 
  );
}

export default App;
