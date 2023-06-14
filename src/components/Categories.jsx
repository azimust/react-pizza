import React, { useState } from 'react'

const categories = [
    {id: 0, title: 'Все'},
    {id: 1, title: 'Мясные'},
    {id: 2, title: 'Вегетарианские'},
    {id: 3, title: 'Гриль'},
    {id: 4, title: 'Острые'},
    {id: 5, title: 'Закрытые'},
]

const Categories = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="categories">
            <ul>
                {categories.map((v) => {
                    return <li key={v.id} onClick={() => setActiveIndex(v.id)} className={activeIndex === v.id ? "active" : 0}>{v.title}</li>
                })}
            </ul>
        </div>
    )
}

export default Categories