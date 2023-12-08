import "./index.css"
const Index = ({ onSubmit , text , onClick , type = "button" , icon , color , textColor = "white" , border , borderRadius }) => {
    return (
        <div className="FormButton">
            <button
            type={type}
            style={{ backgroundColor:color , color:textColor , border:border , borderRadius:borderRadius}}
            onClick={onClick}
            onSubmit={onSubmit}
            >
                { text } { icon }
            </button>
        </div>
    );
}

export default Index;
