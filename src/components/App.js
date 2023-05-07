import '../pages/index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { useEffect, useState } from 'react';
import React from 'react';
import ImagePopup from './ImagePopup.js';
import api from '../utilits/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({})
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = React.useState([]);




  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCards(cardsData)
        setCurrentUser(userData)
      })
      .catch((err) => console.log(err))
  }, [])


  function handleUpdateUser(userInfo) {
    api.setUserInfo(userInfo)
    .then((userData) => {
      setCurrentUser(userData)
      closeAllPopups()
    })
    .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(avatar) {
    api.changeAvatar(avatar)
    .then((res) => {
      setCurrentUser(res)
      closeAllPopups()
    })
    .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit(cardInfo) {
    api.addNewCard(cardInfo)
    .then((data) => {
      const newCard = data;
      setCards([newCard, ...cards]);
      closeAllPopups()
    })
    .catch((err) => console.log(err))
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);



    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => console.log(err))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((newCard) => newCard.filter((item) => item._id !== card._id))
      })
      .catch((err) => console.log(err))
  }
  

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard({})
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header />
          <Main onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          />
          <Footer />

          <EditProfilePopup  
          onUpdateUser={handleUpdateUser}  
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} />

          <AddPlacePopup  
          onAddPlace={handleAddPlaceSubmit} 
          isOpen={isAddPlacePopupOpen} 
          onClose={closeAllPopups}/>

          <EditAvatarPopup 
          onUpdateAvatar={handleUpdateAvatar} 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} />

          <PopupWithForm name='confirm_delete' title='Вы уверены?' onClose={closeAllPopups}></PopupWithForm>

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}


export default App;
