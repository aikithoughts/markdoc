import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const items = [
  {
    title: "Get started",
    links: [{ href: "/docs", children: "Overview" }],
  },
  {
    title: "Dave's Intro",
    links: [{ href: "/docs/dave-intro", children: "Introduction" }],
    subItems: [
      {
        title: "About Jakob",
        links: [{ href: "/docs/jakob-intro", children: "About Jakob" }],
      },
      {
        title: "About Max",
        links: [{ href: "/docs/max-intro", children: "About Max" }],
      },
    ],
  },
];

export function SideNav() {
  const router = useRouter();

  const renderLinks = (links) => (
    <ul className="flex column">
      {links.map((link) => {
        const active = router.pathname === link.href;
        return (
          <li key={link.href} className={active ? "active" : ""}>
            <Link {...link} />
          </li>
        );
      })}
    </ul>
  );

  const renderItems = (items) =>
    items.map((item) => (
      <div key={item.title}>
        <span>{item.title}</span>
        {item.subItems && (
          <div className="sub-items">
            {item.subItems.map((subItem) => (
              <div key={subItem.title}>{renderLinks(subItem.links)}</div>
            ))}
          </div>
        )}
        {renderLinks(item.links)}
      </div>
    ));

  return (
    <nav className="sidenav">
      {renderItems(items)}
      <style jsx>
        {`
          nav {
            position: sticky;
            top: var(--top-nav-height);
            height: calc(100vh - var(--top-nav-height));
            flex: 0 0 auto;
            overflow-y: auto;
            padding: 2.5rem 2rem 2rem;
            border-right: 1px solid var(--border-color);
          }
          span {
            font-size: larger;
            font-weight: 500;
            padding: 0.5rem 0 0.5rem;
          }
          .sub-items {
            margin-left: 1rem; /* Adjust the nesting indentation */
          }
          ul {
            padding: 0;
          }
          li {
            list-style: none;
            margin: 0;
          }
          li :global(a) {
            text-decoration: none;
          }
          li :global(a:hover),
          li.active :global(a) {
            text-decoration: underline;
          }
        `}
      </style>
    </nav>
  );
}
