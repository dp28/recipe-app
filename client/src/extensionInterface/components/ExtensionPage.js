import React from "react";
import { ExtractTitle } from "./ExtractTitle";
import { ExtractServings } from "./ExtractServings";
import { ExtractIngredients } from "./ExtractIngredients";
import { ExtractMethod } from "./ExtractMethod";

export function UnconnectedExtensionPage() {
  return (
    <div>
      <ExtractTitle />
      <ExtractServings />
      <ExtractIngredients />
      <ExtractMethod />
    </div>
  );
}

export const ExtensionPage = UnconnectedExtensionPage;
