import React, { useRef, useEffect, useState, useImperativeHandle, Ref } from "react";
import BScroll from "better-scroll";
import "./index.scss";

interface scrollPropsTypes {
    handleScroll?: (pos: any) => void,
    children: any
}
interface RefObject {
  getBScroll: () => void
}
const Scroll = React.forwardRef(
  (props: scrollPropsTypes, ref?: Ref<RefObject>) => {
    const { children, handleScroll } = props;
    const [bscroll, setBscroll] = useState<any>(null);
    const scrollContaninerRef = useRef() as React.MutableRefObject<
      HTMLDivElement
    >;

    useEffect(() => {
      if(!bscroll) {
        const scroll = new BScroll(scrollContaninerRef.current, {
          scrollY: true,
          probeType: 3,
          click: true,
          bounce:{
            top: true,
            bottom: true
          }
        });
        setBscroll(scroll);
        handleScroll && scroll.on('scroll', handleScroll);
      }
      return () => {
        setBscroll(null);
      }
      // eslint-disable-next-line
      // eslint-disable-next-line
    }, []);

    useEffect(() => {
      if(bscroll){
        bscroll.refresh();
      }
    });

    useImperativeHandle(ref, () => ({
      getBScroll() {
        if(bscroll) {
          return bscroll;
        }
      }
    }))

    return (
      <div className="scroll-container" ref={scrollContaninerRef}>
        <div>{children}</div>
      </div>
    );
  }
);

export default Scroll;
