import "./style.css";
type Props = {
  type: string;
};
const Loader = ({ type }: Props) => {
  return <div className={`spinner ${type}`}></div>;
};

export default Loader;
