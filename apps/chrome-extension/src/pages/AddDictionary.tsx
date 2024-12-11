import { getStoredDictionary, saveDictionary } from "@anonide/anonymizer";
import { Component } from "solid-js";
import { Container } from "@suid/material";
import { DictionaryItemForm, DictionaryItemFormType } from "@anonide/ui-components";
import { useNavigate } from "@solidjs/router";
import { DictionaryItem } from "@anonide/models";
import { nanoid } from "nanoid";

const AddDictionary: Component = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: DictionaryItemFormType) => {
    const newItem = {} as DictionaryItem;
    newItem.id = nanoid();
    Object.assign(newItem, values);

    const currentItems = (await getStoredDictionary()) || [];
    const updatedItems = [...currentItems, newItem];
    await saveDictionary(updatedItems);
    navigate("/dictionary");
  };

  return (
    <Container maxWidth="md">
      <DictionaryItemForm onSubmit={handleSubmit} />
    </Container>
  );
};

export default AddDictionary;
