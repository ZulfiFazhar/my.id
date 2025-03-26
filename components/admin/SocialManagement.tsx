/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Trash } from "lucide-react";
import { SocialForm } from "@/components/admin/form/social-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Social {
  _id: string;
  platform: string;
  username: string;
  url: string;
  icon: string;
  bgColor: string;
  iconColor: string;
}

interface SocialManagementProps {
  socials: Social[];
  isLoading: boolean;
  onSaveSocial: (socialData: any) => Promise<void>;
  onDeleteItem: (type: "blog" | "social", id: string) => void;
}

export function SocialManagement({
  socials,
  isLoading,
  onSaveSocial,
  onDeleteItem,
}: SocialManagementProps) {
  const [openSocialForm, setOpenSocialForm] = useState(false);
  const [currentSocial, setCurrentSocial] = useState<Social | null>(null);

  const handleAddSocial = () => {
    setCurrentSocial(null);
    setOpenSocialForm(true);
  };

  const handleEditSocial = (social: Social) => {
    setCurrentSocial(social);
    setOpenSocialForm(true);
  };

  const handleSaveSocial = async (socialData: any) => {
    await onSaveSocial(socialData);
    setOpenSocialForm(false);
  };

  return (
    <>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Social Links</h2>
        <Button onClick={handleAddSocial}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Link
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading social links...</div>
      ) : socials.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No social links found. Add your first social link!
        </div>
      ) : (
        <div className="space-y-4">
          {socials.map((social) => (
            <Card key={social._id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${social.bgColor}`}
                    >
                      <span className={`${social.iconColor}`}>
                        {social.icon}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-medium">{social.platform}</h3>
                      <p className="text-sm text-muted-foreground">
                        {social.username}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditSocial(social)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDeleteItem("social", social._id)}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Social Form Dialog */}
      <Dialog open={openSocialForm} onOpenChange={setOpenSocialForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {currentSocial ? "Edit Social Link" : "Add New Social Link"}
            </DialogTitle>
          </DialogHeader>
          <SocialForm
            social={currentSocial}
            onSave={handleSaveSocial}
            onCancel={() => setOpenSocialForm(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
