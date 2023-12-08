import { Tabs } from 'antd';
import Tab1 from "./Tab1"
import Tab2 from "./Tab2"

const Index = ({ user , query }) => {

    const items = [
        {
            key: '1',
            label: 'تغيير البيانات الأساسية',
            children: <Tab1 User={user} query={query}/>,
        },
        {
            key: '2',
            label: 'تغيير كلمة المرور',
            children: <Tab2 User={user} query={query}/>,
        },
    ];
    return (
        <Tabs defaultActiveKey="1" type="card" items={items} onChange={()=>{}} />
    );
}

export default Index;
