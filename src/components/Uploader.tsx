import { useState } from "react";

export default function Uploader() {
    const [buses, setBuses] = useState([]);

    function isTrackingOrion (bus) {
        const number = bus.MonitoredVehicleJourney.VehicleRef;
        const parsedNum = parseInt(number.replace(/\D/g, ''));
        return (bus.MonitoredVehicleJourney.MonitoredCall && ((parsedNum >= 4300 && parsedNum <= 4702) || (parsedNum >= 7000 && parsedNum <= 7089)))
    }

    const handleChange = e => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            console.log("e.target.result", e.target.result);
            const parsed = JSON.parse(e.target.result);

            setBuses(parsed.Siri.ServiceDelivery.VehicleMonitoringDelivery[0].VehicleActivity.filter(isTrackingOrion));

        };

    };
    return (
        <>
            <input type="file" onChange={handleChange} />
            <br />
            <div>
                {buses.map((bus) => (
                    <div key={bus.MonitoredVehicleJourney.VehicleRef}>
                        <p>{bus.MonitoredVehicleJourney.VehicleRef.replace(/\D/g, '')} on {bus.MonitoredVehicleJourney.PublishedLineName} @ {bus.MonitoredVehicleJourney.MonitoredCall.StopPointName} bound for {bus.MonitoredVehicleJourney.DestinationName}</p>
                    </div>
                ))}
            </div>
        </>
    );
}