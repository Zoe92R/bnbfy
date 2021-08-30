
import { React } from 'react'
import { TextField } from '@material-ui/core'

export const StayFilter = ({ loadStays, getCity }) => {

    const filteredStays = async (ev) => {
        const price = ev.target.value
        const city = getCity()
        // if (!city) {
        //     await loadStays({ price: price })
        // } else {
        //     await loadStays({ price: price, city: city })
        // }
        if (!city && price) {
            await loadStays({ price: price })
        } else if (city && price) {
            await loadStays({ price: price, city: city })
        } else if (city && !price) {
            await loadStays({ city: city })
        } else {
            await loadStays()
        }
    }

    return (
        <div className="filter-explor">
            <TextField
                type="number"
                label='Price'
                size="small"
                name="keyword"
                variant="outlined"
                onChange={filteredStays}>
            </TextField>
        </div>

    )
}
