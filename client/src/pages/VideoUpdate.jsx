import React, { Component } from 'react';
import api from '../api';

import styled from 'styled-components';

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class VideoUpdate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            _id: this.props.match.params.id,
            title: '',
            id: '',
            views: '',
        }
    }

    handleChangeInputTitle = async event => {
        const title = event.target.value;
        this.setState({ title });
    }

    handleChangeInputId = async event => {
        const id = event.target.value;
        this.setState({ id });
    }

    handleChangeInputViews = async event => {
        const views = event.target.validity.valid
            ? event.target.value
            : this.state.views;

        this.setState({ views });
    }

    handleUpdateVideo = async () => {
        const { _id, title, id, views } = this.state;
        const payload = { title, id, views }

        await api.updateVideoById(_id, payload).then(res => {
            window.alert(`Video updated successfully`);
            this.setState({
                title: '',
                id: '',
                views: '',
            })
        })
    }

    componentDidMount = async () => {
        const { _id } = this.state;
        const video = await api.getVideoById(_id)

        this.setState({
            title: video.data.data.title,
            id: video.data.data.id,
            views: video.data.data.views,
        })
    }

    render() {
        const { title, id, views } = this.state;
        return (
            <Wrapper>
                <Title>Create Video</Title>

                <Label>Title: </Label>
                <InputText
                    type="text"
                    value={title}
                    onChange={this.handleChangeInputTitle}
                />

                <Label>ID: </Label>
                <InputText
                    type="text"
                    value={id}
                    onChange={this.handleChangeInputId}
                />

                <Label>Views: </Label>
                <InputText
                    type="number"
                    step="0.1"
                    lang="en-US"
                    min="0"
                    max="10"
                    pattern="[0-9]+([,\.][0-9]+)?"
                    value={views}
                    onChange={this.handleChangeInputViews}
                />

                <Button onClick={this.handleUpdateVideo}>Update Video</Button>
                <CancelButton href={'/videos/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default VideoUpdate;
