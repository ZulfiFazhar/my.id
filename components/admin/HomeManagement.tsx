/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlusCircle, Trash, Save, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

interface Skill {
  name: string;
  level?: number;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

interface HomeData {
  _id?: string;
  hero: {
    title: string;
    subtitle: string;
  };
  about: {
    description: string;
    experience: string;
    image: string;
    skillCategories: SkillCategory[];
  };
}

export function HomeManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [homeData, setHomeData] = useState<HomeData>({
    hero: {
      title: "",
      subtitle: "",
    },
    about: {
      description: "",
      experience: "",
      image: "/placeholder.svg?height=400&width=400",
      skillCategories: [],
    },
  });
  const [newSkill, setNewSkill] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState(3);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  // Predefined skill categories
  const predefinedCategories = [
    "Programming Languages",
    "Frontend",
    "Backend",
    "Databases",
    "Cloud & Infrastructure",
    "DevOps & Tools",
    "IoT & Hardware",
    "Data Science & Machine Learning",
    "Design & Collaboration",
  ];

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/home");
      if (!response.ok) {
        throw new Error("Failed to fetch home data");
      }
      const data = await response.json();
      setHomeData(data);
    } catch (err) {
      console.error("Error fetching home data:", err);
      setError("Failed to load home data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError("");
    try {
      const response = await fetch("/api/home", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(homeData),
      });

      if (!response.ok) {
        throw new Error("Failed to save home data");
      }

      const updatedData = await response.json();
      setHomeData(updatedData);
      toast.success("Home content saved successfully!");
    } catch (err) {
      console.error("Error saving home data:", err);
      setError("Failed to save home data. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleHeroChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setHomeData({
      ...homeData,
      hero: {
        ...homeData.hero,
        [name]: value,
      },
    });
  };

  const handleAboutChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setHomeData({
      ...homeData,
      about: {
        ...homeData.about,
        [name]: value,
      },
    });
  };

  const addSkillCategory = (categoryName: string) => {
    // Check if category already exists
    if (
      homeData.about.skillCategories.some((cat) => cat.name === categoryName)
    ) {
      return;
    }

    setHomeData({
      ...homeData,
      about: {
        ...homeData.about,
        skillCategories: [
          ...homeData.about.skillCategories,
          {
            name: categoryName,
            skills: [],
          },
        ],
      },
    });
  };

  const removeSkillCategory = (index: number) => {
    const updatedCategories = [...homeData.about.skillCategories];
    updatedCategories.splice(index, 1);

    setHomeData({
      ...homeData,
      about: {
        ...homeData.about,
        skillCategories: updatedCategories,
      },
    });
  };

  const addSkill = (categoryIndex: number) => {
    if (!newSkill.trim()) return;

    const updatedCategories = [...homeData.about.skillCategories];
    updatedCategories[categoryIndex].skills.push({
      name: newSkill,
      level: newSkillLevel,
    });

    setHomeData({
      ...homeData,
      about: {
        ...homeData.about,
        skillCategories: updatedCategories,
      },
    });

    setNewSkill("");
    setNewSkillLevel(3);
  };

  const removeSkill = (categoryIndex: number, skillIndex: number) => {
    const updatedCategories = [...homeData.about.skillCategories];
    updatedCategories[categoryIndex].skills.splice(skillIndex, 1);

    setHomeData({
      ...homeData,
      about: {
        ...homeData.about,
        skillCategories: updatedCategories,
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading home content...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Home Content</h2>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      {error && (
        <div className="bg-destructive/10 text-destructive p-3 rounded-md">
          {error}
        </div>
      )}

      <Tabs defaultValue="hero">
        <TabsList className="mb-4">
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="about">About Section</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>

        {/* Hero Section Tab */}
        <TabsContent value="hero">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={homeData.hero.title}
                  onChange={handleHeroChange}
                  placeholder="Enter hero title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Textarea
                  id="subtitle"
                  name="subtitle"
                  value={homeData.hero.subtitle}
                  onChange={handleHeroChange}
                  placeholder="Enter hero subtitle"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* About Section Tab */}
        <TabsContent value="about">
          <Card>
            <CardHeader>
              <CardTitle>About Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">About Me</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={homeData.about.description}
                  onChange={handleAboutChange}
                  placeholder="Enter about me description"
                  rows={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Experience</Label>
                <Input
                  id="experience"
                  name="experience"
                  value={homeData.about.experience}
                  onChange={handleAboutChange}
                  placeholder="e.g., 5+ years"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Profile Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  value={homeData.about.image}
                  onChange={handleAboutChange}
                  placeholder="Enter image URL"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle>Skills & Expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Label className="mb-2 block">Add Skill Category</Label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {predefinedCategories.map((category) => (
                    <Button
                      key={category}
                      variant="outline"
                      size="sm"
                      onClick={() => addSkillCategory(category)}
                      disabled={homeData.about.skillCategories.some(
                        (cat) => cat.name === category
                      )}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {homeData.about.skillCategories.map(
                  (category, categoryIndex) => (
                    <AccordionItem
                      key={categoryIndex}
                      value={`category-${categoryIndex}`}
                    >
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex justify-between items-center w-full pr-4">
                          <span>{category.name}</span>
                          <Badge variant="outline">
                            {category.skills.length} skills
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-2">
                          {/* List of skills */}
                          <div className="space-y-2">
                            {category.skills.map((skill, skillIndex) => (
                              <div
                                key={skillIndex}
                                className="flex items-center justify-between bg-muted/50 p-2 rounded-md"
                              >
                                <div className="flex-1">
                                  <p className="font-medium">{skill.name}</p>
                                  {skill.level && (
                                    <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                                      <div
                                        className="bg-primary h-1.5 rounded-full"
                                        style={{
                                          width: `${(skill.level / 5) * 100}%`,
                                        }}
                                      ></div>
                                    </div>
                                  )}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    removeSkill(categoryIndex, skillIndex)
                                  }
                                >
                                  <Trash className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            ))}
                          </div>

                          {/* Add new skill form */}
                          <div className="space-y-2 pt-2 border-t">
                            <Label htmlFor={`new-skill-${categoryIndex}`}>
                              Add New Skill
                            </Label>
                            <div className="flex gap-2">
                              <Input
                                id={`new-skill-${categoryIndex}`}
                                value={
                                  activeCategory === categoryIndex
                                    ? newSkill
                                    : ""
                                }
                                onChange={(e) => {
                                  setActiveCategory(categoryIndex);
                                  setNewSkill(e.target.value);
                                }}
                                placeholder="Enter skill name"
                                className="flex-1"
                              />
                              <Button
                                onClick={() => addSkill(categoryIndex)}
                                disabled={
                                  !newSkill.trim() ||
                                  activeCategory !== categoryIndex
                                }
                              >
                                <PlusCircle className="h-4 w-4 mr-2" />
                                Add
                              </Button>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <Label htmlFor={`skill-level-${categoryIndex}`}>
                                  Skill Level (1-5)
                                </Label>
                                <span className="text-sm">
                                  {newSkillLevel}/5
                                </span>
                              </div>
                              <Slider
                                id={`skill-level-${categoryIndex}`}
                                min={1}
                                max={5}
                                step={1}
                                value={[newSkillLevel]}
                                onValueChange={(value: any) =>
                                  setNewSkillLevel(value[0])
                                }
                              />
                            </div>
                          </div>

                          {/* Remove category button */}
                          <div className="pt-2 border-t">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => removeSkillCategory(categoryIndex)}
                            >
                              <Trash className="h-4 w-4 mr-2" />
                              Remove Category
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )
                )}
              </Accordion>

              {homeData.about.skillCategories.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No skill categories added yet. Add a category to get started.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* <div className="flex justify-end mt-6">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save All Changes
            </>
          )}
        </Button>
      </div> */}
    </div>
  );
}
