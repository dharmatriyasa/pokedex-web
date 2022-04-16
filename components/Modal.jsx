/** @jsxRuntime classic /
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

const Modal = ({children, isOpen, modalBg}) => {

    const breakpoints = [0, 576];

    const mq = breakpoints.map(
        bp => `@media (min-width: ${bp}px)`
    );

    const modalStyle = ({isOpen, modalBg}) => css({
        position: 'fixed',
        height: '100vh',
        width: '100vw',
        zIndex: `${isOpen ? '65' : '-10'}`,
        background: `${modalBg === 'dark' ? '#000' : modalBg === 'light' ? '#FFF' : '#DA1A1F'}`,
        opacity: `${isOpen ? '1' : '0'}`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    });

    return isOpen? (
        <div css={modalStyle({isOpen, modalBg})}>
            {children}
        </div>
    ) : null;
}
 
export default Modal;