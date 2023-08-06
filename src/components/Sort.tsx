import React, { ReactEventHandler, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSort } from '../redux/slices/filterSlice';

interface ISortList {
    name: string,
    sortProperty: string
}

export const sortList: ISortList[] = [
    { name: 'популярности (ASC)', sortProperty: 'rating' },
    { name: 'популярности (DESC)', sortProperty: '-rating' },
    { name: 'цене (ASC)', sortProperty: 'price' },
    { name: 'цене (DESC)', sortProperty: '-price' },
    { name: 'алфавиту (А-Я)', sortProperty: 'name' },
    { name: 'алфавиту (Я-А)', sortProperty: '-name' },
]

const Sort = () => {
    const dispatch = useDispatch();
    const sort = useSelector(state => state.filter.sort)

    const [open, setOpen] = useState(false);
    const sortRef = useRef<HTMLDivElement>(null);

    const handleActiveItems = (i: ISortList) => {
        dispatch(setSort(i));
        setOpen(false)
    }

    useEffect(() => {
        const setHidePopup = (event: any) => {
            if (!event.composedPath().includes(sortRef.current)) {
                setOpen(false)
            }
        }

        document.body.addEventListener('click', setHidePopup)
        return () => document.body.removeEventListener('click', setHidePopup)
    }, [])

    return (
        <div ref={sortRef} className="sort">
            <div className="sort__label">
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span onClick={() => setOpen(!open)}>{sort.name}</span>
            </div>
            {open && (
                <div className="sort__popup">
                    <ul>
                        {sortList.map((list, i) => {
                            return (
                                <li key={i}
                                    className={sort.sortProperty === list.sortProperty ? "active" : ''}
                                    onClick={() => handleActiveItems(list)}
                                >{list.name}</li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Sort