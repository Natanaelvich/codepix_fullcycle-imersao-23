import Image from "next/image";
import classes from "./Footer.module.scss";

type Props = {
  children: React.ReactNode;
};

const Footer = (props: Props) => {
  return (
    <footer className={classes.root}>
      <Image src="/img/logo_pix.png" alt="Code Pix" />
    </footer>
  );
};

export default Footer;
