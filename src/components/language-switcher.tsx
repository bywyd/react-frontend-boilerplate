import { useTranslation } from "react-i18next";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LANGUAGES, type LanguageCode } from "@/i18n";

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const currentLang = LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0];

  function handleSelect(code: LanguageCode) {
    i18n.changeLanguage(code);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" aria-label={t("common.selectLanguage")} />}>
        <Languages className="size-4" />
        <span className="sr-only">{t("common.selectLanguage")}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleSelect(lang.code)}
            className={currentLang.code === lang.code ? "font-semibold" : ""}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
