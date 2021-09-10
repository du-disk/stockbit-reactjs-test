import React, { useCallback, useRef } from "react";
import Card from './Card';

const InfiniteScroll = (props) => {

    const ref = useRef();
    const { items, loading, page, onChange, detailHandler, hasMore } = props;
    const lasItem = useCallback(
        (node) => {

            if (loading) return
            if (ref.current) ref.current.disconnect()

            ref.current = new IntersectionObserver(enteries => {
                if (enteries[0].isIntersecting && items.length > 5 && hasMore) {
                    // setTimeout(() => {
                    onChange({
                        target: {
                            name: 'page',
                            value: page + 1
                        }
                    })
                    // }, 2000)
                }
            })
            if (node) ref.current.observe(node)
        },
        [loading, page, onChange, items, hasMore],
    );


    return (
        <div className="row m-auto">
            {
                items.map((item, idx) => (
                    <div ref={idx + 1 === items.length ? lasItem : null} className="col-6 mb-2" key={`card-key-${idx}`} >
                        <Card
                            item={item}
                            detailHandler={detailHandler}
                        />
                    </div>
                ))
            }
        </div>
    );
};

export default InfiniteScroll;
