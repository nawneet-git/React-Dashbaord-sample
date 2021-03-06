import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Budget from './Budget';
import PostAnalysis from './PostAnalysis';
import LatestProducts from './LatestProducts';
import Sales from './CommentCountBar';
import LineChart from '../../components/LineChart';
import FacebookLikePercent from './FacebookLikePercent';

import moment from 'moment';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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


function DistinctRecords(ListData, prop) {
  return ListData.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  })
}

function DistinctCommentRecords(ListData, prop) {
  let resultsList = [...ListData.reduce((r, { username }) => {
    const itemObj = r.get(username)
    itemObj ? itemObj.count++ : r.set(username, { username, count: 1 })
    return r
  }, new Map).values()
  ]
  return resultsList;
}

function DailyCommentRecords(listData, prop) {
  let resultsList = [...listData.reduce((r, { created_datetime }) => {
    let comment_date = moment(created_datetime).format('DD-MMM-YYYY')
    const itemObj = r.get(comment_date)
    itemObj ? itemObj.count++ : r.set(comment_date, { comment_date, count: 1 })
    return r
  }, new Map).values()
  ]

  let labels = []
  for (let items of resultsList) {
    labels.push(items.comment_date);
  }
  return {
    resultsList,
    labels
  };
}

function PostsLikes(MYJSON, prop) {
  let resultsList = [...MYJSON.reduce((r, { username, post_likes }) => {
    const itemObj = r.get(username);
    itemObj ? itemObj.post_likes = (Number(itemObj.post_likes) + Number(post_likes)) : r.set(username, { username, post_likes: Number(post_likes) })
    return r
  }, new Map).values()
  ]

  return resultsList;
}

const Dashboard = () => {
  const classes = useStyles();

  let apiClient = new AxiosClientProvider();
  const [pageload, setPageLoad] = useState(false);
  const [facebookPostArray, setFacebookPostArray] = useState([]);
  const [facebookCommentCount, setFacebookCommentCount] = useState([]);
  const [facebookDailyCommentList, setFacebookDailyCommentList] = useState({ resultsList: [], labels: [] });
  const [facebookPostLike, setFacebookPostLike] = useState([]);
  const [facebookPostComment, setFacebookPostComment] = useState([]);
  const [usernameList, setUsernameList] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  const getFaceBookPostData = () => {
    apiClient.getFacebookPosts(1, (data) => {
      if (data.length != 0) {
        setFacebookPostArray(data);
        setUsernameList(DistinctRecords(data, 'username'));

        let postLikes = PostsLikes(data, 'username');
        setFacebookPostLike(postLikes);

      }
    })
  }

  const getFaceBookComment = () => {
    apiClient.getFacebookCommment(1, (data) => {
      // finding comment count by user
      let commentCount = DistinctCommentRecords(data, 'username');
      setFacebookCommentCount(commentCount);

      // finding out daily comment
      let dailyComment = DailyCommentRecords(data, 'username');
      setFacebookDailyCommentList(dailyComment);

    })
  }

  const getFaceBookPostComment = () => {
    apiClient.getFacebookPostsCommment(1, (data) => {
      console.log("Received data from facebook post : ", data);
      setFacebookPostComment(data)
    })
  }

  useEffect(() => {
    getFaceBookPostData();
    getFaceBookComment();
  }, []);

  // if(pageload == false){
  //   getFaceBookPostData();
  //   setPageLoad(true);
  // }


  const onUserNameChange = (event) => {
    if (event.target.value && event.target.value != '') {
      setCurrentUser(event.target.value);
    }
    debugger;
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
              <option aria-label="all" value="all" />
              {
                usernameList.map((item) => {
                  return (
                    <option key={item._id} value={item.username}>{item.username}</option>
                  )
                })
              }
            </NativeSelect>

          </Grid>

          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <PostAnalysis itemData={facebookPostArray} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Sales itemData={facebookCommentCount} />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <FacebookLikePercent itemData={facebookPostLike} />
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <LineChart itemData={facebookDailyCommentList.resultsList} itemLabel={facebookDailyCommentList.labels} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
