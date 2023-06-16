import React, { useEffect, useState } from 'react'
import Categories from '../Categories';
import PizzaBlock from '../PizzaBlock';
import Skeleton from '../PizzaBlock/Skeleton';
import Sort from '../Sort';

const Home = () => {
    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [selected, setSelected] = useState({
        name: 'популярности', sortProperty: 'rating'
    });


    useEffect(() => {
        setIsLoading(true)
        fetch(`https://648b18e717f1536d65ea596a.mockapi.io/items?${categoryId > 0 ? `category=${categoryId}` : ''}&sortBy=${selected.sortProperty.replace('-', '')}&order=${selected.sortProperty.includes('-') ? 'desc' : 'asc'}`)
            .then(res => res.json())
            .then(arr => {
                setPizzas(arr)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, selected])

    return (
        <div className='container'>
            <div className="content__top">
                <Categories categoryId={categoryId} handleCategory={(id) => setCategoryId(id)}/>
                <Sort selected={selected} handleSelected={(id) => setSelected(id)}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(8)].map((_, i) => <Skeleton key={i} />)
                    : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} image={pizza.imageUrl} />)}
            </div>
        </div>
    )
}

export default Home