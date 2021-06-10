
import { Component } from 'react'
import { TextField } from '@material-ui/core'

export class StayFilter extends Component {
    c
    render() {
        return(
            <div>
                 <TextField 
                 type="number" 
                 label='Price'
                 size="small" 
                  name="keyword" 
                 variant="outlined"></TextField>
                </div>

        )
    }
}