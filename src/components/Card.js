import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {

  const currentUser = useContext(CurrentUserContext);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  const isOwn = props.card.owner._id === currentUser._id;


  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `card__like-button ${isLiked && 'card__like-button_type_active'}` 
  );; 

  

  return (
    <>
      <article className="card" key={currentUser._id}>
       {isOwn && <button type='button' className="card__delete-button card__delete-button_active"  onClick={handleDeleteClick}  />}
        <img className="card__photo" alt={props.name} src={props.link} onClick={handleClick} />
        <div className="card__panel">
          <h2 className="card__title">{props.name}</h2>
          <div className="card__like-container">
            <button className={cardLikeButtonClassName} type="button" aria-label="Мне нравится" onClick={handleLikeClick}></button>
            <p className="card__like-number">{props.likes.length}</p>
          </div>
        </div>
      </article>
    </>
  )
}

export default Card