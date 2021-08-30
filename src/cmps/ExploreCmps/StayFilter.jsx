
import { React } from 'react'
import { TextField } from '@material-ui/core'

export const StayFilter = ({ priceFilterModalToggle, loadStays, getCity }) => {

    const filteredStays = async (ev) => {
        const price = ev.target.value
        const city = getCity()
        if (!city) {
            await loadStays({ price: price })
        } else {
            await loadStays({ price: price, city: city })
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
