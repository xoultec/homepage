export default function SectionWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`w-full flex flex-col items-center py-5 my-3${
        className ? ` ${className}` : ""
      }`}
    >
      <div className="w-full max-w-[1024px] p-2">{children}</div>
    </div>
  );
}
