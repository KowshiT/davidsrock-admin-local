import { useContext } from "react";
import { AlertContext } from "../contexts/alertContext/alertContext";
export interface setAlertTypes {
	message: any;
    severity: any;
}

export const useAlerts = () =>{
    const {setAlertContext} = useContext(AlertContext);
    return {
        setAlert: (alert:setAlertTypes) => {
            setAlertContext({
                show: true,
                message: alert.message,
                severity: alert.severity
            });
            try{  
            } catch(e) {
                console.error(e);
            }
        }
    }
}