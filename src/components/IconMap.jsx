import { Briefcase, Gavel, Home, HardHat, ScrollText, Trees } from "lucide-react";

export const iconMap = {
  Briefcase,
  Gavel,
  Home,
  HardHat,
  ScrollText,
  Trees,
};

export function PracticeIcon({ name, ...props }) {
  const Icon = iconMap[name] || Briefcase;
  return <Icon {...props} />;
}
