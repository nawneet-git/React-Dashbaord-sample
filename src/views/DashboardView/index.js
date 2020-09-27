import React, { useEffect } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Budget from './Budget';
import PostAnalysis from './PostAnalysis';
import LatestProducts from './LatestProducts';
import Sales from './Sales';
import LineChart from '../../components/LineChart';
import TrafficByDevice from './TrafficByDevice';


import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import TasksProgress from './TasksProgress';
import TotalCustomers from './TotalCustomers';
import TotalProfit from './TotalProfit';
import PieChart from '../../components/PieChart';

import AxiosClientProvider from '../../services/postDataService';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  let apiClient = new AxiosClientProvider();
  const [pageload, setPageLoad] = React.useState(false);
  const [facebookPostArray, setFacebookPostArray] = React.useState([]);
  const [facebookComment, setFacebookComment] = React.useState([]);
  const [facebookPostComment, setFacebookPostComment] = React.useState([]);


  const getFaceBookPostData = () => {
    apiClient.getFacebookPosts(1, (data) => {
      console.log("Received data from facebook post : ", data);
      if (data.length != 0) {
        setFacebookPostArray("Helo");
        console.log("Received data from facebook post  2: ", data);
      }
      console.log("Facebook post state : ", facebookPostArray)
    })
  }

  const getFaceBookComment = () => {
    apiClient.getFacebookPostsCommment(1, (data) => {
      setFacebookComment(data)
      console.log("Received data from facebook post : ", data);
    })
  }

  const getFaceBookPostComment = () => {
    apiClient.getFacebookPostsCommment(1, (data) => {
      console.log("Received data from facebook post : ", data);
      setFacebookPostComment(data)
    })
  }

  useEffect(() => {
    // getFaceBookPostData()

    apiClient.getFacebookPosts(1, (data) => {
      console.log("Received data from facebook post : ", data);
      if (data.length != 0) {
        setFacebookPostArray(data);
        console.log("Received data from facebook post  2: ", data);
      }
      console.log("Facebook post state : ", facebookPostArray)
    })

  }, []);

  // if(pageload == false){
  //   getFaceBookPostData();
  //   setPageLoad(true);
  // }


  const onUserNameChange = () => {

  }

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <InputLabel htmlFor="age-native-helper">Select User</InputLabel>
            <NativeSelect
              onChange={onUserNameChange}
              inputProps={{
                name: 'age',
                id: 'age-native-helper',
              }}
            >
              <option aria-label="None" value="" />
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </NativeSelect>
            <FormHelperText>Some important helper text</FormHelperText>
          </Grid>

          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            {/* <PostAnalysis itemData={facebookPostArray} /> */}
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Sales />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByDevice />
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <LineChart />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
