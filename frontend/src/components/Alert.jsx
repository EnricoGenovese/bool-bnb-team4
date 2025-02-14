
import { useGlobalContext } from "../contexts/GlobalContext";
export default function Alert() {

    const { alertData, setAlertData } = useGlobalContext();
    const { type, message } = alertData;

    if (!message) return null;

    return (
        <div className={`alert alert-${type} alert-dismissible`} role="alert">
            <div>{message}</div>
            <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={() => setAlertData({ type: "", message: "" })}
            ></button>
        </div>
    );
}