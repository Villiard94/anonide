import { Component } from 'solid-js';
import styles from './DictionaryHeader.module.css';

interface DictionaryHeaderProps {
  searchTerm: string;
  showForm: boolean;
  onSearchChange: (value: string) => void;
  onToggleForm: () => void;
}

const DictionaryHeader: Component<DictionaryHeaderProps> = (props) => {
  return (
    <div class={styles.header}>
      <input
        type="text"
        placeholder="Search dictionary..."
        value={props.searchTerm}
        onInput={(e) => props.onSearchChange(e.currentTarget.value)}
        class={styles.searchInput}
      />
      <button onClick={props.onToggleForm} class={styles.addButton}>
        {props.showForm ? 'Cancel' : 'Add Item'}
      </button>
    </div>
  );
};

export default DictionaryHeader;
