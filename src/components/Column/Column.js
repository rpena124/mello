import './Column.scss'
import Card from '../Card/Card'
import { mapOrder } from '../../utilities/sorts';
import { Container, Draggable } from 'react-smooth-dnd';

export default function Column(props) {

    const { column } = props;
    const cards = column.cards;

    const onCardDrop = (dropResult) => {
        console.log(">>>>>inside onCardDrop", dropResult)
    }

    return (
        <>
            <div className="column">
                <header className='column-drag-handle'>{column.title}</header>
                <div className="list  card-list">
                    <Container
                        groupName="col"
                        onDrop={e => this.onCardDrop(column.id, e)}
                        getChildPayload={index =>cards[index]}
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
                <footer>Add another card</footer>
            </div>
        </>
    )

}