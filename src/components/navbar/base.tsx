import { $, component$, useContext } from "@builder.io/qwik";
import { UiContext } from "~/routes/layout";
import {
  AccountCircleIcon,
  ArrowBackIcon,
  MenuIcon,
  NotificationsIcon,
  SettingsIcon,
} from "../icons";
import { Button } from "../buttons";
import { useLocation, useNavigate } from "@builder.io/qwik-city";
import { useAuthSession } from "~/routes/plugin@auth";
import { AppLink } from "~/routes.config";

type Props = {
  title: string;
  onSearch?: (e: Event) => void;
};
export const NavBar = component$<Props>(({ title, onSearch }) => {
  const uiStore = useContext(UiContext);
  const auth = useAuthSession();
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
            variant="ghost"
            tooltipText="Back"
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
              <li>{auth.value?.user?.email}</li>
              <li>
                <AppLink route="/account/">
                  <div class="flex justify-between">
                    <span>Account Settings</span>
                    <SettingsIcon />
                  </div>
                </AppLink>
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
