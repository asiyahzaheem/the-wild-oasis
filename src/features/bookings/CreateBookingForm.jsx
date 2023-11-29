import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import Spinner from '../../ui/Spinner';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useCreateBooking } from './useCreateBooking';
import { useSettings } from '../settings/useSettings';
import { addDays, differenceInDays, format } from 'date-fns';
import { useCabins } from '../cabins/useCabins';
import { useGuest } from '../guests/useGuest';
import { useNavigate } from 'react-router-dom';
import { getToday } from '../../utils/helpers';

function CreateBookingForm(onCloseModal) {
  const navigate = useNavigate();
  const { createBooking, isCreating } = useCreateBooking();
  const { cabins, isLoading: isLoadingCabins } = useCabins();
  const { guest, isLoading: isLoadingGuest } = useGuest();
  const { isLoading: isLoadingSettings, settings: { breakfastPrice } = {} } =
    useSettings();
  const { register, getValues, reset, formState, handleSubmit } = useForm();
  const { errors } = formState;
  const today = new Date(getToday());

  if (isLoadingCabins || isLoadingGuest || isLoadingSettings)
    return <Spinner />;

  // default vals

  function onSubmit(data) {
    const {
      startDate,
      endDate,
      cabinId,
      numGuests,
      hasBreakfast,
      isPaid,
      observations,
    } = data;

    const status = 'unconfirmed';
    const numNights = differenceInDays(new Date(endDate), new Date(startDate));
    const { regularPrice: cabinPrice } =
      cabins.find((cabin) => cabin.id === Number(cabinId)) || 0;
    const extrasPrice = hasBreakfast
      ? numNights * numGuests * breakfastPrice
      : 0;
    const totalPrice = cabinPrice + extrasPrice;
    const { id: guestId } = guest.at(0);

    const newBooking = {
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      numNights,
      numGuests: Number(numGuests),
      cabinPrice,
      extrasPrice,
      totalPrice,
      status,
      hasBreakfast,
      isPaid,
      observations,
      cabinId,
      guestId,
    };
    createBooking(newBooking, {
      onSuccess: (data) => {
        reset();
        navigate(`/bookings/${data.id}`);
        // onCloseModal?.();
      },
    });
  }
  function onError(errors) {
    console.log(errors);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type="modal">
      <FormRow label="Check-in" error={errors?.startDate?.message}>
        <Input
          type="date"
          id="startDate"
          disabled={isCreating}
          min={format(today, 'yyyy-MM-dd')}
          {...register('startDate', { required: 'This field is required' })}
        />
      </FormRow>
      <FormRow label="Check-out" error={errors?.endDate?.message}>
        <Input
          type="date"
          id="endDate"
          defaultValue={format(today, 'yyyy-MM-dd')}
          disabled={isCreating}
          min={format(
            addDays(new Date(getValues()?.startDate || today), 1),
            'yyyy-MM-dd'
          )}
          {...register('endDate', { required: 'This field is required' })}
        />
      </FormRow>
      <FormRow label="Numbers of Guests" error={errors?.numGuests?.message}>
        <Input
          type="number"
          id="numGuests"
          disabled={isCreating}
          {...register('numGuests', { required: 'This field is required' })}
        />
      </FormRow>
      <FormRow label="Cabin ID" error={errors?.cabinId?.message}>
        <Input
          type="text"
          id="cabinId"
          disabled={isCreating}
          {...register('cabinId', { required: 'This field is required' })}
        />
      </FormRow>
      <FormRow label="Breakfast" error={errors?.hasBreakfast?.message}>
        <Input
          type="checkbox"
          id="hasBreakfast"
          disabled={isCreating}
          {...register('hasBreakfast')}
        />
      </FormRow>
      <FormRow label="Paid" error={errors?.isPaid?.message}>
        <Input
          type="checkbox"
          id="isPaid"
          disabled={isCreating}
          {...register('isPaid')}
        />
      </FormRow>
      <FormRow label="Extra details" error={errors?.observations?.message}>
        <Input
          type="textarea"
          id="observations"
          disabled={isCreating}
          {...register('observations')}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating}>Create Booking</Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
