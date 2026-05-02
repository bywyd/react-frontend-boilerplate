import { useEffect } from "react"
import { siteConfig } from "@/config/site"

interface HeadOptions {
  title?: string
  description?: string
}

export function useHead({ title, description }: HeadOptions = {}) {
  useEffect(() => {
    document.title = title ? `${title} - ${siteConfig.name}` : siteConfig.name

    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription && description) {
      metaDescription.setAttribute("content", description)
    }
  }, [title, description])
}
