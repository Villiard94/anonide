import { Component, Show } from 'solid-js';
import styles from './DictionaryItem.module.css';
import { DictionaryItem as DictionaryItemType } from './types';

interface DictionaryItemProps {
  item: DictionaryItemType;
  onDelete: () => void;
}

const DictionaryItem: Component<DictionaryItemProps> = (props) => {
  return (
    <div class={styles.item}>
      <div class={styles.itemContent}>
        <div class={styles.itemKey}>
          <span class={styles.label}>Search for:</span>
          <span class={styles.value}>{props.item.key}</span>
          <Show when={props.item.isRegex}>
            <span class={styles.badge}>Regex</span>
          </Show>
          <Show when={props.item.caseSensitive}>
            <span class={styles.badge}>Case Sensitive</span>
          </Show>
        </div>
        <div class={styles.itemToken}>
          <span class={styles.label}>Replace with:</span>
          <span class={styles.value}>{props.item.token}</span>
        </div>
      </div>
      <button onClick={props.onDelete} class={styles.deleteButton}>
        Delete
      </button>
    </div>
  );
};

export default DictionaryItem;
