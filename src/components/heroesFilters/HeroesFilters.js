// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useSelector, useDispatch } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import { filtersFetching, filtersFetched, filtersFetchingError, activeFilterChanged } from "../../actions";
import { useEffect } from "react";
import Spinner from '../spinner/Spinner'

const HeroesFilters = () => {
    const dispatch = useDispatch();
    const {filters, filtersLoadingStatus} = useSelector(state => state);
    const {request} = useHttp();

    useEffect(() => {
        dispatch(filtersFetching());

        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()));
    }, [])

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Loading error</h5>
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Filters are not found</h5>
        }

        return arr.map(({name, className, label}) => {
            return <button
                        key={name} 
                        id={name}
                        className={`btn ${className}`}
                        onClick={() => dispatch(activeFilterChanged(name))}
                        >{label}</button>
        })
    }

    const elements = renderFilters(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Filter heroes by elemental powers</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;