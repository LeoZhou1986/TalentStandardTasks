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
        let skills = ["C#", "PHP", "Swift", "JavaScript", "ActionScript"];
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
                    <Header as='h4'>Talent snapshot</Header>
                    <p>
                        <label>CURRENT EMPLOYER</label>
                        <div>ABC</div>
                    </p>

                    <p>
                        <label>VISA STATUS</label>
                        <div>Citizen</div>
                    </p>

                    <p>
                        <label>POSITION</label>
                        <div>Software Developer</div>
                    </p>
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
        return (
            <Card fluid>
                <Card.Content>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={14}>
                                <Card.Header><b>Ru(Talent)Ng</b></Card.Header>
                            </Grid.Column>
                            <Grid.Column width={2} textAlign='left'>
                                <Icon size='big' name='star' />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Card.Content>
                <Card.Content extra>
                    {talentDetail}
                </Card.Content>
                <Card.Content extra>
                    <Grid textAlign='center' columns={4}>
                        <Grid.Row>
                            {
                                icons.map((value, index) => <Grid.Column key={index}>
                                    <Icon
                                        color='black'
                                        size='large'
                                        name={value}
                                        onClick={() => this.handleClickIcon(value)}
                                    />
                                </Grid.Column>)
                            }
                        </Grid.Row>
                    </Grid>
                </Card.Content>
                <Card.Content extra>
                    <List horizontal>
                        {
                            skills.map((value, index) => <List.Item key={index}>
                                <Button basic compact color='blue'>
                                    {value}
                                </Button>
                            </List.Item>)
                        }
                    </List>
                </Card.Content>
            </Card>
        )
    }
}

