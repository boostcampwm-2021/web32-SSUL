import { toast } from 'react-toastify';
import { ToastMessageEnum } from '@constants/enums';

type ToastHookReturnType = [(message: string, type?: ToastMessageEnum | string) => void];

export function useToast(): ToastHookReturnType {
  const notify = (message: string, type?: ToastMessageEnum | string) => {
    switch (type) {
      case ToastMessageEnum.INFO:
        toast.info(message);
        break;
      case ToastMessageEnum.SUCCESS:
        toast.success(message);
        break;
      case ToastMessageEnum.WARNING:
        toast.warning(message);
        break;
      case ToastMessageEnum.ERROR:
        toast.error(message);
        break;
      default:
        toast.info(message);
        break;
    }
  };
  return [notify];
}
