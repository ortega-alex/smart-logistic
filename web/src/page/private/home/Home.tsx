import { IconEnun } from '@/components';
import { privateRoutes } from '@/constants';
import { Menu } from '@/interfaces';
import { RootState } from '@/redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const Home = () => {
    const deviceState: Boolean = useSelector((store: RootState) => store.device);
    const menuState: Array<Menu> = useSelector((store: RootState) => store.menu);

    const handleRenderMenu = () => {
        const menus = menuState.filter(item => item.is_main_menu);
        let start = 0;
        let end = deviceState ? 4 : 5;
        let length = menus.length;

        return [1, 2, 3].map(item => {
            if (item === 2) {
                start = deviceState ? 4 : 5;
                end = deviceState ? 7 : 9;
                if (length % 2 === 0 && length < end) end = length - 1;
            }

            if (item === 3) {
                start = deviceState ? 7 : -1;
                end = deviceState ? 9 : -1;
                if (length % 2 === 0 && length < end) end = length - 1;
            }

            if (start === -1 || end === -1) return null;
            return (
                <div className={`flex ${item > 1 ? 'menu-bottom' : ''}`} key={item}>
                    {menus.slice(start, end).map(menu => (
                        <Link to={`/${privateRoutes.PRIVATE}/${menu.path}`} replace={true} key={menu.id} style={{ textDecoration: 'none' }}>
                            <div className='hex-container zoom'>
                                <div className='hex-border'>
                                    <div className='hex-button '>
                                        {!deviceState && <span style={{ fontSize: '1.5dvh' }}>{menu.name}</span>}
                                        {IconEnun[menu.icon]}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            );
        });
    };

    return (
        <div className='h-100 bg-secondary text-danger flex flex-1 justify-center items-center flex-column'>
            <h1>Bienvenido</h1>
            {handleRenderMenu()}
        </div>
    );
};
