import { FaYoutube ,FaWhatsapp ,FaInstagram, FaTelegram, FaTiktok} from "react-icons/fa"
import "Styles/Footer.css"
const index = () => {
    let date = new Date();
let year = date.getFullYear().toString();
let arabicYear = '';

const numbers = {
    '0': '٠',
    '1': '١',
    '2': '٢',
    '3': '٣',
    '4': '٤',
    '5': '٥',
    '6': '٦',
    '7': '٧',
    '8': '٨',
    '9': '٩'
};
for (let i = 0; i < year.length; i++) {
    if (numbers.hasOwnProperty(year[i])) {
        arabicYear += numbers[year[i]];
    } else {
        arabicYear += year[i];
    }
}
    return (
        <footer>
            <div className="Top">
                <h2 className="mb-3">كــن على تواصل</h2>
                <div className="Icons">
                    <a href="/" target="_blank"><FaInstagram size={36}/></a>
                    <a href="/" target="_blank"><FaYoutube size={36}/></a>
                    <a href="/" target="_blank"><FaTelegram size={36}/></a>
                    <a href="/" target="_blank"><FaTiktok size={36}/></a>
                    <a href="/" target="_blank"><FaWhatsapp size={36}/></a>
                </div>
            </div>
            <div className="Down">
                <h6 className="text-white mt-5 text-center">جميع الحقوق محفوظة لجامعة دمنهور {arabicYear}@</h6>
            </div>
        </footer>
    );
}

export default index;
