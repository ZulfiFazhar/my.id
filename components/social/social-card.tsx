/* eslint-disable @typescript-eslint/no-explicit-any */
// components/social/social-card.tsx

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Social {
  _id: string;
  platform: string;
  username: string;
  url: string;
  icon: string;
  bgColor: string;
  iconColor: string;
}

interface SocialCardProps {
  social: Social;
  getIconComponent: (iconName: string) => any;
}

export default function SocialCard({
  social,
  getIconComponent,
}: SocialCardProps) {
  const IconComponent = getIconComponent(social.icon);

  return (
    <Card key={social._id} className="overflow-hidden p-0">
      <CardContent className="p-4">
        <div className="flex justify-between items-center gap-4">
          <div className="flex gap-4">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${social.bgColor}`}
            >
              <IconComponent className={`h-6 w-6 ${social.iconColor}`} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold">{social.platform}</h3>
              <p className="text-sm text-muted-foreground">{social.username}</p>
            </div>
          </div>
          <Button asChild>
            <a href={social.url} target="_blank" rel="noopener noreferrer">
              Connect
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
