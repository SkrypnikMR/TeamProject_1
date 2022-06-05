import { useCallback, useState } from 'react';

type Action = () => void;

type UseModal = [boolean, Action, Action, Action];

export function useModal(defaultValue: boolean): UseModal {
  const [visible, setVisible] = useState(defaultValue);

  const toggle = useCallback(() => {
    setVisible((prevVisible) => !prevVisible);
  }, []);

  const show = useCallback(() => setVisible(true), []);
  const hide = useCallback(() => setVisible(false), []);

  return [visible, toggle, show, hide];
}
