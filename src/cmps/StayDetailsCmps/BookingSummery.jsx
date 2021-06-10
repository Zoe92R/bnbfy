import React from 'react'

export function BookingSummery({ totalPrice, price, daysNum }) {

    return (
            <div className="booking-summery flex column">
                <div className="wont-be-charged">You won't be charged yet</div>
                <div className="explicit-price flex space-between">
                    <span className="calculation">{`$${price} x ${daysNum}`}</span>
                    <span>{`$${totalPrice}`}</span>
                </div>
                <div className="fees flex space-between">
                    <span>Fees</span>
                    <span>$0</span>
                </div>
                <div className="total-price flex space-between">Total:<span>{`$${totalPrice}`}</span></div>
            </div>

    )
}