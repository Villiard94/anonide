import { Component } from "solid-js";

interface DictionaryHeaderProps {
  searchTerm: string;
  showForm: boolean;
  onSearchChange: (value: string) => void;
  onToggleForm: () => void;
}

const DictionaryHeader: Component<DictionaryHeaderProps> = (props) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search dictionary..."
        value={props.searchTerm}
        onInput={(e) => props.onSearchChange(e.currentTarget.value)}
      />
      <button onClick={() => props.onToggleForm()}>{props.showForm ? "Cancel" : "Add Item"}</button>
    </div>
  );
};

export default DictionaryHeader;
