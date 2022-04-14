import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';
import blankAvatar from '../../Assets/blankAvatar.png';
import Card from '../Card/Card';

import avatarAstronaut from "../../Assets/avatarAstronaut.svg"
import avatarNinja from "../../Assets/avatarNinja.svg"
import avatarDetective from "../../Assets/avatarDetective.svg"



export default function Login(props) {
    const [enteredUsername, setEnteredUsername] = useState('');
    const [usernameIsValid, setUsernameIsValid] = useState(1); //prvotno je truth-y kako stilovi nebi zacrvenili sve kao da ne valja, tek se kasnije provjerava ako je zapravo Valid
    
    const [avatar, setAvatar] = useState(blankAvatar);
//makni enteredUsername pa za provjeru i sve stavi user
useEffect(() => {
console.log(props.user);
}, [props.user])

    //provjera username-a
    const handleAddUser = (event) => {
      console.log("ovo je user")
      console.log(props.user)
        event.preventDefault();
        if (props.user.username.trim().length === 0) { //ako je vrijednost u enteredUsername prazna kada se uklone razmaci
          setUsernameIsValid(false); //postavi da to nije valjani username
          return;
        }
        setUsernameIsValid(true);
        props.onLogin(avatar, props.user.username); //ako username valja, poziva loginHandler funkciju iz App.js-a koji postavlja da je korisnik ulogiran te se prikazuje chat a miče login
      };

      //promjena username-a
      const handleUsernameChange = (event) => { //bilo kojim unosom u input se mijenja username
        props.setUser(prevValues => (
          {...prevValues,  username: event.target.value})
          )
      };


      //promjena boje
      const handleColorChange = (event) => {
        props.setUser(prevValues => (
          {...prevValues,  randomColor: event.target.value})
          )
      }
      const submitUser = () => {
        props.setUsernameSubmitted(true)
      }

      //provjera koji je avatar odabran te se taj postavlja
      const handleAvatar = (avatar) => {
        console.log(avatar);
        let userAvatar
    
        switch (avatar) {
          case 1: userAvatar = avatarAstronaut; break;
          case 2: userAvatar = avatarNinja; break;
          default: userAvatar = avatarDetective; break;
        }
    
        props.setUser(prevValues => ({ ...prevValues, avatar: userAvatar, avatarId: avatar}))
      }
    

    return(
        <Card
            className={
                !usernameIsValid ? "login invalid" : "login"  //određuje stilove, a Card više ne treba no neda mi se mijenjati i brisati sad, praktički je glorified div
            }
            >
          <form onSubmit={handleAddUser}>
              <div className="avatars">
                <div className={`item ${props.user.avatarId === 1 ? 'active' : ''}`} onClick={() => handleAvatar(1)}> {/*provjerava koji je avatar kliknut, određuje stil za njega te ga postavlja na korisnika*/}
                  <img src={avatarAstronaut} alt="" />
                </div>
                <div className={`item ${props.user.avatarId === 2 ? 'active' : ''}`} onClick={() => handleAvatar(2)}>
                  <img src={avatarNinja} alt="" />
                </div>
                <div className={`item ${props.user.avatarId === 3 ? 'active' : ''}`} onClick={() => handleAvatar(3)}>
                  <img src={avatarDetective} alt="" />
                </div>
              </div>
              
              <label>Odaberite boju</label>
              <input className="inputColor" type="color" onChange={handleColorChange}></input>
              {/*mijenja username i boju sa svakom promjenom */}
              <input className="inputText"
              type='text'
              placeholder='upiši svoj username'
              onChange={handleUsernameChange}
              /> 
              <Button type='submit' onClick={submitUser}>Započni razgovor</Button>
          </form>
        </Card>
    )
}