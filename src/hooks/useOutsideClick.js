import { useEffect, useRef } from "react";

function useOutsideClick(handler, listenCapture = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }
      document.addEventListener("click", handleClick, listenCapture);
      // events bubble up the dom tree,
      //so changing the default behaviour to listening on events moving down the tree, that is capturing phase
      return () =>
        document.removeEventListener("click", handleClick, listenCapture);
    },
    [handler, listenCapture]
  );

  return ref;
}

export default useOutsideClick;
