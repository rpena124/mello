import './Column.scss'
import Card from '../Card/Card'
import { mapOrder } from '../../utilities/sorts';

export default function Column(props) {

    const {column} = props;
    const cards = column.cards;
    
    return (
        <>
            <div className="column">
                <header>{column.title}</header>
                <ul className="list  card-list">
                    {cards && cards.length > 0 && cards.map((card, index)=>{
                        return(
                            <Card 
                                key={card.id}
                                card={card}
                            />
                        )
                    })}
                </ul>
                <footer>Add another card</footer>
            </div>
        </>
    )

}