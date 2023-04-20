function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <>
      <article className="card" key={props._id}>
        <button type="button" className="card__delete-button"></button>
        <img className="card__photo" alt={props.name} src={props.link} onClick={handleClick} />
        <div className="card__panel">
          <h2 className="card__title">{props.name}</h2>
          <div className="card__like-container">
            <button className="card__like-button" type="button" aria-label="Мне нравится"></button>
            <p className="card__like-number">{props.likes.length}</p>
          </div>
        </div>
      </article>
    </>
  )
}

export default Card