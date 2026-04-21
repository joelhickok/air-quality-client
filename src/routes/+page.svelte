<script>
    import {createClient} from '@supabase/supabase-js';
    import {orderBy} from 'lodash-es';
    import {subDays, subHours, format, parseJSON, formatISO, formatISO9075,} from 'date-fns';
    import {onMount} from 'svelte';
    import 'chartist/dist/index.css';
    import moment from 'moment';
    import Chart from 'chart.js/auto'
    import {Colors} from 'chart.js';
    import 'chartjs-adapter-date-fns';

    Chart.register(Colors);

    const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmcHBscGppeXN6ZHdwcmdzcGJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYzMzU3NzEsImV4cCI6MjAyMTkxMTc3MX0.FFWtgNmZUBl_YyBITsPdioQQo2mSErNX2ty5WavOyVc'
    const supabaseClient = createClient('https://wfpplpjiyszdwprgspbo.supabase.co', key)

    const run = async () => {
        const Chartist = await import('chartist')

        const now = new Date()
        const a = subHours(now, 8);

        let response = await supabaseClient.from('air-quality-readings').select()
        // .filter('created_at', 'gte', a.toISOString())

        let data = response.data
        let error = response.error

        if (error) {
            console.log(error)
        }

        if (!data) {
            data = []
        }

        // const formatString = 'yyyy-MM-dd'
        const formatString = 'yy-MM-dd H:mm'

        console.log(`Got ${data.length} records`)

        const formatDate = value => parseJSON(value)

        Chart.defaults.backgroundColor = 'dodgerblue';
        Chart.defaults.borderColor = 'grey';
        Chart.defaults.color = 'navy';
        Chart.defaults.font.size = 10;

        new Chart(
            document.getElementById('acquisitions'),
            {
                type: 'line',
                options: {
                    parsing: false,
                    animation: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Test',
                        },
                        legend: {
                            display: true
                        },
                        tooltip: {
                            enabled: true
                        }
                    },
                    layout: {
                        padding: 5
                    },
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'hour',
                                parser(e) {
                                    // console.log(e)
                                    return e
                                },
                                // displayFormats: {
                                //     day: 'MM DD'
                                // }
                            }
                        },
                        y: {
                            suggestedMin: 70,
                            suggestedMax: 73,
                        },
                    },
                },
                data: {
                    labels: data.map(row => row.created_at),
                    datasets: [
                        {
                            label: 'Temperature',
                            data: data.map(row => {
                                return {
                                    x: parseJSON(row.created_at),
                                    y: row.temperature,
                                }
                            }),
                            // borderColor: 'red',
                            // backgroundColor: 'maroon',
                            // fill: false,
                        }
                    ]
                }
            }
        );
    }

    onMount(async () => {
        await run()
    })

</script>

<div style="width: 800px;">
    <canvas id="acquisitions"></canvas>
</div>
