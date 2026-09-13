import { Briefcase, Gavel, Home, HardHat, Landmark, Users } from "lucide-react";

export const iconMap = {
  Briefcase,
  Gavel,
  Home,
  HardHat,
  Landmark,
  Users,
};

export function PracticeIcon({ name, ...props }) {
  const Icon = iconMap[name] || Briefcase;
  return <Icon {...props} />;
}
