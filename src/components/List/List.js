import './List.scss'
import Card from '../Card/Card'
import { mapOrder } from '../../utilities/sorts';
import { Container, Draggable } from 'rosa-react-smooth-dnd';
import sendRequest from '../../utilities/send-request'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function List({
    list, 
    onCardDrop, 
    deleteList 
}) {

    const params = useParams()
    const currentListId = params.id

    // const cards = list.card;
    const [cards, setCards] = useState([])
    const [newCard, setNewCard] = useState([])
    const [foundList, setFoundList] = useState({})

        //index
        const getCards = async () => {
            try {
                const response = await sendRequest('/api/cards')
                setCards(response)
            } catch (error) {
                console.error(error)
            }
        }

          // create
    const createCard = async (listId) => {
        const body = { ...newCard}
        try {
            const response = await sendRequest(`/api/cards/${listId}`, 'POST', body)
            const cardCopy = [response, ...cards]
            setCards(cardCopy)
            setNewCard({
                title: '',
                description:''
            })

        } catch (error) {
            console.error(error)
        } 
        // finally {
        //    props.showBoard(props.boardId)
        // }
    }



    useEffect(() => {
        
    }, [])

    return (
        <>
            <div className="column">
                <header className='column-drag-handle'>{list.title}
                <button onclick={() => deleteList(list._id)}>delete</button>
                </header>
                <div className="list  card-list">
                    <Container
                        groupName="col"
                        onDrop={(dropResult) => onCardDrop(dropResult, list._id)}
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

                        {list.card && list.card.length > 0 && list.card.map((card, index) => {
                            return (
                                <Draggable key={card._id}>
                                    <Card card={card} />
                                </Draggable>
                            )
                        })}
                    </Container>
                </div>

                <footer className='footer'>
                    <div className='footer-action'>
                        <i className='fa fa-plus icon'>
                        <input
                            type="text"
                            className="form-input"
                            value={newCard.title}
                            onChange={(e) => {
                                setNewCard({ ...newCard, title: e.target.value })
                            }}
                            onKeyDown={(e) => {
                                e.key === 'Enter' && createCard(list._id)
                            }}
                        >
                        </input>
                        </i><br />
                    </div>
                </footer>

            </div>
        </>
    )

}