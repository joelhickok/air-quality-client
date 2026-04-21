<script>
    import { createClient } from "@supabase/supabase-js";
    import { subHours, parseJSON } from "date-fns";
    import { onMount } from "svelte";
    import Chart from "chart.js/auto";
    import { Colors } from "chart.js";
    import "chartjs-adapter-date-fns";

    Chart.register(Colors);

    export let params;

    const DB_KEY = import.meta.env.VITE_SUPABASE_KEY
    const DB_TABLE = import.meta.env.VITE_SUPABASE_TABLE

    const supabaseClient = createClient(
        "https://wfpplpjiyszdwprgspbo.supabase.co",
        DB_KEY,
    );

    const run = async () => {
        // Filter using a start data
        const now = new Date();

        // Start date is now, minus 8 hours
        const a = subHours(now, 8);

        let response = await supabaseClient
            .from(import.meta.env.VITE_SUPABASE_TABLE)
            .select(DB_TABLE);
        // .filter('created_at', 'gte', a.toISOString())

        let data = response.data || [];
        let error = response.error;

        if (error) {
            console.log("Database is unavailable.");
            console.log(`Error: ${error.message}`);
        }

        console.log(`Got ${data.length} records`);

        const formatDate = (value) => parseJSON(value);

        Chart.defaults.backgroundColor = "dodgerblue";
        Chart.defaults.borderColor = "grey";
        Chart.defaults.color = "navy";
        Chart.defaults.font.size = 10;

        const el = document.getElementById("data");

        new Chart(el, {
            type: "line",
            options: {
                parsing: false,
                animation: true,
                plugins: {
                    title: {
                        display: true,
                        text: "Test",
                    },
                    legend: {
                        display: true,
                    },
                    tooltip: {
                        enabled: true,
                    },
                },
                layout: {
                    padding: 5,
                },
                scales: {
                    x: {
                        type: "time",
                        time: {
                            unit: "hour",
                            parser(e) {
                                // console.log(e)
                                return e;
                            },
                            // displayFormats: {
                            //     day: 'MM DD'
                            // }
                        },
                    },
                    y: {
                        suggestedMin: 70,
                        suggestedMax: 73,
                    },
                },
            },
            data: {
                labels: data.map((row) => row.created_at),
                datasets: [
                    {
                        label: "Temperature",
                        data: data.map((row) => {
                            return {
                                x: parseJSON(row.created_at),
                                y: row.temperature,
                            };
                        }),
                        // borderColor: 'red',
                        // backgroundColor: 'maroon',
                        // fill: false,
                    },
                ],
            },
        });
    };

    onMount(async () => {
        // pull the data once Svelte component loads
        await run();
    });
</script>

<div style="width: 800px;">
    <canvas id="data" width="800" height="500" />
</div>
