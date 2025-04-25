import useSWR from "swr";

export default function Uhhhhh() {
    const {data, error} = useSWR(
        'https://api-v3.mbta.com/vehicles?filter[id]=y1295,y1296,y1297,y1298,y1299&include=stop,route',
        (url) => fetch(url).then((res) => res.json())
    );

    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;
    if (!data.data[0]) return <div>none in service</div>

    function trouver(id, num) {
        const item = data.included.find(entry => entry.id === id);
        if (item.type === "route" && num === 2) return item.attributes.short_name;
        else if (num === 2) return item.attributes.name;
        else return item.attributes.direction_destinations[num]
    }

    return (
        <>
            {data.data.map((vehicle) =>(
            <div key={vehicle.id}>
                <p>{vehicle.attributes.label} on {trouver(vehicle.relationships.route.data.id, 2)} @ {trouver(vehicle.relationships.stop.data.id, 2)} bound for {trouver(vehicle.relationships.route.data.id, vehicle.attributes.direction_id)}</p>
            </div>
                ))}
        </>
    )

}