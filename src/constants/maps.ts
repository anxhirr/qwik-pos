import { PlusIcon, UpdateIcon } from "~/components/icons";
import type { CRUDactions, IconProps } from "../../types";
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
