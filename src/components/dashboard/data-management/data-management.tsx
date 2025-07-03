/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Download, Grid, List } from "lucide-react";
import { toast } from "sonner";

export interface DataItem {
  id: string;
  [key: string]: any;
}

export interface DataManagementConfig<T extends DataItem> {
  title: string;
  description: string;
  apiEndpoint: string;
  searchFields: (keyof T)[];
  statusField?: keyof T;
  statusOptions?: string[];
  categoryField?: keyof T;
  viewUrl?: (item: T) => string;
  externalUrls?: Array<{
    label: string;
    url: (item: T) => string | undefined;
    icon: ReactNode;
  }>;
  renderCard: (
    item: T,
    actions: {
      onEdit: () => void;
      onDelete: () => void;
      onDuplicate: () => void;
      onView?: () => void;
    }
  ) => ReactNode;
  renderForm: (
    formData: any,
    setFormData: (data: any) => void,
    isEditing: boolean
  ) => ReactNode;
  getInitialFormData: () => any;
  formatFormDataForApi: (
    formData: any,
    isEditing: boolean,
    originalItem?: T
  ) => any;
  formatItemForForm: (item: T) => any;
  getStats: (items: T[]) => Array<{
    label: string;
    value: number;
    color?: string;
    icon: ReactNode;
  }>;
}

interface DataManagementProps<T extends DataItem> {
  config: DataManagementConfig<T>;
}

export function DataManagement<T extends DataItem>({
  config,
}: DataManagementProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [filteredItems, setFilteredItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [formData, setFormData] = useState(config.getInitialFormData());
  const [lastFetched, setLastFetched] = useState<Date>(new Date());

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [items, searchQuery, statusFilter, categoryFilter]);

  const fetchItems = async () => {
    try {
      const response = await fetch(config.apiEndpoint);
      const data = await response.json();
      if (data.success) {
        setItems(data.data);
        setLastFetched(new Date());
      }
    } catch (error) {
      toast.error(
        `Failed to fetch ${config.title.toLowerCase()}` +
          (error instanceof Error ? `: ${error.message}` : "")
      );
    } finally {
      setLoading(false);
    }
  };

  const filterItems = () => {
    let filtered = items;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((item) =>
        config.searchFields.some((field) => {
          const value = item[field];
          if (Array.isArray(value)) {
            return value.some((v: any) =>
              String(v).toLowerCase().includes(searchQuery.toLowerCase())
            );
          }
          return String(value)
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        })
      );
    }

    // Status filter
    if (statusFilter !== "All" && config.statusField) {
      filtered = filtered.filter(
        (item) => item[config.statusField!] === statusFilter
      );
    }

    // Category filter
    if (categoryFilter !== "All" && config.categoryField) {
      filtered = filtered.filter((item) => {
        const categories = item[config.categoryField!];
        if (Array.isArray(categories)) {
          return categories.includes(categoryFilter);
        }
        return categories === categoryFilter;
      });
    }

    setFilteredItems(filtered);
  };

  const resetForm = () => {
    setFormData(config.getInitialFormData());
    setEditingItem(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const apiData = config.formatFormDataForApi(
      formData,
      !!editingItem,
      editingItem || undefined
    );

    try {
      const url = editingItem
        ? `${config.apiEndpoint}/${editingItem.id}`
        : config.apiEndpoint;
      const method = editingItem ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(
          `${config.title.slice(0, -1)} ${
            editingItem ? "updated" : "created"
          } successfully`
        );
        fetchItems();
        setIsDialogOpen(false);
        resetForm();
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast.error(
        `Failed to save ${config.title.toLowerCase().slice(0, -1)}` +
          (error instanceof Error ? `: ${error.message}` : "")
      );
    }
  };

  const handleEdit = (item: T) => {
    setEditingItem(item);
    setFormData(config.formatItemForForm(item));
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${config.apiEndpoint}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        toast.success(`${config.title.slice(0, -1)} deleted successfully`);
        fetchItems();
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast.error(
        `Failed to delete ${config.title.toLowerCase().slice(0, -1)}` +
          (error instanceof Error ? `: ${error.message}` : "")
      );
    }
  };

  const handleDuplicate = async (item: T) => {
    const duplicatedItem = config.formatFormDataForApi(
      {
        ...config.formatItemForForm(item),
        title: `${item.title} (Copy)`,
      },
      false
    );

    try {
      const response = await fetch(config.apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...duplicatedItem,
          id: `${item.id}-copy-${Date.now()}`,
        }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success(`${config.title.slice(0, -1)} duplicated successfully`);
        fetchItems();
      }
    } catch (error) {
      toast.error(
        `Failed to duplicate ${config.title.toLowerCase().slice(0, -1)}`
      );
      console.error(
        `Error duplicating ${config.title.toLowerCase().slice(0, -1)}:`,
        error
      );
    }
  };

  const exportItems = () => {
    const dataStr = JSON.stringify(items, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(
      dataStr
    )}`;
    const exportFileDefaultName = `${config.title.toLowerCase()}-${
      new Date().toISOString().split("T")[0]
    }.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const stats = config.getStats(items);
  const categories = config.categoryField
    ? Array.from(
        new Set(
          items.flatMap((item) => {
            const cats = item[config.categoryField!];
            return Array.isArray(cats) ? cats : [cats];
          })
        )
      )
    : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-muted-foreground">
          Loading {config.title.toLowerCase()}...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{config.title}</h1>
          <p className="text-muted-foreground">{config.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={exportItems}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="mr-2 h-4 w-4" />
                Add {config.title.slice(0, -1)}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? "Edit" : "Add New"} {config.title.slice(0, -1)}
                </DialogTitle>
                <DialogDescription>
                  Fill in the {config.title.toLowerCase().slice(0, -1)} details
                  below.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                {config.renderForm(formData, setFormData, !!editingItem)}
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingItem ? "Update" : "Create"}{" "}
                    {config.title.slice(0, -1)}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.color || ""}`}>
                    {stat.value}
                  </p>
                </div>
                {stat.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`Search ${config.title.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        {config.statusField && config.statusOptions && (
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Status</SelectItem>
              {config.statusOptions.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {config.categoryField && categories.length > 0 && (
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={String(category)} value={String(category)}>
                  {String(category)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <div className="flex items-center gap-1 border rounded-md p-1">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Items Display */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredItems.length} of {items.length}{" "}
            {config.title.toLowerCase()}
          </p>
        </div>

        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              : "space-y-2"
          }
        >
          {filteredItems.map((item) => (
            <div key={item.id}>
              {config.renderCard(item, {
                onEdit: () => handleEdit(item),
                onDelete: () => setDeleteItemId(item.id),
                onDuplicate: () => handleDuplicate(item),
                onView: config.viewUrl
                  ? () => window.open(config.viewUrl!(item), "_blank")
                  : undefined,
              })}
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">
                No {config.title.toLowerCase()} found matching your criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("All");
                  setCategoryFilter("All");
                }}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteItemId}
        onOpenChange={() => setDeleteItemId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the{" "}
              {config.title.toLowerCase().slice(0, -1)}
              and remove all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteItemId) {
                  handleDelete(deleteItemId);
                  setDeleteItemId(null);
                }
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Footer with Last Updated Info */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-muted-foreground border-t pt-4">
        <div>
          Data last fetched: {lastFetched.toLocaleString()}
          {loading && <span className="ml-2 animate-pulse">Updating...</span>}
        </div>
        <div>
          Showing {filteredItems.length} of {items.length}{" "}
          {config.title.toLowerCase()}
        </div>
      </div>
    </div>
  );
}
