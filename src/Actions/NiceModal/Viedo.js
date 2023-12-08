import defaultPoster from "Media/Logo.png" 
const Index = ({ height="450px", hasPoster=true , poster=undefined , Video , loop=false , autoPlay=false , controls = true }) => {
    return (
        <video style={{height:height}} poster={hasPoster ? poster ?? defaultPoster : undefined} onContextMenu={(e)=>e.preventDefault()} controlsList="nodownload" autoPlay={autoPlay} loop={loop} controls={controls}>
            <source src={Video} type="video/mp4" />
            <source src={Video} type="video/avi" />
            <source src={Video} type="video/mov" />
            للأسف متصفحك لا يدعم هذه الصيغة
        </video>
    );
}

export default Index;