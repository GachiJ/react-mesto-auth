import PopupWithForm from "./PopupWithForm"
import React from 'react';

function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {
  const refInput = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    
    onUpdateAvatar({
      avatar: refInput.current.value,
    });
  }


return(
  <PopupWithForm
    name='edit_avatar'
    title='Обновить аватар'
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    >
    <input type="url" 
    className="popup__input popup__input_avatar_url"
    ref={refInput} 
    name="avatar" id="input-avatar-url"
      placeholder="Ссылка на картинку" required pattern="https?://.+" />
    <span className="error" id="input-avatar-url-error"></span>
    <button className="popup__button-submit" type="submit">Сохранить</button></PopupWithForm>
)
}

export default EditAvatarPopup;