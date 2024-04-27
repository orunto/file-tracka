'use client'
import Button from "../atoms/Button"
import styles from '@/components/molecules/layout.module.scss'

export default function TablesToggle () {
    return (
        <div className={styles.TablesToggle}>
            <div className="flex">
                <Button onclick="">Assigned</Button>

                <Button onclick="">Completed</Button>

                <Button onclick="">Returned</Button>

            </div>

            <hr />
        </div>
    )
}