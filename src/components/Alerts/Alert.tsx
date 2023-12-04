import { Snackbar, Alert } from "@mui/material";
import { useContext } from "react";
import { AlertContext } from "../../contexts/alertContext/alertContext";

/**
 * Default Alert Component Based on Material Snackbar
 * and MuiAlert.
 */ 
export interface alertProps {
	message: any;
    severity: any;
    show: boolean;
}

const Alerts: React.FC<alertProps> = (props) => {
    const {alertContext, setAlertContext} = useContext(AlertContext);
    const handleAlertClose = () => {
        setAlertContext({
            ...alertContext,
            show: false
        })
    };

    return (
        <Snackbar 
            open={alertContext.show} 
            autoHideDuration={2500} 
            anchorOrigin={{vertical:'top', horizontal:'right'}}
            onClose={handleAlertClose}>
            <Alert elevation={6} variant="filled" severity={alertContext.severity||'success'}>
                {alertContext.message}
            </Alert>
        </Snackbar>
    )
}

export default Alerts;
