import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import TableContainer from "@material-ui/core/TableContainer";
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  },
  container: {
    minHeight: 400,
    maxHeight: 400,
  },
}));



const PostAnalysis = ({ className, itemData, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Latest Orders" />
      <Divider />
      <PerfectScrollbar>
        <Box minHeight={400} >
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    UserName
                </TableCell>
                  <TableCell>
                    Post
                </TableCell>
                  <TableCell sortDirection="desc">
                    Share Count
                </TableCell>
                  <TableCell>
                    Post Like
                </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {itemData.map((items) => (
                  <TableRow
                    hover
                    key={items._id}
                  >
                    <TableCell>
                      {items.username}
                    </TableCell>
                    <TableCell>
                      {items.post}
                    </TableCell>
                    <TableCell>
                      {items.share_count}
                    </TableCell>
                    <TableCell>
                      <Chip
                        color="primary"
                        label={items.post_likes}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </PerfectScrollbar>
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
      </Box>
    </Card>
  );
};

PostAnalysis.propTypes = {
  className: PropTypes.string
};

export default PostAnalysis;
