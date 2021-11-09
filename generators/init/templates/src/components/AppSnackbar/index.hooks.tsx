import { useSelector } from "react-redux";
import { selectors } from "redux-store";

export const useAppSnackbar = () => {
  const open = useSelector(selectors.getFeedbackOpen);
  const type = useSelector(selectors.getFeedbackType);
  const message = useSelector(selectors.getFeedbackMessage);

  return {
    open,
    type,
    message,
  };
};
