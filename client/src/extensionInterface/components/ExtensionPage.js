import React from "react";
import { ExtractTitle } from "./ExtractTitle";
import { ExtractServings } from "./ExtractServings";
import { ExtractIngredients } from "./ExtractIngredients";
import { ExtractMethod } from "./ExtractMethod";
import { SaveRecipeButton } from "./SaveRecipeButton";

export function UnconnectedExtensionPage() {
  return (
    <div>
      <SaveRecipeButton />
      <ExtractTitle />
      <ExtractServings />
      <ExtractIngredients />
      <ExtractMethod />
    </div>
  );
}

export const ExtensionPage = UnconnectedExtensionPage;
