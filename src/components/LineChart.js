import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    useTheme,
    makeStyles,
    colors
} from '@material-ui/core';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    LineSeries,
    Title,
    Legend,
} from '@devexpress/dx-react-chart-material-ui';
import { withStyles } from '@material-ui/core/styles';
import { Animation } from '@devexpress/dx-react-chart';

import { confidence as data } from './smaple-data';

const format = () => tick => tick;
const legendStyles = () => ({
    root: {
        display: 'flex',
        margin: 'auto',
        flexDirection: 'row',
    },
});
const legendLabelStyles = theme => ({
    label: {
        paddingTop: theme.spacing(1),
        whiteSpace: 'nowrap',
    },
});
const legendItemStyles = () => ({
    item: {
        flexDirection: 'column',
    },
});

const legendRootBase = ({ classes, ...restProps }) => (
    <Legend.Root {...restProps} className={classes.root} />
);
const legendLabelBase = ({ classes, ...restProps }) => (
    <Legend.Label className={classes.label} {...restProps} />
);
const legendItemBase = ({ classes, ...restProps }) => (
    <Legend.Item className={classes.item} {...restProps} />
);
const Root = withStyles(legendStyles, { name: 'LegendRoot' })(legendRootBase);
const Label = withStyles(legendLabelStyles, { name: 'LegendLabel' })(legendLabelBase);
const Item = withStyles(legendItemStyles, { name: 'LegendItem' })(legendItemBase);
const demoStyles = () => ({
    chart: {
        paddingRight: '20px',
    },
    title: {
        whiteSpace: 'pre',
    },
});

const ValueLabel = (props) => {
    const { text } = props;
    return (
        <ValueAxis.Label
            {...props}
            text={`${text}%`}
        />
    );
};

const titleStyles = {
    title: {
        whiteSpace: 'pre',
    },
};
const TitleText = withStyles(titleStyles)(({ classes, ...props }) => (
    <Title.Text {...props} className={classes.title} />
));

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
                <ArgumentAxis />
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
