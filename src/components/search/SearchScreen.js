import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string'
import { useForm } from '../../hook/useForm'
import { getHeroesByName } from '../../selectors/getHeroesByName';
import HeroCard from '../hero/HeroCard';
import { useMemo } from 'react';

const SearchScreen = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse(location.search);

  const [ formValues, handleInputChange ] = useForm({
    searchText: q
  })

  const { searchText } = formValues;
  const heroesFileted = useMemo( () => getHeroesByName( q ), [ q ] );

  const handleSearch = (e) => {
    e.preventDefault();
    navigate( `?q=${ searchText }` );
  }

  return (
    <>
      <h1>Búsquedas</h1>
      <hr />

      <div className='row'>

        <div className='col-5'>

          <h4>Buscador</h4>
          <hr />

          <form onSubmit={ handleSearch }>

            <input 
              type='text'
              placeholder='Busca un heroe'
              className='form-control'
              name='searchText'
              autoComplete='off'
              value={ searchText }
              onChange={ handleInputChange }
            />

            <button
              className='btn btn-outline-dark mt-3'
              type='submit'
            >
              Buscar...
            </button>

          </form>

        </div>

        <div>

          <h4>Resultados</h4>
          <hr />

          {
            (q === '')
              ? <div className='alert alert-info'>Buscar un heroe</div>
              : ( heroesFileted.length === 0 )
                && <div className='alert alert-danger'>No hay resultados: { q } </div>
          }

          {
            heroesFileted.map( hero => (
              <HeroCard
                key={ hero.id } 
                { ...hero }
              />
            ))
          }

        </div>

      </div>
                
    </>
  )
}

export default SearchScreen