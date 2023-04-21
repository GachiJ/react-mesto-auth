import '../pages/index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import { useState } from 'react';
import React from 'react';
import ImagePopup from './ImagePopup.js';


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({})


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
    <>
      <div className="root">
        <div className="page">
          <Header />
          <Main onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
          />
          <Footer />

          <PopupWithForm name='type_edit-profile'
            title='Редактировать профиль'
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}>
            <input type="text" className="popup__input popup__input_type_name" name="username" id="input-name"
              placeholder="Введите имя" required minLength="2" maxLength="40" />
            <span className="error" id="input-name-error"></span>
            <input type="text" className="popup__input popup__input_type_info" name="userinfo" id="input-info"
              placeholder="Ваши интересы" required minLength="2" maxLength="200" />
            <span className="error" id="input-info-error"></span>
            <button className="popup__button-submit" type="submit">Сохранить</button></PopupWithForm>

          <PopupWithForm name='type_add-photo'
            title='Новое место'
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}>
            <input type="text" className="popup__input popup__input_type_name" name="username" id="input-name"
              placeholder="Введите имя" required minLength="2" maxLength="40" />
            <span className="error" id="input-name-error"></span>
            <input type="text" className="popup__input popup__input_type_info" name="userinfo" id="input-info"
              placeholder="Ваши интересы" required minLength="2" maxLength="200" />
            <span className="error" id="input-info-error"></span>
            <button className="popup__button-submit" type="submit">Создать</button></PopupWithForm>

          <PopupWithForm
            name='edit_avatar'
            title='Обновить аватар'
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}>
            <input type="url" className="popup__input popup__input_avatar_url" name="avatar" id="input-avatar-url"
              placeholder="Ссылка на картинку" required pattern="https?://.+" />
            <span className="error" id="input-avatar-url-error"></span>
            <button className="popup__button-submit" type="submit">Сохранить</button></PopupWithForm>

          <PopupWithForm name='confirm_delete' title='Вы уверены?' onClose={closeAllPopups}></PopupWithForm>

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups} />
        </div>
      </div>
    </>
  );
}


export default App;
