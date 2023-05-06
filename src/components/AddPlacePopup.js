import PopupWithForm from "./PopupWithForm"
import React from 'react';


function AddPlacePopup(props) {
  const nameRef = React.useRef();
  const linkRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value,
    })
  }

  return (
    <PopupWithForm name='type_add-photo'
      title='Новое место'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input type="text"
        className="popup__input popup__input_type_name"
        name="name"
        id="input-name"
        placeholder="Введите имя" required minLength="2" maxLength="40"
        ref={nameRef}
      />
      <span className="error" id="input-name-error"></span>
      <input
        type="text"
        className="popup__input popup__input_type_info"
        name="link"
        id="input-info"
        placeholder="Ваши интересы" required minLength="2" maxLength="200"
        ref={linkRef}
      />
      <span className="error" id="input-info-error"></span>
      <button className="popup__button-submit" type="submit">Создать</button></PopupWithForm>
  )
}

export default AddPlacePopup