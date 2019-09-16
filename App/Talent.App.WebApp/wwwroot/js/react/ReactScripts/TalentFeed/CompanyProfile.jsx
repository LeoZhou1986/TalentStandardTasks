import React from 'react';
import { Card, Grid, Image, Icon } from 'semantic-ui-react';

export default class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {        
        return (
            <Card>
                <Card.Content>
                    <Grid centered>
                        <Grid.Row>
                            <Image
                                style={{ width: '48px', height: '48px' }}
                                circular
                                src='https://react.semantic-ui.com/images/wireframe/image.png'
                                centered
                            />
                        </Grid.Row>
                    </Grid>
                    <Card.Header textAlign='center'>MVP Studio</Card.Header>
                    <Card.Meta textAlign='center'>
                        <Icon name='marker' />
                         Auckland, NewZealand
                    </Card.Meta>
                    <Card.Description textAlign='center'>
                        We currently do not have specific skills that we desire.
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Card.Meta>
                        <Icon name='phone' />
                        : 232323
                    </Card.Meta>
                    <Card.Meta>
                        <Icon name='mail' />
                        : ru@mvp.studio
                    </Card.Meta>
                </Card.Content>
            </Card>
        )
    };
}