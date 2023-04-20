function PopupWithForm(props) {
  return (
    <>
      <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <button className="popup__button-close" type="button" aria-label="Закрытие попапа"
            id="popup-edit-button-close" onClick={props.onClose}></button>
          <form className="popup__form" name="profile-form" id={props.name} noValidate>
            <h2 className="popup__title">{props.title}</h2>
            {props.children}
          </form>
        </div>
      </div>
    </>
  )
}

export default PopupWithForm