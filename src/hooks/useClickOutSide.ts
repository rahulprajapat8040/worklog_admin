import { useEffect } from "react";

type Props = {
  ref: React.RefObject<HTMLElement | null>;
  handler: () => void;
  enabled?: boolean;
};

const useClickOutSide = ({ ref, handler, enabled = true }: Props) => {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler, enabled]);
};

export default useClickOutSide;
