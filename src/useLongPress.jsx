import useEventListener from "./hooks/useEventListener/useEventListener"
import useTimeout from "./hooks/useTimeout/useTimeout"
import useEffectOnce from "./hooks/useEffectOnce/useEffectOnce"

export default function useLongPress(ref, cb, { delay = 1500 } = {}) {
    const { reset, clear } = useTimeout(cb, delay)
    useEffectOnce(clear)
    useEventListener("mousedown", reset, ref.current)
    useEventListener("touchstart", reset, ref.current)
    useEventListener("mouseup", clear, ref.current)
    useEventListener("mouseleave", clear, ref.current)
    useEventListener("touchend", clear, ref.current)
}