import React from 'react';
import Link from 'next/link';

const links = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/categories', label: 'Categories' },
  { href: '/admin/orders', label: 'Orders' },
  { href: '/admin/inventory', label: 'Inventory' },
];

const AdminSidebar = () => (
  <aside className="w-60 bg-gray-100 h-screen p-4">
    <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
    <nav>
      <ul className="space-y-4">
        {links.map(link => (
          <li key={link.href}>
            <Link href={link.href} className="text-primary hover:underline">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </aside>
);

export default AdminSidebar; 