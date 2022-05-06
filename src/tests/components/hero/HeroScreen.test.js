import { MemoryRouter, Route, Routes } from "react-router-dom"
import { mount } from 'enzyme'
import Hero from "../../../components/hero/HeroScreen";


const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('Pruebas al <HeroScreen />', () => {

    test('no debe de mostrar el HeroScreen si no hay un heroe en el URL', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero'] }>
                <Routes>
                    <Route path="/hero" element={ <Hero />}></Route>
                    <Route path="/" element={ <h1>No Hero Pages</h1> }></Route>
                </Routes>
            </MemoryRouter>
        )

        expect( wrapper.find('h1').text().trim() ).toBe('No Hero Pages');

    });

    test('si el parametro existe y se encuentra entonces mostar el hero', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero/marvel-spider'] }>
                <Routes>
                    <Route path="/hero/:heroeId" element={ <Hero />}></Route>
                    <Route path="/" element={ <h1>No Hero Pages</h1> }></Route>
                </Routes>
            </MemoryRouter>
        )

        expect( wrapper.find('.row').exists() ).toBe(true);

    })

    test('regresar a la pantalla anterior', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero/marvel-spider'] }>
                <Routes>
                    <Route path="/hero/:heroeId" element={ <Hero />}></Route>
                </Routes>
            </MemoryRouter>
        )

        wrapper.find('button').prop('onClick')();
        expect( mockNavigate ).toHaveBeenCalledWith(-1);
    })

    test('mostrar el No Hero Page si no hay un heroe', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero/marvel-spider123456789'] }>
                <Routes>
                    <Route path="/hero/:heroeId" element={ <Hero />}></Route>
                    <Route path="/" element={ <h1>No Hero Pages</h1> }></Route>
                </Routes>
            </MemoryRouter>
        )

        expect( wrapper.text() ).toBe('No Hero Pages');

    })

})
