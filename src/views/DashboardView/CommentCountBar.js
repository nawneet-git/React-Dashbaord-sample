import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
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
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import BarChart from '../../components/BarChart';

const useStyles = makeStyles(() => ({
  root: {}
}));

const CommentCountBar = ({ className, itemData, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        title="Latest Comments"
      />
      <Divider />
      <CardContent>
        <Box
          height={500}
          position="relative"
        >
          <BarChart barData={itemData} />
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

CommentCountBar.propTypes = {
  className: PropTypes.string
};

export default CommentCountBar;
