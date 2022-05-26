export interface SearchBarProps {
  query: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  menuRef: React.RefObject<HTMLInputElement>;
}
