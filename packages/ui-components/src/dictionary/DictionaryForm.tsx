import { Component, createSignal } from "solid-js";
import { DictionaryItem } from "./types";

interface DictionaryFormProps {
  onSubmit: (item: DictionaryItem) => void;
}

const DictionaryForm: Component<DictionaryFormProps> = (props) => {
  const [newItem, setNewItem] = createSignal<DictionaryItem>({
    key: "",
    token: "",
    isRegex: false,
    caseSensitive: false,
  });

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (newItem().key && newItem().token) {
      props.onSubmit(newItem());
      setNewItem({
        key: "",
        token: "",
        isRegex: false,
        caseSensitive: false,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Search for:</label>
        <input
          type="text"
          value={newItem().key}
          onInput={(e) => setNewItem({ ...newItem(), key: e.currentTarget.value })}
          required
        />
      </div>

      <div>
        <label>Replace with:</label>
        <input
          type="text"
          value={newItem().token}
          onInput={(e) => setNewItem({ ...newItem(), token: e.currentTarget.value })}
          required
        />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={newItem().isRegex}
            onChange={(e) => setNewItem({ ...newItem(), isRegex: e.currentTarget.checked })}
          />
          Regular Expression
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={newItem().caseSensitive}
            onChange={(e) =>
              setNewItem({
                ...newItem(),
                caseSensitive: e.currentTarget.checked,
              })
            }
          />
          Case Sensitive
        </label>
      </div>

      <button type="submit">Add Dictionary Item</button>
    </form>
  );
};

export default DictionaryForm;
