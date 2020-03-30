import React, { Component } from 'react';
import api from '../api';

import styled from 'styled-components';

import getYoutubeTitle from 'get-youtube-title';

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

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

const Select = styled.select.attrs({
    className: 'form-control',
})`
  ${'' /* width: 100%;
  height: 35px;
  background: white;
  color: gray;
  padding-left: 5px;
  font-size: 74px;
  border: none;
  margin-left: 10px;

  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  } */}
`;

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

class VideoInsert extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            url: '',
            category: '',
        }
    }

    handleChangeInputTitle = async event => {
        const title = event.target.value;
        this.setState({ title });
    }

    handleChangeInputUrl = async event => {
        const url = event.target.value;
        this.setState({ url });

        const _this = this;

        getYoutubeTitle(url, API_KEY, function (err, title) {
            console.log(title);
            console.log(err);

            _this.setState({ title });
        })
    }
    
    handleChangeInputCategory = async event => {
        const category = event.target.value;
        this.setState({ category });
    }

    handleIncludeVideo = async () => {
        const { title, url, category } = this.state;
        const payload = { title, url, category };

        await api.insertVideo(payload).then(res => {
            window.alert(`Video inserted successfully`);
            this.setState({
                title: '',
                url: '',
                category: '',
            })
        })
    }

    render() {
        const { title, url, category } = this.state;
        return (
            <Wrapper>
                <Title>ADD VIDEO</Title>

                {/* <Label>TITLE: </Label>
                <InputText
                    type="text"
                    value={title}
                    onChange={this.handleChangeInputTitle}
                /> */}

                <Label>URL: </Label>
                <InputText
                    type="text"
                    value={url}
                    onChange={this.handleChangeInputUrl}
                />

                <Label>CATEGORY: </Label>

                <Select
                    type="text"
                    value={category}
                    onChange={this.handleChangeInputCategory}
                >
                    <option value="" hidden></option>
                    <option value="MUSIC">MUSIC</option>
                    <option value="RAP">RAP FR</option>
                    <option value="SKATE">SKATEBOARD</option>
                </Select>

                <Button onClick={this.handleIncludeVideo}>ADD VIDEO</Button>
                <CancelButton href={'/videos/list'}>CANCEL</CancelButton>
            </Wrapper>
        )
    }
}

export default VideoInsert;
