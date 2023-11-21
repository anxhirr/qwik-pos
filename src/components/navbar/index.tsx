import { $, component$, useContext } from "@builder.io/qwik";
import { UiContext } from "~/routes/layout";
import { IcRoundMenu } from "../icons";

type Props = {
  title: string;
  onSearch?: (e: Event) => void;
};
export const NavBar = component$<Props>(({ title, onSearch }) => {
  const uiStore = useContext(UiContext);

  const toggleSidebar = $(() => {
    uiStore.isSidebarOpen = !uiStore.isSidebarOpen;
  });
  return (
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <div class="flex-none md:hidden">
          <button class="btn btn-square btn-ghost" onClick$={toggleSidebar}>
            <IcRoundMenu />
          </button>
        </div>
        <div class="flex-1">
          <p class="btn btn-ghost text-xl normal-case">{title}</p>
        </div>
      </div>
      <div class="navbar-center">
        <div class="form-control">
          <input
            type="text"
            placeholder="Search"
            class="input input-bordered w-24 md:w-auto"
            onInput$={onSearch}
          />
        </div>
      </div>
      <div class="navbar-end">
        <div class="flex-none gap-2">
          <button class="btn btn-circle btn-ghost">
            <div class="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span class="badge indicator-item badge-primary badge-xs"></span>
            </div>
          </button>
          <div class="dropdown dropdown-end">
            <label tabIndex={0} class="avatar btn btn-circle btn-ghost">
              <div class="w-10 rounded-full">
                {/* <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" /> */}
              </div>
            </label>
            <ul
              tabIndex={0}
              class="menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
            >
              <li>
                <p class="justify-between">
                  Profile
                  <span class="badge">New</span>
                </p>
              </li>
              <li>
                <p>Settings</p>
              </li>
              <li>
                <p>Logout</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});
