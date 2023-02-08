import React, { useRef } from 'react';
import '../scss/gallery.scss'

const Gallery = () => {
    const trackRef = useRef();

    function handleOnDown(e) {
        trackRef.current.dataset.mouseDownAt = e.clientX;
    }

    function handleOnUp(e) {
        trackRef.current.dataset.mouseDownAt = "0";
        trackRef.current.dataset.prevPercentage = track.dataset.percentage;
    }

    function handleOnMove(e) {
        if (trackRef.current.dataset.mouseDownAt === "0") return;

        const mouseDelta = parseFloat(trackRef.current.dataset.mouseDownAt) - e.clientX;
        const maxDelta = window.innerWidth / 2;
        const percentage = (mouseDelta / maxDelta) * -100;
        const nextPercentageUnconstrained = parseFloat(trackRef.current.dataset.prevPercentage) + percentage;
        const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

        trackRef.dataset.percentage = nextPercentage;

        trackRef.current.animate({
            transform: `translate(${nextPercentage}%, -50%)`
        }, { duration: 1200, fill: "forwards" });

        for (const image of trackRef.current.getElementsByClassName("image")) {
            image.animate({
                objectPosition: `${100 + nextPercentage}% center`
            }, { duration: 1200, fill: "forwards" })
        }
    }

    return (
        <div id="gallery" className='gallery' onMouseDown={handleOnDown}
         onTouchStart={e => handleOnDown(e.touches[0])}
         onMouseUp={handleOnUp} onTouchEnd={e => handleOnUp(e.touches[0])}
         onMouseMove={handleOnMove} onTouchMove={e => handleOnMove(e.touches[0])}>
            <div id="image-track" ref={trackRef} data-mouse-down-at="0" data-prev-percentage="0">
                <img className='image' draggable="false" />
                <img className='image' draggable="false" />
                <img className='image' draggable="false" />
                <img className='image' draggable="false" />
            </div>
        </div>
    )
}

export default Gallery