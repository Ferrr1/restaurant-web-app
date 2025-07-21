const Heading = ({ text, children, className }) => {
  return (
    <div className={className}>
      <h1 className="text-2xl font-bold text-text">{text}</h1>
      <div>{children}</div>
    </div>
  );
};

export default Heading;
