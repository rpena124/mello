import './Column.scss'
import Card from '../Card/Card'
import { mapOrder } from '../../utilities/sorts';
import { Container, Draggable } from 'rosa-react-smooth-dnd';

export default function Column(props) {

    const { column, onCardDrop } = props;
    const cards = column.cards;


    return (
        <>
            <div className="column">
                <header className='column-drag-handle'>{column.title}</header>
                <div className="list  card-list">
                    <Container
                        groupName="col"
                        onDrop={(dropResult) => onCardDrop(dropResult, column.id)}
                        getChildPayload={index => cards[index]}
                        dragClass="card-ghost"
                        dropClass="card-ghost-drop"

                        dropPlaceholder={{
                            animationDuration: 150,
                            showOnTop: true,
                            className: 'card-drop-preview'
                        }}
                        dropPlaceholderAnimationDuration={200}
                    >

                        {cards && cards.length > 0 && cards.map((card, index) => {
                            return (
                                <Draggable key={card.id}>
                                    <Card card={card} />
                                </Draggable>
                            )
                        })}
                    </Container>
                </div>

                <footer className='footer'>
                    <div className='footer-action'>
                        <i className='fa fa-plus icon'></i>Add another card
                    </div>
                </footer>

            </div>
        </>
    )

}