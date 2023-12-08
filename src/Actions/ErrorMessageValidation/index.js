import "./index.css"
const Index = ({ message , ...props }) => {
    return (
        <div className='ErrorMessageValidation w-100'>
            <small>{message}</small>
        </div>
    );
}

export default Index;
