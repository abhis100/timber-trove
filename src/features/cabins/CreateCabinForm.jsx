// Changed name of field "regularPrice" to "normalPrice" as I had names field as normalPrice ....
// initially in supabase
import styled from "styled-components";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { createEditCabin } from "../../services/apiCabins";
// import toast from "react-hot-toast";
import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

// const FormRow = styled.div`
//   display: grid;
//   align-items: center;
//   grid-template-columns: 24rem 1fr 1.2fr;
//   gap: 2.4rem;

//   padding: 1.2rem 0;

//   &:first-child {
//     padding-top: 0;
//   }

//   &:last-child {
//     padding-bottom: 0;
//   }

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }

//   &:has(button) {
//     display: flex;
//     justify-content: flex-end;
//     gap: 1.2rem;
//   }
// `;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ cabinToEdit = {}, setShowForm, onCloseModal }) {
  const { id: editCabinId, ...editValues } = cabinToEdit;
  const isEditingCabin = Boolean(editCabinId); // Checking and converting id to true or false value
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditingCabin ? editValues : {},
  });
  const { errors } = formState;
  console.log(errors);
  // const queryClient = useQueryClient();
  const { creatingCabin, isCreating } = useCreateCabin();
  const { editingCabin, isEditing } = useEditCabin();
  const isWorking = isCreating || isEditing;
  function onHandleSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (editCabinId)
      editingCabin(
        {
          newCabin: {
            ...data,
            image,
          },
          id: editCabinId,
        },
        {
          onSuccess: () => {
            reset(getValues());
            onCloseModal?.();
          },
        }
      );
    else
      creatingCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset(getValues());
            onCloseModal?.();
          },
        }
      );
  }
  function onError(errors) {
    console.log(errors);
  }
  return (
    <Form
      onSubmit={handleSubmit(onHandleSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Minimum of 1 person should be there",
            },
            max: 10,
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.normalPrice?.message}>
        <Input
          type="number"
          id="normalPrice"
          {...register("normalPrice", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= Number(getValues().normalPrice) ||
              "Discount cant exceed regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditingCabin ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditingCabin ? "Edit Cabin" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
