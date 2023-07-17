type DashboardHeaderProps = {
  heading: string;
  text?: string;
  children?: React.ReactNode;
};

export function Header({ heading, text, children }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="grid gap-1">
        <h1 className="font-cal text-2xl dark:text-white sm:text-4xl">
          {heading}
        </h1>
        {text && (
          <p className="text-md sm:text-lg text-muted-foreground">{text}</p>
        )}
      </div>
      {children}
    </div>
  );
}
