import { Component, For, Show } from "solid-js";
import DictionaryItem from "./DictionaryItem";
import { DictionaryItem as DictionaryItemType } from "./types";

interface DictionaryListProps {
  items: DictionaryItemType[];
  onDeleteItem: (index: number) => void;
}

const DictionaryList: Component<DictionaryListProps> = (props) => {
  return (
    <div>
      <Show when={props.items.length > 0} fallback={<div>No dictionary items found</div>}>
        <For each={props.items}>
          {(item, index) => (
            <DictionaryItem item={item} onDelete={() => props.onDeleteItem(index())} />
          )}
        </For>
      </Show>
    </div>
  );
};

export default DictionaryList;
