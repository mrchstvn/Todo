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
              className="w-12 h-12 md:w-15 md:h-15 rounded-full bg-blue-950 absolute bottom-10 right-10 m-0 p-0 flex items-center justify-center shadow-lg hover:bg-blue-900 hover:cursor-pointer"
            >
              <Plus className="size-10 md:size-14 text-white" />
            </Button>
          }
        />
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Create Tasks</DialogTitle>
            <DialogDescription>
              Fill in the details for your new tasks.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Group name</Label>
              <Input id="name-1" name="name" placeholder="Groceries" />
            </Field>
            <Field>
              <Label htmlFor="task-name-1">Task name</Label>
              <div className="flex flex-row gap-1">
                <Input
                  id="task-name-1"
                  name="taskName"
                  placeholder="Buy milk"
                />

                <Button
                  className="w-10 h-auto hover:cursor-pointer"
                  variant="outline"
                >
                  <Plus />
                </Button>
              </div>
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
