import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIcon from '@material-ui/icons/Phone';
import TabletIcon from '@material-ui/icons/Tablet';
import PieChart from '../../components/PieChart';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const FacebookLikePercent = ({ className, itemData, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();


  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Like %" />
      <Divider />
      <CardContent>
        <Box
          height={500}
          position="relative"
        >
          <PieChart itemData={itemData} />
        </Box>
      </CardContent>
    </Card>
  );
};

FacebookLikePercent.propTypes = {
  className: PropTypes.string
};

export default FacebookLikePercent;
