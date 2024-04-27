'use client'
import { useState } from "react"
import Button from "../atoms/Button"
import styles from '@/components/molecules/layout.module.scss'

interface props {
    buttoncolor: any,
    clickeventone: any,
    clickeventtwo: any,
    clickeventthree: any,
    clickeventfour: any,
    buttonone: any,
    buttontwo: any,
    buttonthree: any,
    buttonfour: any,
    line: any
}

export default function TablesToggle (props: props) {
    const [buttonColor, setButtonColor] = useState("button_one")
    const [line, setLine] = useState("0%")
    return (
        <div className={styles.TablesToggle} id={styles[props.buttoncolor]}>
            <div>
                <div>
                    <Button onclick={props.clickeventone}>{props.buttonone}</Button>

                    <Button onclick={props.clickeventtwo}>{props.buttontwo}</Button>

                    <Button onclick={props.clickeventthree}>{props.buttonthree}</Button>

                    <Button onclick={props.clickeventfour}>{props.buttonfour}</Button>

                </div>

                <hr style={{ translate: props.line}}/>
            </div>
        </div>
    )
}