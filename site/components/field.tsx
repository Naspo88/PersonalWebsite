type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  type?: "text" | "email";
  help?: string;
  error?: string;
  multiline?: boolean;
  autoComplete?: string;
};

const CONTROL_CLASS =
  "mt-2 w-full rounded border bg-surface px-4 py-3 text-base text-fg transition-colors duration-200 placeholder:text-fg-muted focus:border-fg";

export function Field({
  id,
  label,
  value,
  onChange,
  onBlur,
  type = "text",
  help,
  error,
  multiline = false,
  autoComplete,
}: FieldProps) {
  const helpId = help ? `${id}-help` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [helpId, errorId].filter(Boolean).join(" ") || undefined;
  const className = `${CONTROL_CLASS} ${error ? "border-danger" : "border-border-strong"}`;

  return (
    <div>
      <label htmlFor={id} className="font-mono text-sm text-fg">
        {label}
      </label>

      {multiline ? (
        <textarea
          id={id}
          name={id}
          rows={6}
          value={value}
          required
          aria-describedby={describedBy}
          aria-invalid={Boolean(error)}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          className={`${className} resize-y`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          required
          autoComplete={autoComplete}
          aria-describedby={describedBy}
          aria-invalid={Boolean(error)}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          className={className}
        />
      )}

      {help && (
        <p id={helpId} className="mt-2 text-sm text-fg-muted">
          {help}
        </p>
      )}

      {error && (
        <p id={errorId} className="mt-2 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
