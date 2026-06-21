import { Route } from "lucide-react";
import {
  FaCogs,
  FaDesktop,
  FaLayerGroup,
  FaLaptopCode,
  FaRobot,
  FaServer,
  FaTerminal,
} from "react-icons/fa";

interface CapabilityIconProps {
  slug: string;
}

export default function CapabilityIcon({ slug }: CapabilityIconProps) {
  switch (slug) {
    case "frontend-systems":
      return <FaLaptopCode />;
    case "backend-systems":
      return <FaServer />;
    case "desktop-applications":
      return <FaDesktop />;
    case "product-engineering":
      return <FaLayerGroup />;
    case "ai-augmented-development":
      return <FaRobot />;
    case "automation-platforms":
      return <FaCogs />;
    case "cloud-devops-delivery":
      return <Route size={22} />;
    default:
      return <FaTerminal />;
  }
}
