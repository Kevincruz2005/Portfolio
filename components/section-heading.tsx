export function SectionHeading({
  as: Heading = "h2",
  id,
  index,
  eyebrow,
  title,
  description,
}: {
  as?: "h1" | "h2";
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="section-heading">
      <div className="section-kicker">
        <span aria-hidden="true">{index}</span>
        <span>{eyebrow}</span>
      </div>
      <div className="section-heading-copy">
        <Heading id={id}>{title}</Heading>
        {description ? <p>{description}</p> : null}
      </div>
    </header>
  );
}
