import classes from './Title.module.scss'

type Props = {
  children: React.ReactNode
}

const Title = (props: Props) => {
  return <h1 className={classes.root}>{props.children}</h1>
}

export default Title
