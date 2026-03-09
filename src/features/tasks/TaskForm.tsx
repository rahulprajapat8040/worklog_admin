"use client";
import { addTaskAction } from "@/app/actions/task/addTask.action";
import ErrorMessage from "@/components/common/ErrorMessage";
import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input/Input";
import { useToast } from "@/components/ui/toast/ToastContext";
import { ICategory } from "@/lib/interfaces/ApiResponses/category.interface";
import { IAddTaskForm } from "@/lib/interfaces/forms/IAddTaskForm.interface";
import { TaskStatus, Visiblity } from "@/utils/enum";
import Validation from "@/utils/validation";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}
interface TaskProp {
  categories: ICategory[];
  taskStatus: Option[];
}
const TaskForm: React.FC<TaskProp> = ({ categories, taskStatus }) => {
  const toast = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IAddTaskForm>({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      title: "",
      timeTaken: "",
      categoryId: "",
      taskStatus: TaskStatus.DONE,
      description: "",
      visiblity: Visiblity.PUBLIC,
    },
  });

  const onSubmit = (data: IAddTaskForm) => {
    startTransition(async () => {
      const res = await addTaskAction(data);

      if (!res?.success) {
        toast.error(
          "Error In Adding Task",
          res?.message || "Failed to add task"
        );
        return;
      }

      toast.success("Task Added", "Task added successfully");
      router.push("/tasks");
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-2">
        <div>
          <Input
            {...register("date", { ...Validation.required("Date") })}
            type="date"
            label="Date"
          />
          <ErrorMessage text={errors.date?.message} />
        </div>
        <div>
          <Input
            label="Title"
            placeholder='e.g. "Create product API"'
            {...register("title", { ...Validation.required("Title") })}
          />
          <ErrorMessage text={errors.title?.message} />
        </div>
        <div>
          <Input
            type="select"
            label="Category"
            options={categories.map((i) => ({ value: i.id, label: i.name }))}
            {...register("categoryId", { ...Validation.required("Category") })}
          />
          <ErrorMessage text={errors.categoryId?.message} />
        </div>
        <div>
          <Input
            label="Project (Optional)"
            placeholder="e.g. WorkLog"
            {...register("projectName", {})}
          />
          <ErrorMessage text={errors.projectName?.message} />
        </div>
        <div className="col-span-2">
          <Controller
            control={control}
            name="timeTaken"
            defaultValue="00:00"
            rules={{ required: "Please enter taken time" }}
            render={({ field }) => {
              const [hours = "00", minutes = "00"] =
                field.value?.split(":") || [];

              const handleHoursChange = (value: string) => {
                const newHours = value.padStart(2, "0");
                field.onChange(`${newHours}:${minutes}`);
              };

              const handleMinutesChange = (value: string) => {
                const newMinutes = value.padStart(2, "0");
                field.onChange(`${hours}:${newMinutes}`);
              };

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-2">
                  <Input
                    type="number"
                    max={23}
                    min={0}
                    label="Hours"
                    value={Number(hours)}
                    onChange={(e) => handleHoursChange(e.target.value)}
                  />

                  <Input
                    type="number"
                    max={59}
                    min={0}
                    label="Minutes"
                    value={Number(minutes)}
                    onChange={(e) => handleMinutesChange(e.target.value)}
                  />
                </div>
              );
            }}
          />
          <ErrorMessage text={errors.timeTaken?.message} />
        </div>
        <div className="col-span-2 space-y-5">
          <div>
            <Input
              type="select"
              label="Status"
              options={taskStatus}
              {...register("taskStatus", {
                ...Validation.required("Task status"),
              })}
            />
            <ErrorMessage text={errors.taskStatus?.message} />
          </div>
          <div>
            <Input
              type="textarea"
              label="Notes / Blockers"
              placeholder="Additional Details..."
              rows={6}
              {...register("description", {
                ...Validation.required("Description"),
              })}
            />
            <ErrorMessage text={errors.description?.message} />
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-5 gap-4">
        <Button className="w-fit!">Save Task</Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setValue("visiblity", Visiblity.DRAFT);
            handleSubmit(onSubmit)();
          }}
        >
          Save as Draft
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
