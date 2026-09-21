"use client";

type FieldDef = { key: string; label: string; multiline?: boolean };

export default function RepeatableFields<T extends Record<string, string>>({
  name,
  items,
  onChange,
  fields,
  addLabel = "Ekle",
}: {
  name: string;
  items: T[];
  onChange: (items: T[]) => void;
  fields: FieldDef[];
  addLabel?: string;
}) {
  function update(i: number, key: string, value: string) {
    const next = [...items];
    next[i] = { ...next[i], [key]: value };
    onChange(next);
  }

  function remove(i: number) {
    onChange(items.filter((_, idx) => idx !== i));
  }

  function add() {
    const empty = Object.fromEntries(fields.map((f) => [f.key, ""])) as T;
    onChange([...items, empty]);
  }

  return (
    <div>
      <input type="hidden" name={name} value={JSON.stringify(items)} />
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex gap-3 items-start border border-border rounded-md p-3">
            <div className="flex-1 grid gap-2" style={{ gridTemplateColumns: `repeat(${fields.length}, 1fr)` }}>
              {fields.map((f) =>
                f.multiline ? (
                  <textarea
                    key={f.key}
                    placeholder={f.label}
                    value={item[f.key] ?? ""}
                    onChange={(e) => update(i, f.key, e.target.value)}
                    rows={2}
                    className="rounded-sm border border-border px-3 py-2 text-sm outline-none focus:border-accent resize-none"
                  />
                ) : (
                  <input
                    key={f.key}
                    placeholder={f.label}
                    value={item[f.key] ?? ""}
                    onChange={(e) => update(i, f.key, e.target.value)}
                    className="rounded-sm border border-border px-3 py-2 text-sm outline-none focus:border-accent"
                  />
                )
              )}
            </div>
            <button
              type="button"
              onClick={() => remove(i)}
              className="text-xs text-red-600 font-semibold shrink-0 mt-2"
            >
              Sil
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        className="mt-3 text-sm font-semibold border-b border-foreground"
      >
        + {addLabel}
      </button>
    </div>
  );
}
