# Air Quality Web Client

This is a tiny and simple client to read data from a Supabase table containing air quality data.  The air quality data, in turn, is being logged to the database via a server app running on a device.  The device is a Pi (Pico or Zero) with an I2C-based sensor.  

This client will not work without the Supabase table environment values.  Current Supabase project has been permanently paused due to their policy and a new project must be created using the same schema.

The next step is to point __this__ web client directly at the device with the sensor, so as to display the realtime data OR maybe even simultanously load data to the database tables at the same time.  Then also pull up historical data using a db query.

Life goes on.  May circle back to this later.  The Sensor has been moved from location to location and is probably in a box right now!

## Using the client
The client needs Supabase to read the data from a pre-defined table.  Data also must follow the schema, naturally.  Schema not published here, but there is a `temperature` column and a `created_at` column, for example.

Next step would be to read realtime data directly from the server API on the Pi device with the sensor.  The server could still publish historical data to the database.

```bash 
npm i
```

``` 
# add a Supabase key and table to the .env file to persist data

SUPABASE_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SUPABASE_TABLE=air-quality-readings
```


```bash 
npm run dev

# To build, a Svelte production adapter must be configured.  This will allow building for Node.js, a static site, etc.
```


## Tech Stack
- Hardware on the server side
    * Pi Pico or Pi Zero
    * Air quality sensor (data can be mapped from different sensors using JSON)
- Server
    * The server running on the device (located on Github as air-quality-sensor-server)
- Client stack uses:
    * Supabase for retrieving data
    * Svelte for client UI and loading data
    * Chart.js to graph the data
    * Date-fns for convenience