import { $, component$, useContext } from "@builder.io/qwik";
import { UiContext } from "~/routes/layout";
import {
  AccountCircleIcon,
  ArrowBackIcon,
  MenuIcon,
  NotificationsIcon,
} from "../icons";
import { Button } from "../buttons";
import { useLocation, useNavigate } from "@builder.io/qwik-city";

type Props = {
  title: string;
  onSearch?: (e: Event) => void;
};
export const NavBar = component$<Props>(({ title, onSearch }) => {
  const uiStore = useContext(UiContext);
  const nav = useNavigate();
  const loc = useLocation();

  const toggleSidebar = $(() => {
    uiStore.isSidebarOpen = !uiStore.isSidebarOpen;
  });
  return (
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <div class="flex-none md:hidden">
          <Button
            isCircle
            variant="ghost"
            Icon={MenuIcon}
            onClick$={toggleSidebar}
          />
        </div>
        <div class="hidden md:flex">
          <Button
            isCircle
            size="sm"
            variant="ghost"
            Icon={ArrowBackIcon}
            onClick$={() => nav(loc.prevUrl?.toString())}
          />
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
        <div class="flex gap-2">
          <Button
            indicatorText="9"
            isCircle
            variant="ghost"
            Icon={NotificationsIcon}
          />
          <div class="dropdown-end dropdown">
            <label tabIndex={0}>
              <Button isCircle variant="ghost" Icon={AccountCircleIcon} />
            </label>
            <ul
              tabIndex={0}
              class="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
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
