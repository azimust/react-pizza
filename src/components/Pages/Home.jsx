import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import Categories from '../Categories';
import PizzaBlock from '../PizzaBlock';
import Skeleton from '../PizzaBlock/Skeleton';
import Sort, { sortList } from '../Sort';
import Pagination from '../Pagination';
import { SearchContext } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../../redux/slices/filterSlice';
import axios from 'axios';
import qs from 'qs'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const { sort, categoryId, page } = useSelector(state => state.filter)

    const { searchValue } = useContext(SearchContext);

    const [pizzas, setPizzas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleCategory = useCallback((idx) => {
        dispatch(setCategoryId(idx))
    }, [])

    const handlePage = page => {
        dispatch(setCurrentPage(page))
    }

    const fetchPizzas = () => {
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
    }

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                page
            })

            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sort.sortProperty, page])

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)

            dispatch(
                setFilters({
                    ...params,
                    sort
                })
            )
            isSearch.current = true
        }
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)

        if (!isSearch.current) {
            fetchPizzas()
        }
        isSearch.current = false
    }, [categoryId, sort.sortProperty, searchValue, page])

    return (
        <div className='container'>
            <div className="content__top">
                <Categories categoryId={categoryId} handleCategory={handleCategory} />
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