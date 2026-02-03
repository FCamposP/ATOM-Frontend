import Swal from "sweetalert2";
import { IResponseWrapperDTO } from '../models/interfaces/responseWrapperDTO';

export function ResposeHandler(response: any ) {
    var result: any

    if(response?.Success){
        result=response.Result;
    }else{
        if(response.Message.includes('SOAP')){
            Swal.fire({position: 'top-end',icon: 'info',title:'',text: 'Error en comunicación con Sistema CORE. Intente nuevamente.',showConfirmButton: false,timer: 5000,toast: true});
        }else{
            Swal.fire({position: 'top-end',icon: 'info',title:'',text: response.Message,showConfirmButton: false,timer: 3500,toast: true});
        }
    }
    return result;
  }
