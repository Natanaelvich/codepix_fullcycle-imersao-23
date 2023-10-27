import * as React from "react";
import classes from "./Card.module.scss";

type CardProps = {
    children: React.ReactNode;
};

const Card = (props: CardProps) => {
  return <div className={classes.root}>{props.children}</div>;
};

export default Card;
