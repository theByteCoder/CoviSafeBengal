import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Bar } from 'react-chartjs-2';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "inline",
        backgroundColor: "#fff",
        color: "rgba(255, 255, 255, 0.7)",
    },
    welcomeHeaderGap: {
        marginTop: 10,
        color: 'white !important'
    },
    chartContainer: {
        backgroundColor: "white"
    }
}));

const Daily = () => {
    const classes = useStyles();

    const [date, setDate] = useState("");
    const [confirmed, setConfirmed] = useState("");
    const [deceased, setDeceased] = useState("");
    const [recovered, setRecovered] = useState("");
    const [tested, setTested] = useState("");
    const [vaccinated, setVaccinated] = useState("");

    const data = {
        labels: [date],
        datasets: [
            {
                label: 'Confirmed',
                data: [confirmed],
                backgroundColor: 'rgb(255, 99, 132)',
            },
            {
                label: 'Deceased',
                data: [deceased],
                backgroundColor: 'rgb(54, 162, 235)',
            },
            {
                label: 'Recovered',
                data: [recovered],
                backgroundColor: 'rgb(75, 192, 192)',
            },
            // {
            //     label: 'Tested',
            //     data: [tested],
            //     backgroundColor: 'rgb(245 216 5 / 70%)',
            // },
            // {
            //     label: 'Vaccinated',
            //     data: [vaccinated],
            //     backgroundColor: 'rgb(115 0 0 / 70%)',
            // },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    useEffect(() => {
        fetch("https://api.covid19india.org/v4/min/data.min.json").then((response) => {
            if (response.ok) {
                response.json().then((response) => {
                    setDate(response['WB'].meta.tested.last_updated);
                    setConfirmed(response['WB'].total['confirmed']);
                    setDeceased(response['WB'].total['deceased']);
                    setRecovered(response['WB'].total['recovered']);
                    setTested(response['WB'].total['tested']);
                    setVaccinated(response['WB'].total['vaccinated']);
                });
            }
        });
    }, []);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Typography
                className={classes.welcomeHeaderGap}
                variant="body1"
                component="p" >
                West Bengal Covid Data for {date}
            </Typography>
            <ul>
                <li> Confirmed {confirmed} </li>
                <li> Deceased {deceased} </li>
                <li> Recovered {recovered} </li>
                <li> Tested {tested} </li>
                <li> Vaccinated {vaccinated}. </li>
            </ul>
            <div className={classes.chartContainer}>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default Daily;
