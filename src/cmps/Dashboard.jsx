import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';


export const Dashboard = ({ orders }) => {

    let stayAppear = {}
    const stays = orders.map(order => {
        stayAppear[order.stay.name] = stayAppear[order.stay.name] + 1


    })
    const data = {
        labels: Object.keys(stayAppear),
        datasets: [
            {
                label: '# of Votes',
                data: Object.values(stayAppear),
                backgroundColor: [
                    'green',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    // 'rgba(75, 192, 192, 0.2)',
                    // 'rgba(153, 102, 255, 0.2)',
                    // 'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    // 'rgba(255, 206, 86, 1)',
                    // 'rgba(75, 192, 192, 1)',
                    // 'rgba(153, 102, 255, 1)',
                    // 'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 4,
            },
        ],
    };

    return (
        <div>
            {/* <Bar data={data} /> */}
            < Bar data={data} />
        </div>
    )

};

