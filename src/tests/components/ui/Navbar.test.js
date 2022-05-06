import { MemoryRouter, Route, Routes } from "react-router-dom"
import { Navbar } from "../../../components/ui/Navbar"
import { mount } from 'enzyme'
import { AuthContext } from "../../../auth/authContext"
import { types } from "../../../types/types";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('Pruebas al <Navbar />', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            name: 'Joseph',
            logged: true
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <MemoryRouter initialEntries={ ['/'] }>
                <Routes>
                    <Route path="/" element={ <Navbar /> } />
                </Routes>
            </MemoryRouter>
        </AuthContext.Provider>
    )

    test('debe de mostrarse correctamente', () => {

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim() ).toBe('Joseph');

    })

    test('llamar el logout, el navigate y el dispatch con sus argumentos', () => {

        wrapper.find('button').prop('onClick')();

        expect( contextValue.dispatch ).toHaveBeenCalledWith({ 'type': types.logout });
        expect( mockNavigate ).toHaveBeenCalledWith( '/login', { replace: true } );
        
    })

})