import TripForm from "../../components/TripForm";

const CreateTrip = () => {
  // startLocation: string | object | undefined;
  // endLocation: string | object | undefined;
  // startTime: Date;
  // endTime: Date;
  // departureTime: Date;
  // repeat: number;
  // price: number;
  // type: string;
  // availableSeats: number;
  // expireAt: Date;
  return (
    <>
      <TripForm
        onSubmit={(values) => console.log("Create Trip:", values)}
        buttonText="Create Trip"
      />

      <TripForm
        initialValues={{
          startLocation: "Hà Nội",
          endLocation: "Hải Phòng",
          price: 500000,
          // ...các trường khác
        }}
        onSubmit={(values) => console.log("Update Trip:", values)}
        buttonText="Update Trip"
      />
    </>
  );
};

export default CreateTrip;
