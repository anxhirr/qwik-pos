import { CreditCardIcon, PlusIcon, UpdateIcon } from "~/components/icons";
import type {
  CRUDactions,
  Entity,
  IconProps,
  PaymentMethod,
} from "../../types";
import type { Component } from "@builder.io/qwik";

export const CRUD_ACTIONS_LOADING = new Map([
  ["CREATE", "Creating"],
  ["UPDATE", "Updating"],
]) as ReadonlyMap<CRUDactions, string>;

export const CRUD_ACTIONS_TEXT = new Map([
  ["CREATE", "Create"],
  ["UPDATE", "Update"],
]) as ReadonlyMap<CRUDactions, string>;

export const CRUD_ACTIONS_ICON = new Map([
  ["CREATE", PlusIcon],
  ["UPDATE", UpdateIcon],
]) as ReadonlyMap<CRUDactions, Component<IconProps>>;

export const ENTITY_ROUTE_MAP = new Map([
  ["ITEM", "/items"],
  ["CATEGORY", "/categories"],
  ["ORDER", "/orders"],
  ["CUSTOMER", "/customers"],
]) as ReadonlyMap<Entity, string>;

export const PAYMENT_METHOD_ICON_MAP = new Map([
  ["BANK", PlusIcon], // TODO: add appropriate icons
  ["CASH", PlusIcon],
  ["CARD", CreditCardIcon],
]) as ReadonlyMap<PaymentMethod, Component<IconProps>>;
