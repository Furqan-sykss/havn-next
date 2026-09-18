/**
 * A section header is no longer automatic. Most sections now open cold —
 * a running head on all eight was template chrome, not art direction.
 * This is used only where a header carries information: an index, a file
 * slug, a stage count.
 */
export default function SectionLabel({
  title,
  note,
  sub,
  id,
}: {
  title: string;
  note: string;
  sub?: string;
  id?: string;
}) {
  return (
    <div className="sec-head">
      <span className="meta" id={id}>
        {title}
      </span>
      <span className="meta note">
        {note}
        {sub ? (
          <>
            <br />
            <span className="num">{sub}</span>
          </>
        ) : null}
      </span>
    </div>
  );
}

export function Spec({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="spec">
      {rows.map(([term, value]) => (
        <div key={term} style={{ display: "contents" }}>
          <dt>{term}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
