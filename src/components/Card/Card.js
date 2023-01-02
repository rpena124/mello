import './Card.scss'

export default function Card(props) {
    const {card} = props;

    return (
        <>

            <li className="card card-item">
                {card.img &&
                    <img className='card-cover' src={card.img} />
                }
                {card.title}
            </li>

        </>

    )
}