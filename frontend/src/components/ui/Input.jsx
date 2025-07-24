import { cn } from "../../utils/cn";

export const Input = ({ className, ...props }) => {
  return (
    <div>
      <label htmlFor={props.name}>
        <span className="text-sm text-text/50">{props.label}</span>
      </label>
      <input
        name="name"
        {...props}
        className={cn(
          "border-2 p-2 rounded-md border-foreground placeholder:text-text/30 focus:outline-none focus:border-primary transition-colors duration-300 ease-in-out",
          className
        )}
      />
    </div>
  );
};

export const TextArea = ({ className, ...props }) => {
  return (
    <div>
      <label htmlFor={props.name}>
        <span className="text-sm text-text/50">{props.label}</span>
      </label>
      <textarea
        name="name"
        {...props}
        className={cn(
          "border-2 max-h-20 p-2 rounded-md border-foreground placeholder:text-text/30 focus:outline-none focus:border-primary transition-colors duration-300 ease-in-out",
          className
        )}
      />
    </div>
  );
};

export const Select = ({ className, children, ...props }) => {
  return (
    <div>
      <label htmlFor={props.name}>
        <span className="text-sm text-text/50">{props.label}</span>
      </label>
      <select
        name="name"
        {...props}
        className={cn(
          "border-2 p-2 rounded-md border-foreground placeholder:text-text/30 focus:outline-none focus:border-primary transition-colors duration-300 ease-in-out",
          className
        )}
      >
        {children}
      </select>
    </div>
  );
};
