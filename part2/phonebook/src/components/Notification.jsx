const Notification = ({ message, isError }) => {
  if (message === null) {
    return null;
  }
  let style;
  if (isError) style = { border: "3px solid red", color: "red" };
  else style = { border: "3px solid green", color: "green" };

  return (
    <div className="notification" style={style}>
      <h1>{message}</h1>
    </div>
  );
};

export default Notification;
