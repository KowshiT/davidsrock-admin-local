import { createContext, useState, PropsWithChildren } from 'react';
import { alertValuesInit } from '../../actionLayer/_index';
import Alert from '../../components/Alerts/Alert';
import { alertValues } from '../../types/types';


export type AlertProps = {};
interface AlertCtxInterface {
    alertContext: alertValues;
    setAlertContext: Function;
}

const AlertContext = createContext<AlertCtxInterface>({
    alertContext: alertValuesInit,
    setAlertContext: () => {}
});

const AlertContextProvider = (props : PropsWithChildren<AlertProps>) => {
    const [alertContext,setAlertContext] = useState({
        message: "",
        severity: "",
        show: false
    })
    return (
      <AlertContext.Provider value={{ alertContext, setAlertContext }}>
        <Alert message={alertContext.message} severity={alertContext.severity} show={alertContext.show}/>
        {props.children}
      </AlertContext.Provider>
    );
  };

export { AlertContext };
export default AlertContextProvider;