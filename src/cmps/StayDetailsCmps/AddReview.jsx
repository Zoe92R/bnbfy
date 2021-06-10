import React, { Component } from 'react'
import { Rating } from '@material-ui/lab'
import { utilService } from '../../services/utilService.js'
import emptyAvatar from '../../assets/svg/appHeader/emptyAvatar.svg'


export class AddReview extends Component {

    state = {
        isReviewAddOpen: false,
        review: {
            id: '',
            txt: '',
            rate: null,
            createdAt: null,
            by: this.props.user
        }
    }


    handleChange = (ev) => {
        ev.preventDefault()

        // console.log('hendle change in add review')
        const field = ev.target.name
        if(field == 'rate') ev.target.type = 'number'
        const value = ev.target.type === 'number' ? +ev.target.value : ev.target.value
        this.setState(prevState => ({
            review: {
                ...prevState.review,
                [field]: value,
                id: utilService.makeId(),
                createdAt: new Date()
            }
        }))
    }
    // toggleAddReview = () => {
    //     this.setState({ isReviewAddOpen: !this.state.isReviewAddOpen })
    // }

    onAddReview = (ev) => {
        ev.preventDefault()
        // if(!ev.target.value || ev.target.value.length) return
        this.props.addReview(this.state.review)
        // to continue
        this.setState(prevState => ({
            review: { ...prevState.review, id: null, txt: '', rate: null },
            isReviewAddOpen: false
        }))
    }


    render() {
        // console.log(this.state.review)
        // const { isReviewAddOpen } = this.state
        return (
            <div className="add-review">
                {/* {isReviewAddOpen && */}
                    <form onSubmit={this.onAddReview}>
                        <textarea placeholder="Share your experience here..." onChange={this.handleChange} name="txt"></textarea>
                        <Rating onChange={this.handleChange} name="rate" />
                        <button className="btn-add-in-add">Add</button>
                        <button className="btn-cancel-in-add"onClick={() => this.toggleAddReview()}>Cancel</button>
                    </form>
                {/* {!isReviewAddOpen && <button className="btn-add" onClick={() => this.toggleAddReview()}>Add Review</button>} */}
            </div>
        )
    }

}




