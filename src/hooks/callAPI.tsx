import { useEffect, useState } from "react";

export const callAPI = (func: Function, setState: Function) => {
  setState({response:null,loading:true,error:null});
  func()
    .then((res: any) => {
      setState({response:res,loading:false,error:null});
      console.log("CALLAPI_DATA :", res);
    })
    .catch((err: any) => {
      setState({response:null,loading:false,error:err});
      console.log("CALLAPI_ERROR :", err);
    });
};
