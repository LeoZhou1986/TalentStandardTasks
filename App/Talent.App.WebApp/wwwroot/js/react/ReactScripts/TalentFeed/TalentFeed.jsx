import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import { Loader, Grid, Container } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroller';
import TalentCard from '../TalentFeed/TalentCard.jsx';
import CompanyProfile from '../TalentFeed/CompanyProfile.jsx';
import FollowingSuggestion from '../TalentFeed/FollowingSuggestion.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';


export default class TalentFeed extends React.Component {
    constructor(props) {
        super(props);

        let loader = loaderData
        loader.allowedUsers.push("Employer")
        loader.allowedUsers.push("Recruiter")

        this.state = {
            loadNumber: 5,
            loadPosition: 220,
            feedData: [],
            hasMoreFeedData: true,
            watchlist: [],
            loaderData: loader,
            loadingFeedData: false,
            companyDetails: null
        }
        this.init = this.init.bind(this);
        this.getTalentSnapshotList = this.getTalentSnapshotList.bind(this);
    };

    getTalentSnapshotList(position, number) {
        if (this.state.loadingFeedData || !this.state.hasMoreFeedData) return;
        this.setState({ loadingFeedData: true });
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: `http://localhost:60290/profile/profile/getTalent?position=${position}&number=${number}`,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                if (res.success) {
                    if (res.data) {
                        this.setState({
                            loadPosition: position + res.data.length,
                            feedData: this.state.feedData.concat(res.data),
                            hasMoreFeedData: true,
                            loadingFeedData: false
                        });
                    } else {
                        this.setState({
                            hasMoreFeedData: false,
                            loadingFeedData: false
                        });
                    }
                } else {
                    TalentUtil.notification.show(res.message, "error", null, null);
                    this.setState({ hasMoreFeedData: false, loadingFeedData: false });
                }
            }.bind(this),
            error: function (res) {
                TalentUtil.notification.show("Can't fetch talent data: " + res.status, "error", null, null);
                this.setState({ loadingFeedData: false });
            }.bind(this)
        }); 
    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this
    }

    componentDidMount() {
        //http://localhost:60290/profile/profile/getEmployerProfile
        
        this.init();
        this.getTalentSnapshotList(this.state.loadPosition, this.state.loadNumber);
    };

    render() {
        console.log("Talent Feed: ", this.state);
        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <div className="ui container">
                    <Grid centered>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Container>
                                    <CompanyProfile/>
                                </Container>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Container>
                                    <InfiniteScroll
                                        pageStart={0}
                                        loadMore={() => this.getTalentSnapshotList(this.state.loadPosition, this.state.loadNumber)}
                                        hasMore={this.state.hasMoreFeedData}
                                        loader={<div className="loader" key={0}>Loading ...</div>}
                                    >
                                        {
                                            this.state.feedData.map((value, index) => <TalentCard key={index} />)
                                        }
                                    </InfiniteScroll>
                                </Container>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Container>
                                    <FollowingSuggestion/>
                                </Container>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                        </Grid.Row>
                    </Grid>
                </div>
            </BodyWrapper>
        )
    }
}