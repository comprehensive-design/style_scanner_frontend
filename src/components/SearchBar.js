import Box from '@mui/material/Box'
import Button from '@material-ui/core/Button'
import {Toolbar, IconButton} from '@mui/material'
import { Search } from '@mui/icons-material'
import React, {Component} from 'react';
import TextField from "@mui/material/TextField"



class SearchBar extends Component{
    render(){
        return(
            <Box
                component = "form"
                sx ={{
                    '& .MuiTextField-root': { m: 1, width: '40ch' },
                }}
                noValidate
                autoComplete = "off"
            >
                <div>
                    <TextField
                        id="standard-search"
                        type="search"
                        variant = "standard"
                    />
                </div>

            </Box>
        )
    }
}

export default SearchBar;