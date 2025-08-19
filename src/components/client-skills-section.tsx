'use client';

import { Smartphone, Brain, Bot, Code } from "lucide-react";

// Icon mapping for skills
const skillIconMap = {
    smartphone: Smartphone,
    brain: Brain,
    bot: Bot,
    code: Code,
} as const;

type SkillIconName = keyof typeof skillIconMap;

interface Skill {
    name: string;
    iconName: SkillIconName;
}

interface ClientSkillsSectionProps {
    skills: Skill[];
}

export function ClientSkillsSection({ skills }: ClientSkillsSectionProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {skills.map((skill) => {
                const IconComponent = skillIconMap[skill.iconName];

                return (
                    <div
                        key={skill.name}
                        className="flex flex-col items-center p-6 rounded-lg bg-card hover:bg-card/80 transition-colors group cursor-pointer"
                    >
                        <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors mb-4">
                            <IconComponent className="w-8 h-8 text-primary" />
                        </div>
                        <p className="font-semibold text-center">{skill.name}</p>
                    </div>
                );
            })}
        </div>
    );
}
