
<html>
    <head>
       <title>Case File Form</title>
    </head>

    <body>
       <h2>Car Accident or Emergancy Details Form</h2>
    <div>
    <form>
        <legend>Select the type of case</legend>
        <div>
            <input type="radio" id="carAccident" name="caseType" value="carAccident"/>
            <label htmlFor="carAccident">Car Accident</label>

            <input type="radio" id="emergancy" name="caseType" value="emergancy"/>
            <label htmlFor="emergancy">Emergancy</label>
        </div>

        <div>
            <label htmlFor="DriverID">Driver ID:</label>
            <input type="text" id="DriverID" name="DriverID"/>
        </div>

        <div>
            <label htmlFor="plateNo">Vehicle Plate Number:</label>
            <input type="text" id="plateNo" name="plateNo"/>
        </div>

        <div>
            <label htmlFor="location">Location:</label>
            <input type="text" id="location" name="location"/>
        </div>

        <div>
            <label htmlFor="date">Date:</label>
            <input type="date" id="date" name="date"/>
        </div>

        <div>
            <label htmlFor="time">Time:</label>
            <input type="time" id="time" name="time"/>
        </div>
    </form>
    </div>








</body>
</html>


