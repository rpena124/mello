import './Card.scss'

export default function Card(props) {
    const {card} = props;

    return (
        <>

            <div className="card card-item">
                {card.img &&
                    <img className='card-cover' src={card.img}
                        onMouseDown={event => event.preventDefault()}
                    />
                }
                {card.title}
            </div>

        </>

    )
}