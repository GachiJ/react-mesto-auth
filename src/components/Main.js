import Card from './Card.js';
import { useState, useEffect } from 'react';
import React from 'react';
import api from '../utilits/Api.js';

function Main(props) {

  const [userAvatar, setUserAvatar] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [cards, setCards] = React.useState([]);



  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([me, cards]) => {
        setUserAvatar(me.avatar)
        setUserName(me.name)
        setUserDescription(me.about)
        setCards(cards)
      })
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      <main className="content">
        <section className="profile" aria-label="Профиль">
          <div className="profile__avatar" onClick={props.onEditAvatar} aria-label="Открыть попап редактирования аватара" name='avatar' style={{ backgroundImage: `url(${userAvatar})` }}></div>
          <div className="profile__info">
            <h1 className="profile__title">{userName}</h1>
            <button className="profile__edit-button" onClick={props.onEditProfile} type="button" aria-label="Редактировать профиль"></button>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
          <button className="profile__add-button" onClick={props.onAddPlace} type="button" aria-label="Добавить карточку"></button>
        </section>
        <section className="cards" aria-label="Карточки">
          {cards.map((card) => (
            <Card
              key={card._id}
              link={card.link}
              name={card.name}
              likes={card.likes}
              onCardClick={props.onCardClick}
              card={card}
            />
          ))}
        </section>
      </main>
    </>
  )
}

export default Main