import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import { useCreateGuest } from './useCreateGuest';

import Input from '../../ui/Input';
import Button from '../../ui/Button';

function CreateGuestForm(onCloseModal) {
  const { register, formState, handleSubmit } = useForm();
  const { createGuest, isCreating } = useCreateGuest();
  const { errors } = formState;

  function onSubmit(data) {
    createGuest(data);
  }
  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type="modal">
      <FormRow label="Full Name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isCreating}
          {...register('fullName', { required: 'This field is required' })}
        />
      </FormRow>
      <FormRow label="Email" error={errors?.email?.message}>
        <Input
          type="text"
          id="email"
          disabled={isCreating}
          {...register('email', { required: 'This field is required' })}
        />
      </FormRow>
      <FormRow label="National ID" error={errors?.nationalID?.message}>
        <Input
          type="text"
          id="nationalID"
          disabled={isCreating}
          {...register('nationalID', { required: 'This field is required' })}
        />
      </FormRow>
      <FormRow label="Nationality" error={errors?.nationality?.message}>
        <Input
          type="text"
          id="nationality"
          disabled={isCreating}
          {...register('nationality', { required: 'This field is required' })}
        />
      </FormRow>
      <FormRow label="Country Flag" error={errors?.countryFlag?.message}>
        <Input
          type="text"
          id="countryFlag"
          disabled={isCreating}
          {...register('countryFlag', { required: 'This field is required' })}
        />
      </FormRow>
      <FormRow>
        <Button disabled={isCreating}>Create Guest</Button>
      </FormRow>
    </Form>
  );
}

export default CreateGuestForm;
