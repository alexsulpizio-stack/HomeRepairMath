"use client";

import { useId } from "react";

export default function NumberInput({ value, onChange, min = 0, max = 1_000_000_000, integer = false }: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  integer?: boolean;
}) {
  const errorId = useId();
  const invalid = !Number.isFinite(value) || value < min || value > max || (integer && !Number.isInteger(value));
  return (
    <>
      <input type="number" inputMode={integer ? "numeric" : "decimal"} required
        min={min} max={max} step={integer ? 1 : "any"}
        value={Number.isNaN(value) ? "" : value}
        onChange={(event) => onChange(event.target.valueAsNumber)}
        aria-invalid={invalid} aria-describedby={invalid ? errorId : undefined} />
      {invalid ? <span className="field-error" id={errorId}>Enter {integer ? "a whole number" : "a number"} from {min.toLocaleString()} to {max.toLocaleString()}.</span> : null}
    </>
  );
}
