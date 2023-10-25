import classes from './MainContent.module.scss';

type Props = {
    children: React.ReactNode;
};

const MainContent = (props: Props) => {
  return (
    <main className={classes.root}>
      <div className="container">{props.children}</div>
    </main>
  );
};

export default MainContent;