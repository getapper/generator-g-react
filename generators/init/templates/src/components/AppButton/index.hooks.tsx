import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

export const useAppButton = (path: string, onClick?: any) => {
  const dispatch = useDispatch();

  const onButtonClicked = useMemo(
    () => (path ? () => dispatch(push(path)) : onClick),
    [dispatch, path, onClick],
  );

  return {
    onButtonClicked,
  };
};
