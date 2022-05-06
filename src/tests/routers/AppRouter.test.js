import AppRouter from "../../routers/AppRouter";
import { mount } from 'enzyme'
import { AuthContext } from "../../auth/authContext";

describe('Pruebas con <AppRouter  />', ()  => {

    test('mostrar login si el user no esta autenticado', () => {

        const contextValue = {
            user: {
                logged: false
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('h1').text().trim() ).toBe( 'LoginScreen' )

    })

    test('mostrar login si el componente de Marvel si esta autenticado', () => {
        
        const contextValue = {
            user: {
                logged: true,
                name: 'Joseph'
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={ contextValue }>
                <AppRouter />
            </AuthContext.Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.navbar').exists() ).toBeTruthy();

    })


})