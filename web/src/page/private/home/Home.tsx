import { IconEnun } from '@/components';
import { Menu, privateRoutes } from '@/models';
import { RootState } from '@/redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const Home = () => {
    const deviceState: Boolean = useSelector((store: RootState) => store.device);
    const menuState: Array<Menu> = useSelector((store: RootState) => store.menu);

    return (
        <div className='h-100 bg-secondary text-danger flex flex-1 justify-center items-center flex-column'>
            <h1>Bienvenido</h1>
            {[1, 2, 3].map(item => {
                let inicio = 0;
                let final = deviceState ? 4 : 5;
                let length = menuState.length;

                if (item === 2) {
                    inicio = deviceState ? 4 : 5;
                    final = deviceState ? 7 : 9;
                    if (length % 2 === 0 && length < final) final = length - 1;
                }

                if (item === 3) {
                    inicio = deviceState ? 7 : -1;
                    final = deviceState ? 9 : -1;
                    if (length % 2 === 0 && length < final) final = length - 1;
                }

                if (inicio === -1 || final === -1) return null;
                return (
                    <div className={`flex ${item > 1 ? 'menu-bottom' : ''}`} key={item}>
                        {menuState.slice(inicio, final).map(menu => (
                            <Link
                                to={`/${privateRoutes.PRIVATE}/${menu.path}`}
                                replace={true}
                                key={menu.id_menu}
                                style={{ textDecoration: 'none' }}
                            >
                                <div className='hex-container zoom'>
                                    <div className='hex-border'>
                                        <div className='hex-button '>
                                            {!deviceState && <span style={{ fontSize: '1.5dvh' }}>{menu.menu}</span>}
                                            {IconEnun[menu.icon]}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                );
            })}
        </div>
    );
};
