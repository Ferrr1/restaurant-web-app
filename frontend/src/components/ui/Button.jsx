const Button = ({ children, ...props }) => {
  return (
    <>
      <button
        {...props}
        className="text-[1.2rem] px-4 py-2 bg-primary text-text-accent rounded-md hover:bg-primary/80 cursor-pointer transition-colors duration-300 ease-in-out"
      >
        {children}
      </button>
    </>
  );
};

export default Button;
