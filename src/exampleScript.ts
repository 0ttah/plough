import { Card, CardSet } from "@open-artifact/api-types";

export function transformSet(set: CardSet) {
  throw new Error("Not implemented");
}

export function transformFragment(fragment: Card) {
  const newFragment = {
    name: fragment.card_name,
  };
  console.log("Modifying card", fragment.card_name);
  return newFragment;
}