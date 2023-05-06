import PopupWithForm from "./PopupWithForm"
import { useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useContext } from 'react';
import React from 'react';

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');


  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm name='type_edit-profile'
      title='Редактировать профиль'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input type="text" className="popup__input popup__input_type_name"
        name="name"
        id="input-name"
        placeholder="Введите имя"
        required minLength="2" maxLength="40"
        value={name || undefined || ""}
        onChange={handleChangeName} />
      <span className="error" id="input-name-error"></span>
      <input type="text"
        className="popup__input popup__input_type_info"
        name="about" id="input-info"
        placeholder="Ваши интересы"
        required minLength="2" maxLength="200"
        value={description || undefined || ""}
        onChange={handleChangeDescription} />
      <span className="error" id="input-info-error"></span>
      <button className="popup__button-submit" type="submit">Сохранить</button>
    </PopupWithForm>
  )
}

export default EditProfilePopup