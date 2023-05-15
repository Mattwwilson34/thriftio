import styles from './accordian-wrapper.module.scss'

interface AccordianWrapperProps {
  children: React.ReactNode
  open: boolean
}

function AccordianWrapper({
  children,
  open,
}: AccordianWrapperProps): JSX.Element {
  return (
    <div
      className={
        open
          ? `${styles.accordianWrapper} ${styles.open}`
          : styles.accordianWrapper
      }
    >
      <div className={styles.accordianContainer}>{children}</div>
    </div>
  )
}

export default AccordianWrapper
