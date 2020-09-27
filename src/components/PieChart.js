import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Chart,
    PieSeries,
} from '@devexpress/dx-react-chart-material-ui';

const PieChart = ({ className, itemData, ...rest }) => {
    return (
        <div>
            <Chart
                data={itemData}
            >
                <PieSeries
                    valueField="post_likes"
                    argumentField="username"
                />
            </Chart>
        </div>
    );
}

export default PieChart;