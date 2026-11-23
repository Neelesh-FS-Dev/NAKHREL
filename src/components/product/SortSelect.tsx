import { sortLabels, type SortKey } from "../../lib/sortProducts";

interface SortSelectProps {
  id: string;
  value: SortKey;
  onChange: (key: SortKey) => void;
}

export function SortSelect({ id, value, onChange }: SortSelectProps) {
  return (
    <div className="sort">
      <label htmlFor={id} className="label">
        Sort by
      </label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value as SortKey)}>
        {(Object.keys(sortLabels) as SortKey[]).map((key) => (
          <option key={key} value={key}>
            {sortLabels[key]}
          </option>
        ))}
      </select>
    </div>
  );
}
