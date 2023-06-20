import React, { useContext, useEffect, useState } from 'react'
import Categories from '../Categories';
import PizzaBlock from '../PizzaBlock';
import Skeleton from '../PizzaBlock/Skeleton';
import Sort from '../Sort';
import Pagination from '../Pagination';
import { SearchContext } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../../redux/slices/filterSlice';
import axios from 'axios';


const Home = () => {
    const dispatch = useDispatch();

    const { sort, categoryId, page } = useSelector(state => state.filter)

    const { searchValue } = useContext(SearchContext);

    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handlePage = number => {
        dispatch(setCurrentPage(number))
    }

    useEffect(() => {
        setIsLoading(true)

        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'desc' : 'asc';
        const search = searchValue ? searchValue : '';

        axios.get(`https://648b18e717f1536d65ea596a.mockapi.io/items?page=${page}&limit=4&${category}&sortBy=${sortBy}&order=${order}&search=${search}`)
            .then(res => {
                setPizzas(res.data)
                setIsLoading(false)
            })

        window.scrollTo(0, 0)
    }, [categoryId, sort.sortProperty, searchValue, page])

    return (
        <div className='container'>
            <div className="content__top">
                <Categories categoryId={categoryId} handleCategory={(id) => dispatch(setCategoryId(id))} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(8)].map((_, i) => <Skeleton key={i} />)
                    : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} image={pizza.imageUrl} />)}
            </div>
            <Pagination page={page} handlePage={handlePage} />
        </div>
    )
}

export default Home