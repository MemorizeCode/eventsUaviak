import { ReactNode } from "react";
import style from "./Flex.module.css"
interface FlexProps {
    children: ReactNode,
    justifyContent?: boolean
    className?:string
}



const Flex = ({children, justifyContent = false, className}: FlexProps) => {
    return (<div className={`${style.flex} ${justifyContent && style.justifyContent} ${className}`}>{children}</div>);
}
 
export default Flex;