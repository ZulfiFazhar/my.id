/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SocialFormProps {
  social?: any;
  onSave: (socialData: any) => void;
  onCancel: () => void;
}

export function SocialForm({ social, onSave, onCancel }: SocialFormProps) {
  const [formData, setFormData] = useState({
    platform: "",
    username: "",
    url: "",
    icon: "Github",
    bgColor: "bg-gray-900",
    iconColor: "text-white",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (social) {
      setFormData({
        platform: social.platform || "",
        username: social.username || "",
        url: social.url || "",
        icon: social.icon || "Github",
        bgColor: social.bgColor || "bg-gray-900",
        iconColor: social.iconColor || "text-white",
      });
    }
  }, [social]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onSave(formData);
    } catch (error) {
      console.error("Error saving social link:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Predefined options for social platforms
  const platformOptions = [
    {
      value: "Github",
      label: "GitHub",
      bgColor: "bg-gray-900",
      iconColor: "text-white",
    },
    {
      value: "Twitter",
      label: "Twitter",
      bgColor: "bg-blue-500",
      iconColor: "text-white",
    },
    {
      value: "Linkedin",
      label: "LinkedIn",
      bgColor: "bg-blue-700",
      iconColor: "text-white",
    },
    {
      value: "Instagram",
      label: "Instagram",
      bgColor: "bg-pink-600",
      iconColor: "text-white",
    },
    {
      value: "Youtube",
      label: "YouTube",
      bgColor: "bg-red-600",
      iconColor: "text-white",
    },
    {
      value: "Facebook",
      label: "Facebook",
      bgColor: "bg-blue-600",
      iconColor: "text-white",
    },
    {
      value: "Globe",
      label: "Website",
      bgColor: "bg-green-600",
      iconColor: "text-white",
    },
  ];

  // Update colors when platform changes
  const handlePlatformChange = (value: string) => {
    const platform = platformOptions.find((p) => p.value === value);
    if (platform) {
      setFormData((prev) => ({
        ...prev,
        platform: platform.label,
        icon: platform.value,
        bgColor: platform.bgColor,
        iconColor: platform.iconColor,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="platform">Platform</Label>
        <Select value={formData.icon} onValueChange={handlePlatformChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select platform" />
          </SelectTrigger>
          <SelectContent>
            {platformOptions.map((platform) => (
              <SelectItem key={platform.value} value={platform.value}>
                {platform.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="username">Username/Display Name</Label>
        <Input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          placeholder="@username or Full Name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">URL</Label>
        <Input
          id="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          required
          placeholder="https://..."
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : social ? "Update Link" : "Add Link"}
        </Button>
      </div>
    </form>
  );
}
