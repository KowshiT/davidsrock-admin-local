
import { image11, image12, image13, image14, image15, image16 } from "@/assetsLayer";
import RoundedButton from "../../../../../../components/Buttons/RoundedButtons";
import Section, { SectionColumn, SectionRow } from "@/layouts/section";
import Image from "next/image";
import React, { useContext, useState, useEffect } from "react";
import { EventCreateStageContext } from "@/contexts/eventContext/eventCreateStageContext";
import { CreateEventContext } from "@/contexts/createEventContext/createEventContext";

export interface CreateOrganizationProps { }

const CreateEventStep01Location: React.FC<CreateOrganizationProps> = (props) => {
  const [name, setName] = useState("")
  const { setEventCreateStageCount } = useContext(EventCreateStageContext);
  const { eventLocation, setEventLocation } = React.useContext(CreateEventContext);

  useEffect(() => {
    if (eventLocation) {
      setName(eventLocation);
    }
  }, [])

  const handleNext = () => {
    setEventLocation(name);
    setEventCreateStageCount(3)
  }
  const handleBack = () => {
    setEventCreateStageCount(1)
  }

  const DefaultLocation = { lat: 10, lng: 106 };
  const DefaultZoom = 10;

  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);
  const [submitClicked, setSubmitClicked] = useState(false);

  function handleChangeLocation(lat, lng) {
    setLocation({ lat: lat, lng: lng });
  }

  function handleChangeZoom(newZoom) {
    setZoom(newZoom);
  }

  function handleResetLocation() {
    setDefaultLocation({ ...DefaultLocation });
    setZoom(DefaultZoom);
  }

  let Roadmap = "roadmap"

  return (
    <React.Fragment>
      <div className="homeRightMainSec2 pb-4">
        <div className="grid justify-items-center ">
          <span className="createOrganizationTxt mt-8">
            Add Location
          </span>
          <span className="createOrganizationTxt05 mt-4">
            Add a name for the physical location <br /> for people to join your event.
          </span>
          <br />
          <br />
          {/* <Autocomplete
                className="eventNameInput"
                apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8'
                onPlaceSelected={(place) => {
                    console.log(place);
                }}
            /> */}
          <SectionColumn>
            <span className="textinputtitle ml-1">Location</span>
            <input
              placeholder="Enter Location"
              type="text"
              name="Location"
              maxLength={50}
              className={
                submitClicked && name.length === 0
                  ? "inputBaseInput organizationNameInput validationErrorBorder mt-1"
                  : "inputBaseInput organizationNameInput mt-1"
              }
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {submitClicked && name.length === 0 ? (
              <div className="validationError">
                <p>Location is required</p>
              </div>
            ) : null}
          </SectionColumn>
          {/* <button onClick={handleResetLocation}>Reset Location</button>
                <MapPicker defaultLocation={defaultLocation}
                    zoom={zoom}
                    mapTypeId= "roadmap"
                    style={{height:'300px'}}
                    onChangeLocation={handleChangeLocation} 
                    onChangeZoom={handleChangeZoom}
                    apiKey='AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8'/> */}
          <br />
          <br />
          <SectionRow className="ml-4 mt-8">

            <RoundedButton
              ref={undefined}
              onClick={(e: any) => {
                handleBack()
              }}
              className='BackBTN mr-3'>
              Back
            </RoundedButton>
            <RoundedButton
              ref={undefined}
              onClick={(e: any) => {
                name.length > 0 ? handleNext() : setSubmitClicked(true);
              }}
              className='NextBTN '>
              Next
            </RoundedButton>
          </SectionRow>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateEventStep01Location;
