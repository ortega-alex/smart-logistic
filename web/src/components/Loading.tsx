export const Loading = () => {
    return (
        <div className='lds-container'>
            <div className='lds-ripple'>
                <div />
                <div />
            </div>
        </div>
    );
};

export const Loader = () => <span className='loader'></span>;
