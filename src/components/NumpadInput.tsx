import { useState, useEffect } from "react";
import styles from "./NumpadInput.module.css";

function NumpadInput() {
    const [numpad, setNumpad] = useState("");

    //capture keystorkes
    const handleKeyDown = (numpad: KeyboardEvent) => {
        console.log("Key pressed:", numpad.key);
        setNumpad(() => numpad.key);
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <>
            <h2 className={styles.numpad_text}>{numpad}</h2>
        </>
    );
}

export default NumpadInput;
