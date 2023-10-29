import Image from 'next/image'
import classes from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={classes.root}>
      <Image src="/img/logo_pix.png" alt="Code Pix" />
    </footer>
  )
}

export default Footer
