import React from 'react'

const categories = [
    { id: 0, title: 'Все' },
    { id: 1, title: 'Мясные' },
    { id: 2, title: 'Вегетарианские' },
    { id: 3, title: 'Гриль' },
    { id: 4, title: 'Острые' },
    { id: 5, title: 'Закрытые' },
]

const Categories = ({ categoryId, handleCategory }) => {
    return (
        <div className="categories">
            <ul>
                {categories.map((v) => {
                    return <li key={v.id} onClick={() => handleCategory(v.id)} className={categoryId === v.id ? "active" : 0}>{v.title}</li>
                })}
            </ul>
        </div>
    )
}

export default Categories