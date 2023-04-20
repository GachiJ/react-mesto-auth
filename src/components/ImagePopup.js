function ImagePopup(props) {
  return (
    <>
      <div className={`popup popup_type_photo ${props.card.link ? 'popup_opened' : ''}`}>
        <div className="popup__container-image">
          <button className="popup__button-close" type="button" id="popup-photo-button-close" onClick={props.onClose}></button>
          <img className="popup__photo" src={props.card.link} alt="Фото" />
          <h3 className="popup__caption">{props.card.name}</h3>
        </div>
      </div>
    </>
  )
}

export default ImagePopup