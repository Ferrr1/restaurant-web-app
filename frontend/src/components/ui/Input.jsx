import { cn } from "../../utils/cn";

export const Input = ({ className, IconStart, IconEnd, ...props }) => {
  const hasStartIcon = !!IconStart;
  const hasEndIcon = !!IconEnd;

  return (
    <div>
      {props.label && (
        <label htmlFor={props.name}>
          <span className="text-sm text-text/50">{props.label}</span>
        </label>
      )}
      <div className="relative">
        {hasStartIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text/50">
            <IconStart className="w-5 h-5" />
          </span>
        )}
        {hasEndIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text/50">
            <IconEnd className="w-5 h-5" />
          </span>
        )}
        <input
          {...props}
          className={cn(
            "border-2 p-2 rounded-md border-border placeholder:text-text/30 focus:outline-none focus:border-primary transition-colors duration-300 ease-in-out w-full",
            hasStartIcon && "pl-10",
            hasEndIcon && "pr-10",
            className
          )}
        />
      </div>
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
          "border-2 max-h-20 p-2 rounded-md border-border placeholder:text-text/30 focus:outline-none focus:border-primary transition-colors duration-300 ease-in-out",
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
      <div className="relative">
        <select
          {...props}
          className={cn(
            "border-2 p-2 appearance-none rounded-md border-border placeholder:text-text/30 focus:outline-none focus:border-primary transition-colors duration-300 ease-in-out",
            className
          )}
        >
          {children}
        </select>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.2"
          stroke="currentColor"
          className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
          />
        </svg>
      </div>
    </div>
  );
};
