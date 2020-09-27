import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    BarSeries,
    ValueAxis,
    ArgumentAxis
} from '@devexpress/dx-react-chart-material-ui';

const BarChart = ({ className, barData, ...rest }) => {
    return (
        <div>
            <Chart
                data={barData}
            >
                <ArgumentAxis />
                <ValueAxis />
                <BarSeries
                    valueField="count"
                    argumentField="username"
                    barWidth={0.3}
                    maxBarWidth={0.3}
                />
            </Chart>
        </div>
    );

}

export default BarChart;

//     }
// }
