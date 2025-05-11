import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Breadcrumb({
  crumbs,
}: {
  crumbs: { label: string; path?: string }[];
}) {
  return (
    <nav className="text-sm text-muted-foreground flex items-center gap-1">
      {crumbs.map((crumb, idx) => (
        <div key={idx} className="flex items-center gap-1">
          {idx > 0 && <ChevronRight className="w-4 h-4" />}
          {crumb.path ? (
            <Link to={crumb.path} className="hover:underline text-primary">
              {crumb.label}
            </Link>
          ) : (
            <span className="font-medium text-foreground">{crumb.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
