import { Route, Routes } from 'react-router-dom';

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const RoutesWithNotFound: React.FC<Props> = ({ children }) => {
    return (
        <Routes>
            {children}
            <Route
                path='*'
                element={
                    <div className='h-100'>
                        <div className='flex flex-column justify-center items-center h-100'>
                            <h1>404</h1>
                            <p>Page not found</p>
                        </div>
                    </div>
                }
            />
        </Routes>
    );
};
