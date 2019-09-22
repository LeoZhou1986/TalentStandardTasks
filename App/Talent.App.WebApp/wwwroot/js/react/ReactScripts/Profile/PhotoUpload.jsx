/* Photo upload section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';
import { Grid, Icon, Button, Image } from 'semantic-ui-react';

export default class PhotoUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            profilePhotoUrl: this.props.profilePhotoUrl 
        }
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleUploadImage = this.handleUploadImage.bind(this);
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.profilePhotoUrl !== this.props.profilePhotoUrl)
        {
            this.setState({
                profilePhotoUrl: nextProps.profilePhotoUrl
            });
        }
    };

    handleImageChange(e) {
        e.preventDefault();
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onloadend = () =>
        {
            this.setState({
                file: file,
                profilePhotoUrl: reader.result
            });
        }
        reader.readAsDataURL(file)
    };

    handleUploadImage() {
        let data = new FormData();
        data.append('file', this.state.file);

        $.ajax({
            url: this.props.savePhotoUrl,
            headers: {
                'Authorization': 'Bearer ' + Cookies.get('talentAuthToken')
            },
            type: "POST",
            data: data,
            cache: false,
            processData: false,
            contentType: false,
            success: function (res) {
                if (res.success) {
                    this.setState(Object.assign({}, this.state, { file: null }));
                    this.props.updateProfileData(res.data);
                    TalentUtil.notification.show("Update photo successfully", "success", null, null);
                } else {
                    TalentUtil.notification.show(res.message, "error", null, null);
                }
            }.bind(this),
            error: function (res, status, error) {
                TalentUtil.notification.show("There is an error when updating Image - " + error, "error", null, null);
            }
        });
    }
    

    render() {
        let button = null;
        if (this.state.file) {
            button = <Grid.Row centered columns={2}>
                <Grid.Column>
                    <Button
                        type='reset'
                        compact
                        color='teal'
                        onClick={this.handleUploadImage}
                    >
                        <Icon name='upload' />
                        Upload
                    </Button>
                </Grid.Column>
            </Grid.Row>
        }

        let imageView;
        if (this.state.profilePhotoUrl) {
            imageView = <Image
                src={this.state.profilePhotoUrl}
                size='medium'
                circular
                style={{ width: '112px', height: '112px' }}
                onClick={() => this.upload.click()}
            />
        } else {
            imageView = <Icon
                circular
                type='file'
                size='huge'
                name='camera retro'
                style={{ width: '112px', height: '112px' }}
                onClick={() => this.upload.click()}
            />
        }

        return (
            <Grid.Row>
                <Grid.Column width={5}>
                    <Grid>
                        <Grid.Row centered columns={2}>
                            <Grid.Column>
                                <input
                                    type="file"
                                    ref={(ref) => this.upload = ref}
                                    style={{ display: 'none' }}
                                    onChange={this.handleImageChange}
                                />
                                {imageView}
                                <Photo url={this.state.profilePhotoUrl}/>
                            </Grid.Column>
                        </Grid.Row>
                        {button}
                    </Grid>
                </Grid.Column>
            </Grid.Row>
        )
    }
}

PhotoUpload.propTypes = {
    savePhotoUrl: PropTypes.string.isRequired,
    updateProfileData: PropTypes.func.isRequired,
};

export class Photo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sw: 112,
            sh: 112,
            left: 0,
            top:0
        }
        this.loadImage = this.loadImage.bind(this);
    };

    loadImage(e) {
        console.log(e.target);
        console.log(e.target.naturalWidth);
        console.log(e.target.naturalHeight);
        let nw = e.target.naturalWidth;
        let nh = e.target.naturalHeight;
        console.log("natural: ", nw, nh);
        let dw = 112;
        let dh = 112;
        console.log("display: ", dw, dh);
        let scale = Math.max(dw / nw, dh / nh);
        let sw = Math.round(nw * scale);
        let sh = Math.round(nh * scale);
        let left = Math.round((dw - sw) / 2);
        let top = Math.round((dh - sh) / 2);
        console.log("show: ", sw, sh);
        this.setState({ sw: sw, sh: sh, left: left, top: top });
    }
    render() {
        return (
            <div
                color='black'
                style=
                {{
                    border: '5px solid black',
                    width: '112px',
                    height: '112px'
                }}
            >
                <img
                    className='ui circular image'
                    src={this.props.url}
                    onLoad={this.loadImage}
                    style=
                    {{
                        position: 'absolute'
                    }}
                />
            </div>
        )
    }
}

