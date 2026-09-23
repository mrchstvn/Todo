"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateButton() {
  return (
    <Dialog>
      <form>
        <DialogTrigger
          render={
            <Button
              onClick={() => {}}
              className="w-15 h-15 md:w-20 md:h-20 rounded-full bg-blue-950 absolute bottom-10 right-10 m-0 p-0 flex items-center justify-center shadow-lg hover:bg-blue-900 hover:cursor-pointer"
            >
              <Plus className="size-10 md:size-14 text-white" />
            </Button>
          }
        />
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Create Task</DialogTitle>
            <DialogDescription>
              Fill in the details for your new task.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </Field>
            <Field>
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit">Create Task</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
