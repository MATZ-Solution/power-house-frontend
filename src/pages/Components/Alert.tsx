import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);
export const alertSuccess = (message: string) => {
    MySwal.fire({
        title: message,
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        showCloseButton: true,
        customClass: {
            popup: `color-success`,
        },
    });
};

export const alertFail = (message: any) => {
    MySwal.fire({
        title: message,
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        showCloseButton: true,
        customClass: {
            popup: `color-danger`,
        },
    });
};

export const alertInfo = (message: any) => {
    Swal.fire({
        icon: 'error',
        title: message === 'Please Select City First' ? 'City Selection' : 'Wrong File',
        text: message,
        padding: '2em',
        customClass: 'sweet-alerts',
    });
};

export default { alertSuccess, alertFail, alertInfo};
