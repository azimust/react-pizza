import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../../redux/slices/cartSlice'

interface IPizzaBlockProps {
    id: number,
    name: string,
    types: number[],
    image: string,
    price: number,
    sizes: number[]
}

const PizzaBlock = ({ image, name, price, id, sizes, types }: IPizzaBlockProps) => {
    const [activeType, setActiveType] = useState(0)
    const [activeSize, setActiveSize] = useState(0)
    const typePizza = ['тонкое', 'традиционное']

    const dispatch = useDispatch();
    const cartItem = useSelector(state => state.cart.items.find(obj => obj.id === id))

    const handleAddItem = () => {
        const item = {
            image,
            name,
            price,
            id,
            size: sizes[activeSize],
            type: typePizza[activeType]
        }
        dispatch(addItem(item))
    }

    const itemsCount = cartItem ? cartItem.count : 0

    return (
        <div className="pizza-block-wrapper">
            <div className="pizza-block" key={id}>
                <img className="pizza-block__image" src={image} alt="Pizza" />
                <h4 className="pizza-block__title">{name}</h4>
                <div className="pizza-block__selector">
                    <ul>
                        {types.map((type) => {
                            return <li key={type} onClick={() => setActiveType(type)} className={activeType === type ? 'active' : ''}>{typePizza[type]}</li>
                        })}
                    </ul>
                    <ul>
                        {sizes.map((size, i) => {
                            return <li key={i} onClick={() => setActiveSize(i)} className={activeSize === i ? 'active' : ''}>{size} см</li>
                        })}
                    </ul>
                </div>
                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">от {price} сом</div>
                    <button onClick={handleAddItem} className="button button--outline button--add">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z" fill="white"></path>
                        </svg>
                        <span>Добавить</span>
                        {itemsCount > 0 && <i>{itemsCount}</i>}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PizzaBlock