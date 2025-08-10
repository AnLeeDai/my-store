export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "TechStore",
  description: "Cửa hàng công nghệ hàng đầu Việt Nam.",
  navItems: [
    {
      label: "Sản phẩm",
      href: "/products",
    },
    {
      label: "Giới thiệu",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Sản phẩm", 
      href: "/products",
    },
    {
      label: "Giới thiệu",
      href: "/about",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
