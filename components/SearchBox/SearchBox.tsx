import css from "./SearchBox.module.css";

interface SearchBoxProps {
  searchQuery: string;
  onChange: (value: string) => void;
}

export default function SearchBox({
  searchQuery,
  onChange
}: SearchBoxProps) {
  return (
    <>
      <input
        className={css.input}
        type="text"
        placeholder="Search notes"
        value={searchQuery}
        onChange={(event) => onChange(event.target.value)}
      />
    </>
  );
}