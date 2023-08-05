const categories = [
    { id: 0, title: 'Все' },
    { id: 1, title: 'Мясные' },
    { id: 2, title: 'Вегетарианские' },
    { id: 3, title: 'Гриль' },
    { id: 4, title: 'Острые' },
    { id: 5, title: 'Закрытые' },
]

interface ICategoryProps {
    categoryId: number,
    handleCategory: (id: number) => void
}

const Categories = ({ categoryId, handleCategory }: ICategoryProps) => {
    return (
        <div className="categories">
            <ul>
                {categories.map((v) => {
                    return <li key={v.id} onClick={() => handleCategory(v.id)} className={categoryId === v.id ? "active" : ''}>{v.title}</li>
                })}
            </ul>
        </div>
    )
}

export default Categories