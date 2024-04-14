return (
    <div className="w-full h-full flex bg-gray-200 px-2 py-[20px] justify-center align-center xl:px-[60px] xl:py-[50px]">
        <form className="w-full h-full bg-white px-3 py-5 xl:px-10">
          {/* Form */}
          {step === 1 && (
            <div className="mt-10  w-full border-2 border-black pt-5 px-4 xl:px-12 xl:py-10">

              {/* Date Section */}
              <div className='flex flex-col justify-between align-baseline mt-3 xl:flex-row'> 

                <div className="mb-10 flex justify-between align-baseline xl:flex-1 xl:mr-14">
                      <label htmlFor="startDate" 
                      className="block font-medium text-black mr-[10px] text-base">
                        Start Date
                      </label>

                      <input type="date" id="startDate" 
                        name="startDate" value={startDate} 
                        onChange={(e) => setStartDate(e.target.value)} 
                        className='border-2 rounded border-black px-5'
                        required
                      />
                  </div>

                  <div className="mb-10 flex justify-between align-baseline flex-1">

                      <label htmlFor="endDate" 
                      className="block font-medium text-black mr-[10px] text-base">
                        End Date
                      </label>

                      <input type="date" id="endDate" 
                        name="endDate" value={endDate} 
                        onChange={(e) => setEndDate(e.target.value)} 
                        className='border-2 rounded border-black px-5'
                        required
                        />
                  </div>

              </div>

              {/* Vehicle Section */}
              <div className='flex flex-col justify-between align-baseline '> 

                <div className='flex flex-col justify-between align-baseline xl:flex-row'>
                    <div className="mb-10 flex justify-between align-baseline xl:flex-1 xl:mr-14">

                      <label htmlFor="vehicleType" 
                      className="block font-medium text-black mr-[10px] text-base">
                        Vehicle Type
                      </label>

                      <select id="vehicleType" name="vehicleType" 
                      value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} 
                      className='border-2 rounded border-black px-14'
                      required
                      >
                          <option value="">Select......</option>
                          {vehcleTypes.map((type) => (
                            <option key={type.id} value={type}>{type}</option>
                          ))}
                      </select>

                      </div>


                </div>
                

                <div className="mb-10 flex justify-start align-baseline">

                      <label htmlFor="airCondition" 
                      className="block font-medium text-black text-base mr-8">
                        Air Condition
                      </label>

                      <input type="checkbox" id="airCondition" name="airCondition" 
                      checked={airCondition} onChange={(e) => setAirCondition(e.target.checked)} 
                      className=''
                      required
                      />

                  </div>

              </div>


              {/* Passenger Count */}
              <div>

                <div className="mb-10 flex justify-between align-baseline xl:justify-start">

                  <label htmlFor="passengerCount" 
                  className="block font-medium text-black mr-[5px] text-base xl:mr-7">
                    No of Passengers
                  </label>

                  <input type="number" id="passengerCount" name="passengerCount" 
                  value={passengerCount}
                  onChange={(e) => setPassengerCount(e.target.value)} 
                  className='border-2 rounded border-black'
                  required
                  />

                </div> 

              </div>     

            </div>
          )}

            {/*Section 2 */}
          {step === 2 && (
            
            <div className="mt-5 px-2">
              {/* Vehicle and driver section */}
              <div className='flex justify-between align-baseline mb-8 '>
                  <div className=" flex flex-col justify-between align-baseline xl:flex-1 xl:mr-14 xl:flex-row">

                    <label htmlFor="AssignVehicle" 
                      className="block font-medium text-black mr-[10px] text-base">
                        Select Vehicle
                    </label>

                    <select id="vehicle" name="vehicle" 
                      value={vehicle} onChange={(e) => setVehicle(e.target.value)} 
                      className='border-2 rounded border-black px-14'
                      required
                      >
                        <option value="">Select Vehicle</option>
                        {filteredVehicles.map((vehicle) => (
                          <option key={vehicle.id} value={vehicle._id}>{vehicle.vehicleRegister}</option>
                        ))}
                    </select>

                  </div>

                  <div className=" flex flex-col justify-between align-baseline xl:flex-1 xl:flex-row">
                    <label htmlFor="assignDriver" 
                      className="block font-medium text-black mr-[10px] text-base">
                        Select Driver
                    </label>

                    <select id="driverList" name="driverList" 
                      value={driver} onChange={(e) => setDriver(e.target.value)} 
                      className='border-2 rounded border-black px-14'
                      required
                      >
                        <option value="">Select Driver</option>
                          {DriversData.map((driver) => (
                            <option key={driver.id} value={driver._id}>{driver.firstName} {driver.lastName}</option>
                          ))}
                    </select>
                  </div>

              </div>

              {/* Trip details */}
              <div className='xl:flex xl:flex-col xl:justify-between xl:align-baseline'>
                
                <div>
                  <div className='mb-2'><h2 className='font-medium text-black  text-base'>Start Point : </h2></div>
                  
                  <div>
                    <div className='flex justify-between align-baseline mb-7'>
                      <div className=" flex flex-col justify-between align-baseline mr-2 xl:flex-row xl:flex-1 xl:mr-14">

                        <label htmlFor="startPointNo" 
                        className="block font-medium text-black  text-base xl:mr-7">
                          No
                        </label>

                        <input type="text" id="startPointNo" name="startPointNo" 
                        value={startPointNo}
                        onChange={(e) => setStartPointNo(e.target.value)} 
                        placeholder='House Number'
                        className='border-2 rounded border-black px-4'
                        required
                        />

                      </div> 
                      

                      <div className=" flex flex-1 flex-col justify-between align-baseline xl:flex-row xl:flex-1">

                        <label htmlFor="startPointStreet" 
                        className="block font-medium text-black mr-[5px] text-base xl:mr-7">
                          Street
                        </label>

                        <input type="text" id="startPointStreet" name="startPointStreet" 
                        value={startPointStreet}
                        onChange={(e) => setStartPointSteet(e.target.value)} 
                        placeholder='Street'
                        className='border-2 rounded border-black px-4'
                        required
                        />

                      </div>
                      
                    </div>

                    <div className='flex justify-between align-baseline mb-7'>
                      <div className=" flex  flex-col align-baseline xl:flex-row xl:flex-1">

                        <label htmlFor="startPointCity" 
                        className="block font-medium text-black mr-[5px] text-base xl:mr-7">
                          City
                        </label>

                        <input type="text" id="startPointCity" name="startPointCity" 
                        value={startPointCity}
                        onChange={(e) => setStartPointCity(e.target.value)} 
                        placeholder='City'
                        className='border-2 rounded border-black px-4 ml-10'
                        required
                        />

                      </div>
                    </div>
                  </div>

                </div>

                <div className='flex justify-between align-baseline mb-7'>
                  <div className=" flex flex-col align-baseline xl:flex-row xl:flex-1">

                    <label htmlFor="endPoint" 
                    className="block font-medium text-black mr-[5px] text-base xl:mr-7">
                      End Point
                    </label>

                    <input type="text" id="endPoint" name="endPoint" 
                    value={endPoint}
                    onChange={(e) => setEndPoint(e.target.value)} 
                    placeholder='Destination'
                    className='border-2 rounded border-black px-4'
                    required
                    />

                  </div>
                  
                </div>

                <div className='flex justify-between'>

                  <div className="mb-7  flex flex-col align-baseline xl:flex-row xl:flex-1 xl:mr-14">

                    <label htmlFor="startTime" 
                    className="block font-medium text-black mr-[5px] text-base xl:mr-7">
                      Start Time
                    </label>

                    <input type="time" id="startTime" name="startTime" 
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)} 
                    className='border-2 px-2 rounded border-black xl:px-4'
                    required
                    />

                  </div>
 
                  
                </div>

                <div  className='flex justify-between align-baseline xl:justify-start'>  

                  <div className="mb-6 flex justify-start align-baseline xl:mr-16">

                    <label htmlFor="tripType" 
                    className="block font-medium text-black text-base mr-8">
                      Round Trip
                    </label>

                    <input type="checkbox" id="roundtrip" name="roundtrip" 
                    checked={tripType} onChange={(e) => setTripType(e.target.checked)} 
                    className=''
                    required
                    />

                    </div>

                    <div className="mb-6 flex justify-between align-baseline xl:justify-start">

                    <label htmlFor="distance" 
                    className="block font-medium text-black mr-[5px] text-base xl:mr-7">
                      distance
                    </label>

                    <input type="number" id="distance" name="distance" 
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)} 
                    placeholder='Estimate distance'
                    className='border-2 rounded border-black px-4'
                    required
                    />

                  </div>

                </div>
                

                

              </div>

              

            </div>
          )}

          {step === 3 && (
              <div className='mt-7'> 
                  <div className=''> 
                      <div className="mb-7 flex justify-start align-baseline xl:justify-start">
                          <label htmlFor="cusName" className="block mr-7 font-medium text-black text-base ">
                              Name
                          </label>
                          <input 
                              type="text" 
                              id="cusName" 
                              name="cusName" 
                              value={cusName}
                              onChange={(e) => setCusName(e.target.value)} 
                              placeholder='Customer Name'
                              className='border-2 rounded border-black w-[100%] px-2 xl:px-4'
                              required
                          />
                      </div>

                      <div className="mb-7 flex justify-start align-baseline xl:justify-start">
                          <label htmlFor="cusEmail" className="block font-medium text-black mr-7 text-base xl:mr-7">
                              Email
                          </label>
                          <input 
                              type="email" 
                              id="cusEmail" 
                              name="cusEmail" 
                              value={cusEmail}
                              onChange={(e) => setCusEmail(e.target.value)} 
                              placeholder='Customer Email'
                              className='border-2 rounded border-black w-[100%] px-2 xl:px-4'
                              required
                          />
                      </div>

                      <div className='flex justify-between'>
                          <div className="mb-7 flex flex-col justify-between align-baseline xl:flex-row xl:flex-1 xl:mr-14">
                              <label htmlFor="cusMobile" className="block font-medium text-black mr-[5px] text-base xl:mr-7">
                                  Mobile
                              </label>
                              <input 
                                  type="tel" 
                                  id="cusMobile" 
                                  name="cusMobile" 
                                  value={cusMobile}
                                  onChange={(e) => setCusMobile(e.target.value)} 
                                  placeholder='Customer Mobile No'
                                  className='border-2 px-2 rounded border-black xl:px-4'
                                  required
                              />
                          </div>

                          <div className="mb-7 flex flex-col justify-between align-baseline xl:flex-row xl:flex-1">
                              <label htmlFor="cusNic" className="block font-medium text-black mr-[5px] text-base xl:mr-7">
                                  Nic
                              </label>
                              <input 
                                  type="text" 
                                  id="cusNic" 
                                  name="cusNic" 
                                  value={cusNic}
                                  onChange={(e) => setCusNic(e.target.value)} 
                                  placeholder='Customer NIC'
                                  className='border-2 px-2 rounded border-black xl:px-4'
                                  required
                              />
                          </div> 
                      </div>
                  </div>
              </div>
          )}


            {/* Confirmation */}
          {step === 4 && (
            <div>
              <div className="mt-3 px-4">
                <h2 className="text-2xl font-semibold text-center mb-4 underline ">Confirmation</h2>
              </div>

              <div className=' xl:flex justify-between'>
                <div className='mr-[20px]'>

                  <p className=' text-lg font-semibold leading-8'>Start Date : &nbsp;&nbsp; {startDate}</p>
                  <p className=' text-lg font-semibold leading-8'>End Date : &nbsp;&nbsp; {endDate}</p>
                  <p className=' text-lg font-semibold leading-8'>Vehicle Type : &nbsp;&nbsp; {vehicleType}</p>
                  <p className=' text-lg font-semibold leading-8'>Air Condition : &nbsp;&nbsp; {airCondition ? 'With Air Condition' : 'Without Air Condition'}</p>
                  <p className=' text-lg font-semibold leading-8'>No of Passengers : &nbsp;&nbsp; {passengerCount}</p>
                  <p className=' text-lg font-semibold leading-8'>Assigned Vehicle : &nbsp;&nbsp; {vehicle}</p>
                  <p className=' text-lg font-semibold leading-8'>Assigned Vehicle Model : &nbsp;&nbsp; {vehicle}</p>
                  <p className=' text-lg font-semibold leading-8'>Assigned Driver : &nbsp;&nbsp; {driver}</p>

                </div>

                <div className='mr-[20px]'>

                  <p className='text-lg font-semibold leading-8'>Start Point :&nbsp;&nbsp;{startPointNo} {startPointStreet} {startPointCity}</p>
                  <p className=' text-lg font-semibold leading-8'>End Point : &nbsp;&nbsp; {endPoint}</p>
                  <p className=' text-lg font-semibold leading-8'>Start Time : &nbsp;&nbsp; {startTime}</p>
                  <p className=' text-lg font-semibold leading-8'>Round Trip : &nbsp;&nbsp; {tripType ? 'Yes' : 'No'}</p>
                  <p className=' text-lg font-semibold leading-8'>distance : &nbsp;&nbsp; {distance}</p>
                  <p className=' text-lg font-semibold leading-8'>Customer Name : &nbsp;&nbsp; {cusName}</p>
                  <p className=' text-lg font-semibold leading-8'>Customer Email : &nbsp;&nbsp; {cusEmail}</p>
                  <p className=' text-lg font-semibold leading-8'>Customer Mobile : &nbsp;&nbsp; {cusMobile}</p>
                  <p className=' text-lg font-semibold leading-8'>Customer NIC : &nbsp;&nbsp; {cusNic}</p>

                </div>
                
                </div>
            </div>
          )}

            {/* Receipt */}
          {step === 5 && (
            <div>
              <div className="mt-3 px-4">
                <h2 className="text-2xl font-semibold text-center mb-4 underline ">Receipt</h2>
              </div>

              <div className=' xl:flex justify-between'>
                <div className='mr-[20px]'>

                  <p className=' text-lg font-semibold leading-8'>Estimated distance : &nbsp;&nbsp;{distance} Km</p>          
                  <p className=' text-lg font-semibold leading-8'>Estimated Total : &nbsp;&nbsp;Rs. {estimatedTotal}</p>
                </div>

                <div className='mr-[20px]'>

                  <p className=' text-lg font-semibold leading-8'>Vehicle Fare(perKm) : &nbsp;&nbsp;Rs. </p>
                  <p className=' text-lg font-semibold leading-8'>Advanced Payment : &nbsp;&nbsp;Rs. {advancedPayment}</p>

                </div>
                
                </div>
            </div>
          )}

          <div className={`flex ali mt-8 px-4 justify-between`}>
            {step === 1 && (
              <button type='button' className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-4 place-" onClick={cancel}>
              Cancel
            </button>
            )} 
            {step !== 1 && (
              <button type='button' className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-4 place-" onClick={handlePrevStep}>
                Previous
              </button>
            )}
            {step !== 5 ? (
              <button type='button' className="px-4 py-2 text-white bg-actionBlue rounded-md hover:bg-gray-800 focus:outline-none" onClick={handleNextStep}>
                Next
              </button>
            ) : (
              <button type='submit' className="px-4 py-2 text-white bg-actionGreen rounded-md hover:bg-green-600 focus:outline-none" onClick={submit}>
                Submit
              </button>
            )}
            
          </div>

        </form>
        
      
    </div>
  );