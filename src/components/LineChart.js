import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    useTheme,
    makeStyles,
} from '@material-ui/core';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    LineSeries,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { Animation } from '@devexpress/dx-react-chart';

const format = () => tick => tick;

const demoStyles = () => ({
    chart: {
        paddingRight: '20px',
    },
    title: {
        whiteSpace: 'pre',
    },
});



const useStyles = makeStyles(() => ({
    root: {},
    chart: {
        paddingRight: '20px',
    },
    title: {
        whiteSpace: 'pre',
    },
}));

const DailyCommentLineBar = ({ className, itemData, ...rest }) => {
    const classes = useStyles();
    const theme = useTheme();
    console.log(itemData);
    return (
        <Paper>
            <Chart
                data={itemData}
                className={classes.chart}
            >
                <ArgumentAxis tickFormat={format} />
                <ValueAxis />
                <LineSeries
                    valueField="count"
                    argumentField="comment_date"
                    barWidth={0.3}
                    maxBarWidth={0.3}

                />
                <Animation />
            </Chart>
        </Paper>
    );
}
//     }
// }

export default withStyles(demoStyles, { name: 'Demo' })(DailyCommentLineBar);
