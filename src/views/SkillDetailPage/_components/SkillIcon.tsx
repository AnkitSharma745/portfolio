import { Layers } from "lucide-react";
import { homeSkillGroups } from "@/content/skills/homeSkills";
import {
  getSkillsForGroup,
  type SkillDetail,
} from "@/content/skills/skillDetails";

interface SkillIconProps {
  skill: SkillDetail;
}

export default function SkillIcon({ skill }: SkillIconProps) {
  const group = homeSkillGroups.find((item) => item.id === skill.categoryId);
  const matchedSkill = group
    ? getSkillsForGroup(group).find((item) => item.slug === skill.skillSlug)
    : undefined;

  return matchedSkill?.icon ?? <Layers aria-hidden="true" />;
}
