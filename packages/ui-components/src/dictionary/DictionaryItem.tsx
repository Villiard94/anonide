import { Component, Show } from "solid-js";
import { DictionaryItem as DictionaryItemType } from "./types";

interface DictionaryItemProps {
  item: DictionaryItemType;
  onDelete: () => void;
}

const DictionaryItem: Component<DictionaryItemProps> = (props) => {
  return (
    <div>
      <div>
        <div>
          <span>Search for:</span>
          <span>{props.item.key}</span>
          <Show when={props.item.isRegex}>
            <span>Regex</span>
          </Show>
          <Show when={props.item.caseSensitive}>
            <span>Case Sensitive</span>
          </Show>
        </div>
        <div>
          <span>Replace with:</span>
          <span>{props.item.token}</span>
        </div>
      </div>
      <button onClick={() => props.onDelete()}>Delete</button>
    </div>
  );
};

export default DictionaryItem;
