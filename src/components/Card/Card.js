import './Card.scss'

export default function Card(props) {
    const {card} = props;
    console.log(card.title)
    return (
        <>

            <div className="card card-item">
                {/* {card.img &&
                    <img className='card-cover' src={card.img}
                        onMouseDown={event => event.preventDefault()}
                    />
                } */}
                <p>{card.title}test</p>
            </div>

        </>

    )
}