import type { PrismaItemWithPrice } from "~/types-and-validation";
import { getActiveRuleIndex } from ".";

export const getActivePrice = (
  priceRules: PrismaItemWithPrice["priceRules"],
) => {
  const rules = priceRules.map(({ start, end }) => ({ start, end }));
  const ruleIndex = getActiveRuleIndex(rules);
  return priceRules[ruleIndex]?.price;
};
