import React from 'react'
import Swal from 'sweetalert2';
import HoldOn from './react-hold-on';

const setLoading = () => {
    HoldOn.open({
         theme: "sk-bounce",
         idElement: "root-app-react-hold"
    });
}

const quitLoading = () => {
    HoldOn.close();
}
const showSuccess = (message?: string) => {
    Swal.fire({
        text: message || 'Accion realizada exitosamente',
        icon: "success",
        title: "",
        showCancelButton: false,
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
        timerProgressBar: true,
        timer: 5000,
    });
}

const showError = (message?: string) => {
    Swal.fire({
        title: "",
        text: message || "Se ha producido un error",
        icon: "error",
        showCancelButton: false,
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
        timerProgressBar: true,
        timer: 5000,
    });
}

const confirm = (message: string, callback: () => void) => {
    Swal.fire({
        title: "",
        text: message,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
    }).then(async confirm => {
        if (confirm.value) {
            callback();
        }
    });
}
const formatMiles = (number: number, decimals = true) => {
    let n: number | string = number
    let t: undefined | string,
        d: undefined | string,
        j: number
    t = t === undefined ? "." : t
    d = d === undefined ? "," : d
    let c: number = decimals ? 2 : 0,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c)))
    j = (j = i.length) > 3 ? j % 3 : 0;
    
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(parseFloat(n) - parseFloat(i)).toFixed(c).slice(2) : "");
}
const useWindowSize = () => {
    const [size, setSize] = React.useState([0, 0]);
    React.useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}
export {
    useWindowSize,
    formatMiles,
    setLoading,
    quitLoading,
    showSuccess,
    showError,
    confirm
}