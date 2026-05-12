import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLocation, Link } from "react-router";
import { Fragment } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useTranslation } from "react-i18next";

export function AppHeader() {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const segments = pathname
    .replace(/^\/intranet\/?/, "")
    .split("/")
    .filter(Boolean);

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 px-4 md:px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-1.5">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mx-1" />

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link to="/intranet" />}>{t("common.home")}</BreadcrumbLink>
            </BreadcrumbItem>

            {segments.map((segment, i) => {
              const href = "/intranet/" + segments.slice(0, i + 1).join("/");
              const label = segment
                .replace(/-/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase());
              const isLast = i === segments.length - 1;

              return (
                <Fragment key={href}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink render={<Link to={href} />}>{label}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="ml-auto flex items-center gap-1">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </header>
  );
}
