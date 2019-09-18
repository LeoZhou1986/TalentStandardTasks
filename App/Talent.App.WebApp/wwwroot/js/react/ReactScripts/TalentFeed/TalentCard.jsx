import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types'
import { Card, Grid, Icon, List, Button, Image, Header } from 'semantic-ui-react'

export default class TalentCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: false
        };
        this.handleClickIcon = this.handleClickIcon.bind(this);
    };

    handleClickIcon(name) {
        console.log("Click Icon: ", name);
        switch (name) {
            case "user":
                this.setState({ detail: true });
                break;
            case "video":
                this.setState({ detail: false });
                break;
            default:
                break;
        }
    };
    
    render() {
        let talentDetail, icons;
        if (this.state.detail) {
            icons = ["video", "file pdf outline", "linkedin", "github"];
            talentDetail = <Grid>
                <Grid.Column width={8}>
                    <Image
                        src='https://react.semantic-ui.com/images/avatar/large/matthew.png'
                        wrapped
                    />
                </Grid.Column>
                <Grid.Column width={8}>
                    <strong>Talent snapshot</strong>
                    <div className="description">
                        <div>CURRENT EMPLOYER</div>
                        <div>ABC</div>
                    </div>

                    <div className="description">
                        <div>VISA STATUS</div>
                        <div>{this.props.talent.visa}</div>
                    </div>

                    <div className="description">
                        <div>POSITION</div>
                        <div>Software Developer</div>
                    </div>
                </Grid.Column>
            </Grid>
        } else {
            icons = ["user", "file pdf outline", "linkedin", "github"];
            talentDetail = <ReactPlayer
                url='https://vimeo.com/243556536'
                className='react-player'
                width='100%'
                height='100%'
            />
        }

        let skills = null;
        if (this.props.talent.skills && this.props.talent.skills.length) {
            skills = <Card.Content extra>
                <List horizontal>
                    {
                        this.props.talent.skills.map((value, index) => {
                            if (value && value != "") {
                                return <List.Item key={index}>
                                    <Button basic compact color='blue'>
                                        {value}
                                    </Button>
                                </List.Item>
                            }
                        })
                    }
                </List>
            </Card.Content>
        }


        return (
            <Card fluid>
                <Card.Content>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={14}>
                                <Card.Header><b>{this.props.talent.name}</b></Card.Header>
                            </Grid.Column>
                            <Grid.Column width={2} textAlign='left'>
                                <Icon size='big' name='star' />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Card.Content>
                <Card.Content>
                    {talentDetail}
                </Card.Content>
                <Card.Content>
                    <Grid textAlign='center' columns={4}>
                        <Grid.Row>
                            {
                                icons.map((value, index) => <Grid.Column key={index}>
                                    <Icon
                                        size='large'
                                        name={value}
                                        onClick={() => this.handleClickIcon(value)}
                                    />
                                </Grid.Column>)
                            }
                        </Grid.Row>
                    </Grid>
                </Card.Content>
                {skills}
            </Card>
        )
    }
}

