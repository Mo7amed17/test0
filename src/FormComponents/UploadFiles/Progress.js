import Modal from "Actions/NiceModal/AntdModal"
import { Progress } from "antd";
import { Badge } from "reactstrap";

const UploadingProgress = ({ uploaded , showModal , message }) => {
    return (
            <Modal
            Com={<div>
                <h6>{message}</h6>
                <Progress percent={uploaded} status="active" />
                <small className="text-primary d-block">وقت الرفع يعتمد على سرعة الإنترنت الخاص بك</small>
            </div>}
            initialShow={showModal}
            noClose={true}
            header={<Badge color="danger">لا تغلق الصفحة</Badge>}
        />
    );
}

export default UploadingProgress;
