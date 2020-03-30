import React, { Component } from 'react';
import ReactTable from 'react-table';
import api from '../api';

import styled from 'styled-components';

//import 'react-table/react-table.css';

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

class UpdateVideo extends Component {
    updateUser = event => {
        event.preventDefault();

        window.location.href = `/videos/update/${this.props.id}`;
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>;
    }
}

class DeleteVideo extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the video ${this.props.id} permanently?`,
            )
        ) {
            api.deleteVideoById(this.props.id);
            window.location.reload();
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>;
    }
}

class VideosList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            videos: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true });

        await api.getAllVideos().then(videos => {
            this.setState({
                videos: videos.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { videos, isLoading } = this.state

        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'Title',
                accessor: 'title',
                filterable: true,
            },
            {
                Header: 'URL',
                accessor: 'id',
                filterable: true,
            },
            {
                Header: 'Views',
                accessor: 'views',
                Cell: props => <span>{props.value}</span>,
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteVideo id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateVideo id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!videos.length) {
            showTable = false;
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={videos}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default VideosList;