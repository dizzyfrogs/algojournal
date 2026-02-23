import Link from "next/link";
import { LayoutDashboard, NotebookPen, BarChart3, Settings } from "lucide-react";

const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/journal", label: "Journal", icon: NotebookPen },
    { href: "/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
    return (
        <aside className="w-64 h-screen bg-zinc-900 border-r border-zinc-800 flex flex-col p-4 fixed left-0 top-0">
            <div className="mb-8 px-2">
                <h2 className="text-xl font-bold text-blue-500">AlgoJournal</h2>
            </div>
            <nav className="space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                        >
                            <Icon size={20} />
                            <span className="text-sm font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
  );
}