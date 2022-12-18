import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className={"card " + props.classes}>
      <h1 className="card-header">{props.header}</h1>
      <p className="card-text">{props.body}</p>
      {props.button && <Link className="button mt-1.5" to={props.button.to}>{props.button.text}</Link>}
    </div>
  );
};

export default Card;
