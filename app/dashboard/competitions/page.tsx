/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  DataManagement,
  DataManagementConfig,
} from "@/components/dashboard/data-management/data-management";
import { Competition } from "@/types/competitions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  //   Trophy,
  Calendar,
  MapPin,
  MoreHorizontal,
  Edit,
  Copy,
  Trash2,
  //   Eye,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { DateInput } from "@/components/ui/date-picker";

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Completed":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "Ongoing":
      return <Clock className="h-4 w-4 text-blue-500" />;
    case "Upcoming":
      return <AlertCircle className="h-4 w-4 text-orange-500" />;
    default:
      return null;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800 border-green-200";
    case "Ongoing":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Upcoming":
      return "bg-orange-100 text-orange-800 border-orange-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const competitionsConfig: DataManagementConfig<Competition> = {
  title: "Competitions",
  description: "Manage and track your competition participations",
  apiEndpoint: "/api/competitions",
  searchFields: ["title", "description", "organizer", "result"],
  statusField: "status",
  statusOptions: ["Completed", "Ongoing", "Upcoming"],
  renderCard: (competition, actions) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{competition.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              by {competition.organizer}
            </p>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {competition.description}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={actions.onEdit}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={actions.onDuplicate}>
                <Copy className="mr-2 h-4 w-4" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={actions.onDelete}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getStatusIcon(competition.status)}
              <Badge className={getStatusColor(competition.status)}>
                {competition.status}
              </Badge>
            </div>
            {competition.status === "Completed" && (
              <Badge variant="outline" className="font-medium">
                {competition.result}
              </Badge>
            )}
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(competition.startDate).toLocaleDateString()} -
                {new Date(competition.endDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{competition.location}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
  renderForm: (formData, setFormData, isEditing) => (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
        </div>
        <div className="col-span-2 space-y-2">
          <Label htmlFor="organizer">Organizer</Label>
          <Input
            id="organizer"
            value={formData.organizer}
            onChange={(e) =>
              setFormData({ ...formData, organizer: e.target.value })
            }
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <DateInput
            id="startDate"
            value={formData.startDate}
            onChange={(value) => setFormData({ ...formData, startDate: value })}
            placeholder="Select start date"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <DateInput
            id="endDate"
            value={formData.endDate}
            onChange={(value) => setFormData({ ...formData, endDate: value })}
            placeholder="Select end date"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) =>
              setFormData({ ...formData, status: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Upcoming">Upcoming</SelectItem>
              <SelectItem value="Ongoing">Ongoing</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="result">Result</Label>
        <Input
          id="result"
          value={formData.result}
          onChange={(e) => setFormData({ ...formData, result: e.target.value })}
          placeholder="e.g., 1st Place, Finalist, Participant"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          value={formData.imageUrl}
          onChange={(e) =>
            setFormData({ ...formData, imageUrl: e.target.value })
          }
        />
      </div>
    </>
  ),
  getInitialFormData: () => ({
    title: "",
    organizer: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    result: "",
    status: "Upcoming",
    imageUrl: "",
  }),
  formatFormDataForApi: (formData, isEditing, originalItem) => ({
    ...formData,
    id: originalItem?.id || `comp-${Date.now()}`,
  }),
  formatItemForForm: (competition) => ({
    title: competition.title,
    organizer: competition.organizer,
    description: competition.description,
    startDate: competition.startDate,
    endDate: competition.endDate,
    location: competition.location,
    result: competition.result,
    status: competition.status,
    imageUrl: competition.imageUrl || "",
  }),
  getStats: (competitions) => [
    {
      label: "Total Competitions",
      value: competitions.length,
      icon: <TrendingUp className="h-8 w-8 text-muted-foreground" />,
    },
    {
      label: "Completed",
      value: competitions.filter((c) => c.status === "Completed").length,
      color: "text-green-600",
      icon: <CheckCircle className="h-8 w-8 text-green-500" />,
    },
    {
      label: "Ongoing",
      value: competitions.filter((c) => c.status === "Ongoing").length,
      color: "text-blue-600",
      icon: <Clock className="h-8 w-8 text-blue-500" />,
    },
    {
      label: "Upcoming",
      value: competitions.filter((c) => c.status === "Upcoming").length,
      color: "text-orange-600",
      icon: <AlertCircle className="h-8 w-8 text-orange-500" />,
    },
  ],
};

export default function CompetitionsManagementPage() {
  return (
    <div className="space-y-6">
      <DataManagement config={competitionsConfig} />

      {/* Footer Info */}
      <div className="text-xs text-muted-foreground text-center border-t pt-4">
        Competitions data synced with database • Last page load:{" "}
        {new Date().toLocaleString()}
      </div>
    </div>
  );
}
