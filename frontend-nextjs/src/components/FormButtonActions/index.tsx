import classes from "./FormButtonActions.module.scss";

type FormButtonActionsProps = {
    children: React.ReactNode;
};

const FormButtonActions = (props: FormButtonActionsProps) => {
  return <div className={classes.root}>{props.children}</div>;
};

export default FormButtonActions;