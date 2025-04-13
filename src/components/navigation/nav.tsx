import Link from "next/link";
import { CiHeart, CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import classes from './nav.module.css'

const pages = [
  { href: "/", title: "PRIKOSNIS" },
  { href: "/catalog", title: "Каталог" },
  { href: "/certificates", title: "Сертификаты" },
  { href: "/help", title: "Помощь" },
  { href: "/contacts", title: "Контакты" },
];

const links = [
  {
    href: "/search",
    title: (
      <div>
        <CiSearch />
      </div>
    ),
  },

  {
    href: "/wishlist",
    title: (
      <div>
        <CiHeart />
      </div>
    ),
  },
  {
    href: "/basket",
    title: (
      <div >
        <CiShoppingCart />
      </div>
    ),
  },
  {
    href: "/account",
    title: (
      <div >
        <CiUser />
      </div>
    ),
  },
];

export function Nav() {
  return (
    <nav>
      <ul>
        {pages.map(({ href, title }) => (
          <li key={href} >
            <Link href={href}>{title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function LinksNav() {
  return (
    <nav className={classes.links}>
      <ul>
        {links.map(({ href, title }) => (
          <li key={href}>
            <Link href={href}>{title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
