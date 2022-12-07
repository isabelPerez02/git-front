import "./Header.css"
import logo from '../../assets/img/Netflix2.jpg'
import { TopMenu } from '../menu/TopMenu'


export const Header = () => {
    return (
        <div>
            <div className="flex text-center">
            <img className='logo' src={logo} alt ="logo"/>
            <h1>Bienvenido</h1>
            </div>
            
            <TopMenu/>
        </div>
    )
}